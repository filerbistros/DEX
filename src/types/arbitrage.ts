export type ChainId = 
  | 'ethereum' 
  | 'arbitrum' 
  | 'base' 
  | 'bsc' 
  | 'solana' 
  | 'polygon' 
  | 'avalanche' 
  | 'optimism';

export interface ChainInfo {
  id: ChainId;
  name: string;
  symbol: string;
  nativeToken: string;
  logo: string;
  explorerUrl: string;
  avgGasUsd: number;
  gwei: number;
  color: string;
  badgeBg: string;
  blockTimeSec: number;
}

export type DEXId = 
  | 'uniswap_v3' 
  | 'uniswap_v2' 
  | 'pancakeswap' 
  | 'raydium' 
  | 'orca' 
  | 'camelot' 
  | 'aerodrome' 
  | 'sushiswap' 
  | 'curve' 
  | 'traderjoe' 
  | 'quickswap';

export interface DEXInfo {
  id: DEXId;
  name: string;
  chainIds: ChainId[];
  logo: string;
  defaultFeePct: number;
  swapUrlPattern: (tokenIn: string, tokenOut: string, chain: ChainId) => string;
  trustScore: number; // 1-100
}

export interface Token {
  symbol: string;
  name: string;
  address: string;
  chainId: ChainId;
  decimals: number;
  logo: string;
  priceUsd: number;
  isStable?: boolean;
}

export interface Bridge {
  id: string;
  name: string;
  logo: string;
  estimatedTimeMin: number;
  baseFeeUsd: number;
  percentageFeePct: number;
  supportedChains: ChainId[];
  bridgeUrlPattern: (fromChain: ChainId, toChain: ChainId, token: string) => string;
}

export interface ExecutionStep {
  stepNumber: number;
  title: string;
  description: string;
  actionType: 'swap' | 'bridge' | 'approve' | 'flash_loan';
  dexOrBridgeName: string;
  chain: ChainId;
  linkUrl: string;
  fromAmountFormatted: string;
  toAmountFormatted: string;
  estGasUsd: number;
  estDurationSec: number;
}

export type ArbitrageType = 'intra_chain' | 'cross_chain' | 'triangular';

export interface ArbitrageOpportunity {
  id: string;
  type: ArbitrageType;
  buyDex: DEXInfo;
  sellDex: DEXInfo;
  intermediateDex?: DEXInfo;
  buyChain: ChainInfo;
  sellChain: ChainInfo;
  tokenIn: Token;
  tokenOut: Token;
  intermediateToken?: Token;
  buyPrice: number;
  sellPrice: number;
  grossSpreadPct: number;
  liquidityUsd: number;
  estBuyGasUsd: number;
  estSellGasUsd: number;
  bridge?: Bridge;
  estBridgeFeeUsd: number;
  estBridgeTimeMin: number;
  netProfitPct: number;
  netProfitUsd: number; // calculated at tradeSizeUsd
  maxCapacityUsd: number;
  priceImpactPct: number;
  flashLoanEligible: boolean;
  flashLoanFeePct: number;
  safetyRating: 'safe' | 'medium_risk' | 'unverified';
  safetyReasons: string[];
  timestamp: number;
  executionSteps: ExecutionStep[];
}

export interface ArbitrageFilterState {
  selectedChain: 'all' | 'cross_chain' | ChainId;
  minSpreadPct: number;
  minLiquidityUsd: number;
  arbitrageType: 'all' | 'intra_chain' | 'cross_chain' | 'triangular';
  tradeSizeUsd: number;
  useFlashLoansOnly: boolean;
  minNetProfitUsd: number;
  sortBy: 'netProfitPct' | 'netProfitUsd' | 'grossSpreadPct' | 'liquidityUsd' | 'timestamp';
  sortOrder: 'desc' | 'asc';
  searchQuery: string;
  soundAlertsEnabled: boolean;
  soundThresholdPct: number;
}
