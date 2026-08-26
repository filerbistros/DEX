import type { Bridge } from '../types/arbitrage';

export const BRIDGES: Record<string, Bridge> = {
  stargate: {
    id: 'stargate',
    name: 'Stargate V2 (LayerZero)',
    logo: 'https://stargate.finance/favicons/favicon.ico',
    estimatedTimeMin: 1.5,
    baseFeeUsd: 1.20,
    percentageFeePct: 0.04,
    supportedChains: ['ethereum', 'arbitrum', 'optimism', 'polygon', 'avalanche', 'bsc', 'base'],
    bridgeUrlPattern: (from, to, token) => 
      `https://stargate.finance/transfer?srcChain=${from}&dstChain=${to}&srcToken=${token}`,
  },
  across: {
    id: 'across',
    name: 'Across Protocol',
    logo: 'https://across.to/favicon.ico',
    estimatedTimeMin: 0.8,
    baseFeeUsd: 0.90,
    percentageFeePct: 0.03,
    supportedChains: ['ethereum', 'arbitrum', 'optimism', 'polygon', 'base'],
    bridgeUrlPattern: (from, to, token) => 
      `https://app.across.to/bridge?from=${from}&to=${to}&asset=${token}`,
  },
  debridge: {
    id: 'debridge',
    name: 'deBridge (DLN)',
    logo: 'https://debridge.finance/assets/favicon/favicon-32x32.png',
    estimatedTimeMin: 0.5,
    baseFeeUsd: 1.50,
    percentageFeePct: 0.05,
    supportedChains: ['ethereum', 'arbitrum', 'optimism', 'polygon', 'avalanche', 'bsc', 'base', 'solana'],
    bridgeUrlPattern: (from, to, token) => 
      `https://app.debridge.finance/deswap?inputChain=${from}&outputChain=${to}&inputCurrency=${token}`,
  },
  cbridge: {
    id: 'cbridge',
    name: 'Celer cBridge',
    logo: 'https://cbridge.celer.network/favicon.ico',
    estimatedTimeMin: 3.0,
    baseFeeUsd: 1.10,
    percentageFeePct: 0.04,
    supportedChains: ['ethereum', 'arbitrum', 'optimism', 'polygon', 'avalanche', 'bsc'],
    bridgeUrlPattern: (from, to, token) => 
      `https://cbridge.celer.network/#/transfer?sourceChainId=${from}&destinationChainId=${to}&tokenSymbol=${token}`,
  },
};

export const BRIDGE_LIST = Object.values(BRIDGES);
