import type { ArbitrageOpportunity, ExecutionStep } from '../types/arbitrage';
import { CHAINS } from '../data/chains';
import { DEXES } from '../data/dexes';
import { BRIDGES } from '../data/bridges';
import { TOKENS } from '../data/tokens';

// Generate realistic base pools and arbitrage routes
export function generateInitialOpportunities(): ArbitrageOpportunity[] {
  const opps: ArbitrageOpportunity[] = [
    // 1. Arbitrum Intra-chain: ARB / USDC (Camelot -> Uniswap v3)
    {
      id: 'arb-camelot-uni-arb',
      type: 'intra_chain',
      buyDex: DEXES.camelot,
      sellDex: DEXES.uniswap_v3,
      buyChain: CHAINS.arbitrum,
      sellChain: CHAINS.arbitrum,
      tokenIn: TOKENS['ARB-arbitrum'],
      tokenOut: TOKENS['USDC-arbitrum'],
      buyPrice: 0.8421,
      sellPrice: 0.8675,
      grossSpreadPct: 3.01,
      liquidityUsd: 485000,
      estBuyGasUsd: 0.04,
      estSellGasUsd: 0.04,
      estBridgeFeeUsd: 0,
      estBridgeTimeMin: 0,
      netProfitPct: 2.72,
      netProfitUsd: 27.20,
      maxCapacityUsd: 14500,
      priceImpactPct: 0.12,
      flashLoanEligible: true,
      flashLoanFeePct: 0.05,
      safetyRating: 'safe',
      safetyReasons: ['Verified Contract', 'High Pool Depth ($485K)', 'Low Gas Cost (L2)'],
      timestamp: Date.now() - 4000,
      executionSteps: [],
    },

    // 2. Cross-Chain: ETH (Arbitrum Camelot -> Base Aerodrome via Across)
    {
      id: 'cross-eth-arb-base',
      type: 'cross_chain',
      buyDex: DEXES.camelot,
      sellDex: DEXES.aerodrome,
      buyChain: CHAINS.arbitrum,
      sellChain: CHAINS.base,
      tokenIn: TOKENS['ETH-arbitrum'],
      tokenOut: TOKENS['USDC-base'],
      buyPrice: 3140.20,
      sellPrice: 3208.50,
      grossSpreadPct: 2.17,
      liquidityUsd: 1850000,
      estBuyGasUsd: 0.04,
      estSellGasUsd: 0.03,
      bridge: BRIDGES.across,
      estBridgeFeeUsd: 1.25,
      estBridgeTimeMin: 0.8,
      netProfitPct: 1.94,
      netProfitUsd: 38.80,
      maxCapacityUsd: 45000,
      priceImpactPct: 0.08,
      flashLoanEligible: false,
      flashLoanFeePct: 0,
      safetyRating: 'safe',
      safetyReasons: ['Audited Bridge (Across)', 'Deep Multi-Million Liquidity', 'Fast Confirmation (<1 min)'],
      timestamp: Date.now() - 12000,
      executionSteps: [],
    },

    // 3. Solana Intra-chain: WIF / USDC (Raydium -> Orca)
    {
      id: 'sol-wif-ray-orca',
      type: 'intra_chain',
      buyDex: DEXES.raydium,
      sellDex: DEXES.orca,
      buyChain: CHAINS.solana,
      sellChain: CHAINS.solana,
      tokenIn: TOKENS['WIF-solana'],
      tokenOut: TOKENS['USDC-solana'],
      buyPrice: 1.912,
      sellPrice: 1.984,
      grossSpreadPct: 3.76,
      liquidityUsd: 620000,
      estBuyGasUsd: 0.003,
      estSellGasUsd: 0.003,
      estBridgeFeeUsd: 0,
      estBridgeTimeMin: 0,
      netProfitPct: 3.42,
      netProfitUsd: 34.20,
      maxCapacityUsd: 9500,
      priceImpactPct: 0.18,
      flashLoanEligible: false,
      flashLoanFeePct: 0,
      safetyRating: 'safe',
      safetyReasons: ['Ultra Fast Sub-second Finality', 'Negligible Gas Fees (<$0.01)', 'High Volume Meme Asset'],
      timestamp: Date.now() - 8000,
      executionSteps: [],
    },

    // 4. Base Intra-chain: AERO / USDC (Aerodrome -> Uniswap v3)
    {
      id: 'base-aero-aero-uni',
      type: 'intra_chain',
      buyDex: DEXES.aerodrome,
      sellDex: DEXES.uniswap_v3,
      buyChain: CHAINS.base,
      sellChain: CHAINS.base,
      tokenIn: TOKENS['AERO-base'],
      tokenOut: TOKENS['USDC-base'],
      buyPrice: 1.152,
      sellPrice: 1.198,
      grossSpreadPct: 3.99,
      liquidityUsd: 380000,
      estBuyGasUsd: 0.02,
      estSellGasUsd: 0.02,
      estBridgeFeeUsd: 0,
      estBridgeTimeMin: 0,
      netProfitPct: 3.82,
      netProfitUsd: 38.20,
      maxCapacityUsd: 12000,
      priceImpactPct: 0.14,
      flashLoanEligible: true,
      flashLoanFeePct: 0.05,
      safetyRating: 'safe',
      safetyReasons: ['Base Official Ecosystem Coin', 'Verified Liquidity Pool', 'Low Gas Cost'],
      timestamp: Date.now() - 25000,
      executionSteps: [],
    },

    // 5. BSC Intra-chain: CAKE / USDT (PancakeSwap -> SushiSwap)
    {
      id: 'bsc-cake-pancake-sushi',
      type: 'intra_chain',
      buyDex: DEXES.pancakeswap,
      sellDex: DEXES.sushiswap,
      buyChain: CHAINS.bsc,
      sellChain: CHAINS.bsc,
      tokenIn: TOKENS['CAKE-bsc'],
      tokenOut: TOKENS['USDT-bsc'],
      buyPrice: 2.395,
      sellPrice: 2.468,
      grossSpreadPct: 3.04,
      liquidityUsd: 520000,
      estBuyGasUsd: 0.08,
      estSellGasUsd: 0.08,
      estBridgeFeeUsd: 0,
      estBridgeTimeMin: 0,
      netProfitPct: 2.42,
      netProfitUsd: 24.20,
      maxCapacityUsd: 8500,
      priceImpactPct: 0.19,
      flashLoanEligible: true,
      flashLoanFeePct: 0.05,
      safetyRating: 'safe',
      safetyReasons: ['CertiK Audited Contracts', 'High Daily Volume', 'Flash Loan Ready'],
      timestamp: Date.now() - 32000,
      executionSteps: [],
    },

    // 6. Triangular Arbitrum: USDT -> ARB -> ETH -> USDT
    {
      id: 'tri-arb-usdt-arb-eth',
      type: 'triangular',
      buyDex: DEXES.uniswap_v3,
      sellDex: DEXES.camelot,
      intermediateDex: DEXES.uniswap_v3,
      buyChain: CHAINS.arbitrum,
      sellChain: CHAINS.arbitrum,
      tokenIn: TOKENS['USDT-arbitrum'],
      tokenOut: TOKENS['USDT-arbitrum'],
      intermediateToken: TOKENS['ETH-arbitrum'],
      buyPrice: 1.000,
      sellPrice: 1.0265,
      grossSpreadPct: 2.65,
      liquidityUsd: 910000,
      estBuyGasUsd: 0.05,
      estSellGasUsd: 0.05,
      estBridgeFeeUsd: 0,
      estBridgeTimeMin: 0,
      netProfitPct: 2.38,
      netProfitUsd: 23.80,
      maxCapacityUsd: 22000,
      priceImpactPct: 0.11,
      flashLoanEligible: true,
      flashLoanFeePct: 0.05,
      safetyRating: 'safe',
      safetyReasons: ['Zero Bridge Risk (Single TX possible)', 'Atomic execution capability', 'No market exposure holding'],
      timestamp: Date.now() - 15000,
      executionSteps: [],
    },

    // 7. Cross-Chain: SOL (Solana Raydium -> BSC PancakeSwap via deBridge)
    {
      id: 'cross-sol-ray-bsc',
      type: 'cross_chain',
      buyDex: DEXES.raydium,
      sellDex: DEXES.pancakeswap,
      buyChain: CHAINS.solana,
      sellChain: CHAINS.bsc,
      tokenIn: TOKENS['SOL-solana'],
      tokenOut: TOKENS['USDT-bsc'],
      buyPrice: 147.20,
      sellPrice: 152.90,
      grossSpreadPct: 3.87,
      liquidityUsd: 1420000,
      estBuyGasUsd: 0.003,
      estSellGasUsd: 0.08,
      bridge: BRIDGES.debridge,
      estBridgeFeeUsd: 1.65,
      estBridgeTimeMin: 0.5,
      netProfitPct: 3.25,
      netProfitUsd: 65.00,
      maxCapacityUsd: 35000,
      priceImpactPct: 0.12,
      flashLoanEligible: false,
      flashLoanFeePct: 0,
      safetyRating: 'safe',
      safetyReasons: ['deBridge DLN 0-Slippage Engine', 'High Cross-chain Liquidity', 'Rapid Transfer (~30s)'],
      timestamp: Date.now() - 2000,
      executionSteps: [],
    },

    // 8. Polygon Intra-chain: POL / USDT (QuickSwap -> Uniswap v3)
    {
      id: 'poly-quick-uni-pol',
      type: 'intra_chain',
      buyDex: DEXES.quickswap,
      sellDex: DEXES.uniswap_v3,
      buyChain: CHAINS.polygon,
      sellChain: CHAINS.polygon,
      tokenIn: TOKENS['POL-polygon'],
      tokenOut: TOKENS['USDT-polygon'],
      buyPrice: 0.412,
      sellPrice: 0.428,
      grossSpreadPct: 3.88,
      liquidityUsd: 290000,
      estBuyGasUsd: 0.03,
      estSellGasUsd: 0.03,
      estBridgeFeeUsd: 0,
      estBridgeTimeMin: 0,
      netProfitPct: 3.46,
      netProfitUsd: 34.60,
      maxCapacityUsd: 6500,
      priceImpactPct: 0.22,
      flashLoanEligible: true,
      flashLoanFeePct: 0.05,
      safetyRating: 'medium_risk',
      safetyReasons: ['Moderate Pool Liquidity ($290K)', 'Check price impact before >$5K order'],
      timestamp: Date.now() - 45000,
      executionSteps: [],
    },

    // 9. Avalanche Intra-chain: AVAX / USDC (Trader Joe -> SushiSwap)
    {
      id: 'avax-joe-sushi',
      type: 'intra_chain',
      buyDex: DEXES.traderjoe,
      sellDex: DEXES.sushiswap,
      buyChain: CHAINS.avalanche,
      sellChain: CHAINS.avalanche,
      tokenIn: TOKENS['AVAX-avalanche'],
      tokenOut: TOKENS['USDC-avalanche'],
      buyPrice: 26.20,
      sellPrice: 27.15,
      grossSpreadPct: 3.62,
      liquidityUsd: 390000,
      estBuyGasUsd: 0.12,
      estSellGasUsd: 0.12,
      estBridgeFeeUsd: 0,
      estBridgeTimeMin: 0,
      netProfitPct: 3.08,
      netProfitUsd: 30.80,
      maxCapacityUsd: 9000,
      priceImpactPct: 0.16,
      flashLoanEligible: true,
      flashLoanFeePct: 0.05,
      safetyRating: 'safe',
      safetyReasons: ['Subnet Finality', 'Verified Liquidity Book on Joe'],
      timestamp: Date.now() - 55000,
      executionSteps: [],
    },

    // 10. Cross-Chain: WBTC (Arbitrum Uniswap v3 -> Ethereum Curve via Stargate)
    {
      id: 'cross-wbtc-arb-eth',
      type: 'cross_chain',
      buyDex: DEXES.uniswap_v3,
      sellDex: DEXES.curve,
      buyChain: CHAINS.arbitrum,
      sellChain: CHAINS.ethereum,
      tokenIn: TOKENS['WBTC-ethereum'],
      tokenOut: TOKENS['USDT-ethereum'],
      buyPrice: 63850.00,
      sellPrice: 65120.00,
      grossSpreadPct: 1.98,
      liquidityUsd: 4200000,
      estBuyGasUsd: 0.05,
      estSellGasUsd: 2.80,
      bridge: BRIDGES.stargate,
      estBridgeFeeUsd: 2.50,
      estBridgeTimeMin: 1.5,
      netProfitPct: 1.76,
      netProfitUsd: 88.00,
      maxCapacityUsd: 120000,
      priceImpactPct: 0.04,
      flashLoanEligible: false,
      flashLoanFeePct: 0,
      safetyRating: 'safe',
      safetyReasons: ['Deep Whale Liquidity ($4.2M)', 'Large Volume Arbitrage Candidate', 'Ethereum Gas factor included'],
      timestamp: Date.now() - 10000,
      executionSteps: [],
    }
  ];

  // Populate dynamic execution steps
  return opps.map(opp => recalculateOpportunity(opp, 1000, false));
}

// Recalculate profit and step-by-step actions based on trade capital and flash loan toggle
export function recalculateOpportunity(
  opp: ArbitrageOpportunity, 
  tradeSizeUsd: number,
  useFlashLoans: boolean
): ArbitrageOpportunity {
  const grossSpreadPct = ((opp.sellPrice - opp.buyPrice) / opp.buyPrice) * 100;
  
  // Calculate DEX trading fees
  const buyFeeUsd = tradeSizeUsd * (opp.buyDex.defaultFeePct / 100);
  const sellFeeUsd = tradeSizeUsd * (opp.sellDex.defaultFeePct / 100);
  const intermediateFeeUsd = opp.intermediateDex ? tradeSizeUsd * (opp.intermediateDex.defaultFeePct / 100) : 0;

  // Gas costs
  const gasBuyUsd = opp.estBuyGasUsd;
  const gasSellUsd = opp.estSellGasUsd;

  // Bridge fee (if cross-chain)
  let bridgeFeeUsd = 0;
  if (opp.type === 'cross_chain' && opp.bridge) {
    bridgeFeeUsd = opp.bridge.baseFeeUsd + (tradeSizeUsd * (opp.bridge.percentageFeePct / 100));
  }

  // Flash loan fee (if active)
  const flashFeeUsd = (useFlashLoans && opp.flashLoanEligible) ? tradeSizeUsd * (opp.flashLoanFeePct / 100) : 0;

  // Price impact based on trade volume vs liquidity depth
  const baseImpact = (tradeSizeUsd / Math.max(opp.liquidityUsd, 50000)) * 100 * 0.35;
  const priceImpactPct = Number(Math.min(baseImpact, 4.5).toFixed(3));
  const slippageUsd = tradeSizeUsd * (priceImpactPct / 100);

  // Profit calculation
  const grossProfitUsd = tradeSizeUsd * (grossSpreadPct / 100);
  const totalCostUsd = buyFeeUsd + sellFeeUsd + intermediateFeeUsd + gasBuyUsd + gasSellUsd + bridgeFeeUsd + flashFeeUsd + slippageUsd;
  const netProfitUsd = Number((grossProfitUsd - totalCostUsd).toFixed(2));
  const netProfitPct = Number(((netProfitUsd / tradeSizeUsd) * 100).toFixed(2));

  // Max capacity (estimate where net profit drops to 0.2%)
  const maxCapacityUsd = Math.round(opp.liquidityUsd * 0.08);

  // Generate clear step-by-step execution path
  const steps: ExecutionStep[] = [];

  if (useFlashLoans && opp.flashLoanEligible) {
    steps.push({
      stepNumber: 1,
      title: 'Borrow Flash Loan',
      description: `Borrow $${tradeSizeUsd.toLocaleString()} in ${opp.tokenIn.symbol} instantly from Aave/Balancer pool with 0 upfront capital.`,
      actionType: 'flash_loan',
      dexOrBridgeName: 'Aave V3 Pool',
      chain: opp.buyChain.id,
      linkUrl: `https://app.aave.com`,
      fromAmountFormatted: `$0 Collateral`,
      toAmountFormatted: `+$${tradeSizeUsd.toLocaleString()} ${opp.tokenIn.symbol}`,
      estGasUsd: 0.06,
      estDurationSec: 2,
    });
  }

  const buyTokenQty = (tradeSizeUsd / opp.buyPrice).toFixed(4);
  const buyStepNum = steps.length + 1;
  steps.push({
    stepNumber: buyStepNum,
    title: `Buy ${opp.tokenIn.symbol} on ${opp.buyDex.name}`,
    description: `Swap $${tradeSizeUsd.toLocaleString()} for ~${buyTokenQty} ${opp.tokenIn.symbol} at rate $${opp.buyPrice.toFixed(4)}.`,
    actionType: 'swap',
    dexOrBridgeName: opp.buyDex.name,
    chain: opp.buyChain.id,
    linkUrl: opp.buyDex.swapUrlPattern(opp.tokenIn.address, opp.tokenOut.address, opp.buyChain.id),
    fromAmountFormatted: `$${tradeSizeUsd.toLocaleString()}`,
    toAmountFormatted: `${buyTokenQty} ${opp.tokenIn.symbol}`,
    estGasUsd: opp.estBuyGasUsd,
    estDurationSec: opp.buyChain.blockTimeSec,
  });

  if (opp.type === 'cross_chain' && opp.bridge) {
    const bridgeStepNum = steps.length + 1;
    steps.push({
      stepNumber: bridgeStepNum,
      title: `Bridge via ${opp.bridge.name}`,
      description: `Transfer ${buyTokenQty} ${opp.tokenIn.symbol} from ${opp.buyChain.name} to ${opp.sellChain.name}. Estimated time: ~${opp.bridge.estimatedTimeMin} min.`,
      actionType: 'bridge',
      dexOrBridgeName: opp.bridge.name,
      chain: opp.buyChain.id,
      linkUrl: opp.bridge.bridgeUrlPattern(opp.buyChain.id, opp.sellChain.id, opp.tokenIn.symbol),
      fromAmountFormatted: `${buyTokenQty} ${opp.tokenIn.symbol} (${opp.buyChain.symbol})`,
      toAmountFormatted: `${buyTokenQty} ${opp.tokenIn.symbol} (${opp.sellChain.symbol})`,
      estGasUsd: bridgeFeeUsd,
      estDurationSec: opp.bridge.estimatedTimeMin * 60,
    });
  }

  const sellAmountGross = (Number(buyTokenQty) * opp.sellPrice).toFixed(2);
  const sellStepNum = steps.length + 1;
  steps.push({
    stepNumber: sellStepNum,
    title: `Sell ${opp.tokenIn.symbol} on ${opp.sellDex.name}`,
    description: `Sell ${buyTokenQty} ${opp.tokenIn.symbol} on ${opp.sellDex.name} at premium rate $${opp.sellPrice.toFixed(4)} and receive USDT/USDC.`,
    actionType: 'swap',
    dexOrBridgeName: opp.sellDex.name,
    chain: opp.sellChain.id,
    linkUrl: opp.sellDex.swapUrlPattern(opp.tokenIn.address, opp.tokenOut.address, opp.sellChain.id),
    fromAmountFormatted: `${buyTokenQty} ${opp.tokenIn.symbol}`,
    toAmountFormatted: `$${sellAmountGross} (Net: +$${netProfitUsd.toFixed(2)})`,
    estGasUsd: opp.estSellGasUsd,
    estDurationSec: opp.sellChain.blockTimeSec,
  });

  if (useFlashLoans && opp.flashLoanEligible) {
    steps.push({
      stepNumber: steps.length + 1,
      title: 'Repay Flash Loan & Keep Profit',
      description: `Automatically repay $${tradeSizeUsd.toLocaleString()} + $${flashFeeUsd.toFixed(2)} loan fee. Net profit retained in your wallet: +$${netProfitUsd.toFixed(2)}.`,
      actionType: 'flash_loan',
      dexOrBridgeName: 'Aave V3 Protocol',
      chain: opp.sellChain.id,
      linkUrl: `https://app.aave.com`,
      fromAmountFormatted: `$${tradeSizeUsd.toLocaleString()}`,
      toAmountFormatted: `+$${netProfitUsd.toFixed(2)} Pure Profit`,
      estGasUsd: 0.02,
      estDurationSec: 1,
    });
  }

  return {
    ...opp,
    grossSpreadPct: Number(grossSpreadPct.toFixed(2)),
    estBridgeFeeUsd: Number(bridgeFeeUsd.toFixed(2)),
    priceImpactPct,
    maxCapacityUsd,
    netProfitPct,
    netProfitUsd,
    executionSteps: steps,
  };
}

// Generate new live dynamic opportunity during real-time scanning
export function generateRandomOpportunity(): ArbitrageOpportunity {
  const chains = Object.values(CHAINS);
  const fromChain = chains[Math.floor(Math.random() * chains.length)];
  const isCrossChain = Math.random() > 0.6;
  const toChain = isCrossChain 
    ? chains.filter(c => c.id !== fromChain.id)[Math.floor(Math.random() * (chains.length - 1))]
    : fromChain;

  const chainDexesFrom = Object.values(DEXES).filter(d => d.chainIds.includes(fromChain.id));
  const chainDexesTo = Object.values(DEXES).filter(d => d.chainIds.includes(toChain.id));

  const buyDex = chainDexesFrom[Math.floor(Math.random() * chainDexesFrom.length)] || DEXES.uniswap_v3;
  let sellDex = chainDexesTo[Math.floor(Math.random() * chainDexesTo.length)] || DEXES.uniswap_v3;

  if (!isCrossChain && sellDex.id === buyDex.id) {
    const alternativeDexes = chainDexesFrom.filter(d => d.id !== buyDex.id);
    if (alternativeDexes.length > 0) {
      sellDex = alternativeDexes[0];
    }
  }

  const tokenKeys = Object.keys(TOKENS);
  const randomKey = tokenKeys[Math.floor(Math.random() * tokenKeys.length)];
  const baseToken = TOKENS[randomKey];

  const spread = 1.2 + Math.random() * 3.8;
  const buyPrice = baseToken.priceUsd * (1 - (spread / 200));
  const sellPrice = baseToken.priceUsd * (1 + (spread / 200));

  const opp: ArbitrageOpportunity = {
    id: `opp-live-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: isCrossChain ? 'cross_chain' : 'intra_chain',
    buyDex,
    sellDex,
    buyChain: fromChain,
    sellChain: toChain,
    tokenIn: baseToken,
    tokenOut: { ...baseToken, symbol: 'USDC', name: 'USD Coin' },
    buyPrice,
    sellPrice,
    grossSpreadPct: spread,
    liquidityUsd: Math.round(150000 + Math.random() * 2500000),
    estBuyGasUsd: fromChain.avgGasUsd,
    estSellGasUsd: toChain.avgGasUsd,
    bridge: isCrossChain ? BRIDGES.stargate : undefined,
    estBridgeFeeUsd: isCrossChain ? 1.4 : 0,
    estBridgeTimeMin: isCrossChain ? 1.2 : 0,
    netProfitPct: spread * 0.85,
    netProfitUsd: spread * 8.5,
    maxCapacityUsd: 15000,
    priceImpactPct: 0.12,
    flashLoanEligible: !isCrossChain,
    flashLoanFeePct: 0.05,
    safetyRating: Math.random() > 0.2 ? 'safe' : 'medium_risk',
    safetyReasons: ['Live Mempool Arbitrage Window', 'Positive Slippage Tolerance', 'Audited Pair Contract'],
    timestamp: Date.now(),
    executionSteps: [],
  };

  return recalculateOpportunity(opp, 1000, false);
}
