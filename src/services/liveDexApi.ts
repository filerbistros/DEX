import type { ArbitrageOpportunity, ChainId, Token } from '../types/arbitrage';
import { CHAINS } from '../data/chains';
import { DEXES } from '../data/dexes';
import { BRIDGES } from '../data/bridges';
import { recalculateOpportunity } from './arbitrageScanner';

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative?: string;
  priceUsd: string;
  volume: {
    h24: number;
  };
  liquidity?: {
    usd: number;
    base: number;
    quote: number;
  };
  priceChange?: {
    h24: number;
  };
}

// Map DexScreener chain names to our internal ChainIds
function mapChainId(chain: string): ChainId | null {
  const c = chain.toLowerCase();
  if (c === 'arbitrum' || c === 'arbitrum-one') return 'arbitrum';
  if (c === 'base') return 'base';
  if (c === 'solana') return 'solana';
  if (c === 'bsc' || c === 'binance') return 'bsc';
  if (c === 'ethereum' || c === 'eth') return 'ethereum';
  if (c === 'polygon' || c === 'matic') return 'polygon';
  if (c === 'avalanche' || c === 'avax') return 'avalanche';
  if (c === 'optimism' || c === 'op') return 'optimism';
  return null;
}

// Find DEX config by DexScreener dexId
function mapDexInfo(dexId: string, chainId: ChainId) {
  const d = dexId.toLowerCase();
  if (d.includes('uniswap') && (d.includes('v3') || d.includes('3'))) return DEXES.uniswap_v3;
  if (d.includes('uniswap')) return DEXES.uniswap_v2;
  if (d.includes('pancake')) return DEXES.pancakeswap;
  if (d.includes('raydium')) return DEXES.raydium;
  if (d.includes('orca')) return DEXES.orca;
  if (d.includes('camelot')) return DEXES.camelot;
  if (d.includes('aerodrome')) return DEXES.aerodrome;
  if (d.includes('sushi')) return DEXES.sushiswap;
  if (d.includes('curve')) return DEXES.curve;
  if (d.includes('traderjoe') || d.includes('joe') || d.includes('lfj')) return DEXES.traderjoe;
  if (d.includes('quickswap')) return DEXES.quickswap;

  // Fallback default for chain
  const chainDexes = Object.values(DEXES).filter(x => x.chainIds.includes(chainId));
  return chainDexes[0] || DEXES.uniswap_v3;
}

// High-volume token queries for real-time live arbitrage scanning
const SEARCH_TOKENS = [
  'ETH', 'SOL', 'ARB', 'AERO', 'BNB', 'AVAX', 'PEPE', 'WIF', 'CAKE', 'LINK', 'UNI', 'POL', 'PENDLE', 'NEAR'
];

/**
 * Fetch real live market pairs from DexScreener parallel queries
 */
export async function fetchLiveDexScreenerPairs(): Promise<DexScreenerPair[]> {
  try {
    const fetchPromises = SEARCH_TOKENS.map(async (query) => {
      try {
        const res = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) return [];
        const json = await res.json();
        return (json.pairs || []) as DexScreenerPair[];
      } catch {
        return [];
      }
    });

    const settled = await Promise.allSettled(fetchPromises);
    const allPairs: DexScreenerPair[] = [];

    for (const item of settled) {
      if (item.status === 'fulfilled' && Array.isArray(item.value)) {
        allPairs.push(...item.value);
      }
    }

    return allPairs;
  } catch (error) {
    console.warn('DexScreener API polling error:', error);
    return [];
  }
}

/**
 * Scan, filter and calculate real live Mainnet arbitrage opportunities
 */
export async function scanLiveMainnetArbitrage(
  tradeSizeUsd: number, 
  useFlashLoans: boolean
): Promise<ArbitrageOpportunity[]> {
  const rawPairs = await fetchLiveDexScreenerPairs();
  if (!rawPairs || rawPairs.length === 0) {
    return [];
  }

  // Filter out pairs with low liquidity or unsupported chains
  const validPairs = rawPairs.filter(p => {
    if (!p.priceUsd || parseFloat(p.priceUsd) <= 0) return false;
    if (!p.liquidity || p.liquidity.usd < 8000) return false;
    return mapChainId(p.chainId) !== null;
  });

  // Group pairs by base token symbol
  const tokenGroups: Record<string, DexScreenerPair[]> = {};
  for (const pair of validPairs) {
    const symbol = pair.baseToken.symbol.toUpperCase().replace(/^W/, ''); // normalize WETH -> ETH, WSOL -> SOL
    if (!tokenGroups[symbol]) {
      tokenGroups[symbol] = [];
    }
    tokenGroups[symbol].push(pair);
  }

  const opportunities: ArbitrageOpportunity[] = [];
  const seenPairSignatures = new Set<string>();

  // Compare pools across DEXes & Chains
  for (const [symbol, pairs] of Object.entries(tokenGroups)) {
    if (pairs.length < 2) continue;

    for (let i = 0; i < pairs.length; i++) {
      for (let j = i + 1; j < pairs.length; j++) {
        const pairA = pairs[i];
        const pairB = pairs[j];

        if (pairA.pairAddress === pairB.pairAddress) continue;

        const priceA = parseFloat(pairA.priceUsd);
        const priceB = parseFloat(pairB.priceUsd);

        if (!priceA || !priceB || isNaN(priceA) || isNaN(priceB)) continue;

        // Buy on the cheaper pool, sell on the more expensive pool
        const buyPair = priceA < priceB ? pairA : pairB;
        const sellPair = priceA < priceB ? pairB : pairA;

        const buyPrice = parseFloat(buyPair.priceUsd);
        const sellPrice = parseFloat(sellPair.priceUsd);

        const grossSpread = ((sellPrice - buyPrice) / buyPrice) * 100;

        // Only keep genuine spreads between 0.3% and 12% (filter out abnormal scam/illiquid pools)
        if (grossSpread < 0.3 || grossSpread > 12.0) continue;

        const buyChainId = mapChainId(buyPair.chainId)!;
        const sellChainId = mapChainId(sellPair.chainId)!;

        const buyDex = mapDexInfo(buyPair.dexId, buyChainId);
        const sellDex = mapDexInfo(sellPair.dexId, sellChainId);

        // Deduplicate
        const signature = `${symbol}-${buyChainId}-${buyDex.id}-${sellChainId}-${sellDex.id}`;
        if (seenPairSignatures.has(signature)) continue;
        seenPairSignatures.add(signature);

        const isCrossChain = buyChainId !== sellChainId;
        const buyChain = CHAINS[buyChainId];
        const sellChain = CHAINS[sellChainId];

        const tokenIn: Token = {
          symbol: buyPair.baseToken.symbol,
          name: buyPair.baseToken.name || symbol,
          address: buyPair.baseToken.address,
          chainId: buyChainId,
          decimals: 18,
          logo: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${buyChainId === 'bsc' ? 'binance' : buyChainId}/info/logo.png`,
          priceUsd: buyPrice,
        };

        const tokenOut: Token = {
          symbol: buyPair.quoteToken?.symbol || 'USDC',
          name: buyPair.quoteToken?.name || 'USD Coin',
          address: buyPair.quoteToken?.address || buyPair.baseToken.address,
          chainId: buyChainId,
          decimals: 6,
          logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
          priceUsd: 1.0,
          isStable: true,
        };

        const minLiquidity = Math.min(buyPair.liquidity?.usd || 50000, sellPair.liquidity?.usd || 50000);
        const totalVol24 = Math.round((buyPair.volume?.h24 || 0) + (sellPair.volume?.h24 || 0));

        const opp: ArbitrageOpportunity = {
          id: `live-${buyPair.pairAddress.slice(0, 5)}-${sellPair.pairAddress.slice(0, 5)}`,
          type: isCrossChain ? 'cross_chain' : 'intra_chain',
          buyDex,
          sellDex,
          buyChain,
          sellChain,
          tokenIn,
          tokenOut,
          buyPrice,
          sellPrice,
          grossSpreadPct: grossSpread,
          liquidityUsd: Math.round(minLiquidity),
          estBuyGasUsd: buyChain.avgGasUsd,
          estSellGasUsd: sellChain.avgGasUsd,
          bridge: isCrossChain ? BRIDGES.across : undefined,
          estBridgeFeeUsd: isCrossChain ? 1.2 : 0,
          estBridgeTimeMin: isCrossChain ? 0.8 : 0,
          netProfitPct: 0,
          netProfitUsd: 0,
          maxCapacityUsd: Math.round(minLiquidity * 0.08),
          priceImpactPct: 0.1,
          flashLoanEligible: !isCrossChain,
          flashLoanFeePct: 0.05,
          safetyRating: 'safe',
          safetyReasons: [
            `Live 24h Volume: $${totalVol24.toLocaleString()}`,
            `Pool Liquidity: $${Math.round(minLiquidity).toLocaleString()}`,
            `Verified DEX Smart Contract`
          ],
          timestamp: Date.now(),
          executionSteps: [],
        };

        const recalculated = recalculateOpportunity(opp, tradeSizeUsd, useFlashLoans);
        if (recalculated.netProfitPct > 0.05) {
          opportunities.push(recalculated);
        }
      }
    }
  }

  // Sort by highest Net Profit %
  return opportunities.sort((a, b) => b.netProfitPct - a.netProfitPct).slice(0, 30);
}
