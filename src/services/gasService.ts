import type { ChainId, ChainInfo } from '../types/arbitrage';
import { CHAINS } from '../data/chains';

export interface ChainGasStatus {
  chainId: ChainId;
  chainName: string;
  nativeSymbol: string;
  gwei: number;
  gasPriceUsd: number;
  fastGasPriceUsd: number;
  status: 'low' | 'normal' | 'high';
  lastUpdated: number;
}

export function calculateLiveGas(chain: ChainInfo): ChainGasStatus {
  // Add realistic micro-variations
  const deltaFactor = 0.92 + Math.random() * 0.16;
  const currentGwei = Number((chain.gwei * deltaFactor).toFixed(2));
  const currentGasUsd = Number((chain.avgGasUsd * deltaFactor).toFixed(3));
  const fastGasUsd = Number((currentGasUsd * 1.35).toFixed(3));

  let status: 'low' | 'normal' | 'high' = 'normal';
  if (deltaFactor < 0.95) status = 'low';
  if (deltaFactor > 1.08) status = 'high';

  return {
    chainId: chain.id,
    chainName: chain.name,
    nativeSymbol: chain.nativeToken,
    gwei: currentGwei,
    gasPriceUsd: currentGasUsd,
    fastGasPriceUsd: fastGasUsd,
    status,
    lastUpdated: Date.now(),
  };
}

export function getAllChainsGas(): ChainGasStatus[] {
  return Object.values(CHAINS).map(calculateLiveGas);
}
