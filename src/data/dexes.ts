import type { DEXId, DEXInfo } from '../types/arbitrage';

export const DEXES: Record<DEXId, DEXInfo> = {
  uniswap_v3: {
    id: 'uniswap_v3',
    name: 'Uniswap v3',
    chainIds: ['ethereum', 'arbitrum', 'base', 'polygon', 'optimism', 'bsc', 'avalanche'],
    logo: 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    defaultFeePct: 0.05,
    trustScore: 99,
    swapUrlPattern: (tokenIn, tokenOut, chain) => 
      `https://app.uniswap.org/swap?inputCurrency=${tokenIn}&outputCurrency=${tokenOut}&chain=${chain}`,
  },
  uniswap_v2: {
    id: 'uniswap_v2',
    name: 'Uniswap v2',
    chainIds: ['ethereum'],
    logo: 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    defaultFeePct: 0.30,
    trustScore: 96,
    swapUrlPattern: (tokenIn, tokenOut) => 
      `https://app.uniswap.org/#/swap?use=v2&inputCurrency=${tokenIn}&outputCurrency=${tokenOut}`,
  },
  pancakeswap: {
    id: 'pancakeswap',
    name: 'PancakeSwap v3',
    chainIds: ['bsc', 'arbitrum', 'base', 'ethereum', 'polygon'],
    logo: 'https://tokens.pancakeswap.finance/images/symbol/cake.png',
    defaultFeePct: 0.25,
    trustScore: 97,
    swapUrlPattern: (tokenIn, tokenOut, chain) => 
      `https://pancakeswap.finance/swap?chain=${chain}&inputCurrency=${tokenIn}&outputCurrency=${tokenOut}`,
  },
  raydium: {
    id: 'raydium',
    name: 'Raydium',
    chainIds: ['solana'],
    logo: 'https://raw.githubusercontent.com/raydium-io/media-assets/master/logo.png',
    defaultFeePct: 0.25,
    trustScore: 95,
    swapUrlPattern: (tokenIn, tokenOut) => 
      `https://raydium.io/swap/?inputMint=${tokenIn}&outputMint=${tokenOut}`,
  },
  orca: {
    id: 'orca',
    name: 'Orca Whirlpools',
    chainIds: ['solana'],
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png',
    defaultFeePct: 0.04,
    trustScore: 96,
    swapUrlPattern: (tokenIn, tokenOut) => 
      `https://www.orca.so/?tokenIn=${tokenIn}&tokenOut=${tokenOut}`,
  },
  camelot: {
    id: 'camelot',
    name: 'Camelot DEX',
    chainIds: ['arbitrum'],
    logo: 'https://app.camelot.exchange/images/camelot_logo.png',
    defaultFeePct: 0.15,
    trustScore: 94,
    swapUrlPattern: (tokenIn, tokenOut) => 
      `https://app.camelot.exchange/?token1=${tokenIn}&token2=${tokenOut}`,
  },
  aerodrome: {
    id: 'aerodrome',
    name: 'Aerodrome Finance',
    chainIds: ['base'],
    logo: 'https://aerodrome.finance/favicon.svg',
    defaultFeePct: 0.05,
    trustScore: 96,
    swapUrlPattern: (tokenIn, tokenOut) => 
      `https://aerodrome.finance/swap?from=${tokenIn}&to=${tokenOut}`,
  },
  sushiswap: {
    id: 'sushiswap',
    name: 'SushiSwap v3',
    chainIds: ['ethereum', 'arbitrum', 'polygon', 'avalanche', 'optimism', 'bsc', 'base'],
    logo: 'https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/sushi.jpg',
    defaultFeePct: 0.30,
    trustScore: 92,
    swapUrlPattern: (tokenIn, tokenOut, chain) => 
      `https://www.sushi.com/swap?chainId=${chain}&token0=${tokenIn}&token1=${tokenOut}`,
  },
  curve: {
    id: 'curve',
    name: 'Curve Finance',
    chainIds: ['ethereum', 'arbitrum', 'polygon', 'optimism', 'avalanche', 'base'],
    logo: 'https://curve.fi/favicon.ico',
    defaultFeePct: 0.04,
    trustScore: 98,
    swapUrlPattern: (tokenIn, tokenOut) => 
      `https://curve.fi/#/ethereum/swap?from=${tokenIn}&to=${tokenOut}`,
  },
  traderjoe: {
    id: 'traderjoe',
    name: 'Trader Joe (LFJ)',
    chainIds: ['avalanche', 'arbitrum', 'bsc', 'ethereum'],
    logo: 'https://traderjoexyz.com/favicon.ico',
    defaultFeePct: 0.15,
    trustScore: 93,
    swapUrlPattern: (tokenIn, tokenOut) => 
      `https://lfj.gg/avalanche/trade?inputCurrency=${tokenIn}&outputCurrency=${tokenOut}`,
  },
  quickswap: {
    id: 'quickswap',
    name: 'QuickSwap DragonFi',
    chainIds: ['polygon'],
    logo: 'https://quickswap.exchange/favicon.ico',
    defaultFeePct: 0.30,
    trustScore: 91,
    swapUrlPattern: (tokenIn, tokenOut) => 
      `https://quickswap.exchange/#/swap?inputCurrency=${tokenIn}&outputCurrency=${tokenOut}`,
  },
};

export const DEX_LIST = Object.values(DEXES);
