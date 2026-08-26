import React from 'react';
import type { ChainId, ArbitrageOpportunity } from '../types/arbitrage';
import { CHAIN_LIST } from '../data/chains';
import { Globe, ArrowLeftRight } from 'lucide-react';

interface ChainSelectorProps {
  selectedChain: 'all' | 'cross_chain' | ChainId;
  onSelectChain: (chain: 'all' | 'cross_chain' | ChainId) => void;
  opportunities: ArbitrageOpportunity[];
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({
  selectedChain,
  onSelectChain,
  opportunities,
}) => {
  // Count opportunities per chain
  const getCount = (chainId: 'all' | 'cross_chain' | ChainId) => {
    if (chainId === 'all') return opportunities.length;
    if (chainId === 'cross_chain') return opportunities.filter(o => o.type === 'cross_chain').length;
    return opportunities.filter(o => o.buyChain.id === chainId || o.sellChain.id === chainId).length;
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
      
      {/* All Chains Option */}
      <button
        onClick={() => onSelectChain('all')}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
          selectedChain === 'all'
            ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-500/10'
            : 'bg-cyber-card border-cyber-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
        }`}
      >
        <Globe className="w-4 h-4 text-emerald-400" />
        <span>All Networks</span>
        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800/80 text-slate-300">
          {getCount('all')}
        </span>
      </button>

      {/* Cross Chain Special Tab */}
      <button
        onClick={() => onSelectChain('cross_chain')}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
          selectedChain === 'cross_chain'
            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 shadow-md shadow-purple-500/10'
            : 'bg-cyber-card border-cyber-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
        }`}
      >
        <ArrowLeftRight className="w-4 h-4 text-purple-400" />
        <span>Cross-Chain Bridges</span>
        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/40">
          {getCount('cross_chain')}
        </span>
      </button>

      {/* Individual Chain Buttons */}
      {CHAIN_LIST.map((chain) => {
        const count = getCount(chain.id);
        const isSelected = selectedChain === chain.id;

        return (
          <button
            key={chain.id}
            onClick={() => onSelectChain(chain.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              isSelected
                ? 'border-opacity-80 text-white shadow-lg'
                : 'bg-cyber-card border-cyber-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            style={{
              backgroundColor: isSelected ? chain.badgeBg : undefined,
              borderColor: isSelected ? chain.color : undefined,
            }}
          >
            <img 
              src={chain.logo} 
              alt={chain.name} 
              className="w-4 h-4 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }} 
            />
            <span>{chain.name}</span>
            <span 
              className="px-1.5 py-0.5 rounded-full text-[10px] font-mono"
              style={{
                backgroundColor: isSelected ? 'rgba(0,0,0,0.4)' : 'rgba(30,41,59,0.7)',
                color: isSelected ? chain.color : '#94a3b8',
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
