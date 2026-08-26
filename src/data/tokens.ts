import type { Token, ChainId } from '../types/arbitrage';

export const TOKENS: Record<string, Token> = {
  // Ethereum Mainnet
  eth_weth: {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    chainId: 'ethereum',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    priceUsd: 2470.50,
  },
  eth_usdc: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    chainId: 'ethereum',
    decimals: 6,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    priceUsd: 1.00,
    isStable: true,
  },
  eth_usdt: {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    chainId: 'ethereum',
    decimals: 6,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    priceUsd: 1.00,
    isStable: true,
  },
  eth_uni: {
    symbol: 'UNI',
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    chainId: 'ethereum',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    priceUsd: 4.29,
  },

  // Arbitrum
  arb_weth: {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    chainId: 'arbitrum',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    priceUsd: 2470.50,
  },
  arb_arb: {
    symbol: 'ARB',
    name: 'Arbitrum',
    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    chainId: 'arbitrum',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png',
    priceUsd: 0.093,
  },
  arb_usdc: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    chainId: 'arbitrum',
    decimals: 6,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    priceUsd: 1.00,
    isStable: true,
  },
  arb_link: {
    symbol: 'LINK',
    name: 'Chainlink',
    address: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
    chainId: 'arbitrum',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
    priceUsd: 11.45,
  },

  // Base
  base_weth: {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0x4200000000000000000000000000000000000006',
    chainId: 'base',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    priceUsd: 2470.50,
  },
  base_aero: {
    symbol: 'AERO',
    name: 'Aerodrome Finance',
    address: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    chainId: 'base',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png',
    priceUsd: 0.523,
  },
  base_usdc: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    chainId: 'base',
    decimals: 6,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    priceUsd: 1.00,
    isStable: true,
  },

  // Solana
  sol_sol: {
    symbol: 'SOL',
    name: 'Solana',
    address: 'So11111111111111111111111111111111111111112',
    chainId: 'solana',
    decimals: 9,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png',
    priceUsd: 97.66,
  },
  sol_usdc: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    chainId: 'solana',
    decimals: 6,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    priceUsd: 1.00,
    isStable: true,
  },

  // BSC
  bsc_wbnb: {
    symbol: 'WBNB',
    name: 'Wrapped BNB',
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    chainId: 'bsc',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png',
    priceUsd: 706.40,
  },
  bsc_cake: {
    symbol: 'CAKE',
    name: 'PancakeSwap',
    address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    chainId: 'bsc',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png',
    priceUsd: 1.62,
  },
  bsc_usdt: {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x55d398326f99059fF775485246999027B3197955',
    chainId: 'bsc',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    priceUsd: 1.00,
    isStable: true,
  },

  // Polygon
  pol_pol: {
    symbol: 'POL',
    name: 'Polygon Ecosystem Token',
    address: '0x455e53CBB86018Ac2B8092DDCD39d8444aFFC3e6',
    chainId: 'polygon',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png',
    priceUsd: 0.119,
  },
  pol_usdc: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    chainId: 'polygon',
    decimals: 6,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    priceUsd: 1.00,
    isStable: true,
  },

  // Avalanche
  avax_wavax: {
    symbol: 'WAVAX',
    name: 'Wrapped AVAX',
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    chainId: 'avalanche',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png',
    priceUsd: 7.40,
  },

  // Optimism
  op_op: {
    symbol: 'OP',
    name: 'Optimism',
    address: '0x4200000000000000000000000000000000000042',
    chainId: 'optimism',
    decimals: 18,
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png',
    priceUsd: 0.88,
  },
};

export function getTokensByChain(chainId: ChainId): Token[] {
  return Object.values(TOKENS).filter(t => t.chainId === chainId);
}
