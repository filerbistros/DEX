import React from 'react';
import type { ArbitrageOpportunity, ChainId } from '../types/arbitrage';
import { CHAINS } from '../data/chains';
import { Network, GitFork } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

  // Count opportunities per chain
  const chainCounts: Record<string, number> = {
    all: opportunities.length,
    cross_chain: opportunities.filter(o => o.type === 'cross_chain').length,
  };

  Object.keys(CHAINS).forEach((chainId) => {
    chainCounts[chainId] = opportunities.filter(
      o => o.buyChain.id === chainId || o.sellChain.id === chainId
    ).length;
  });

  return (
    <div className="w-full overflow-x-auto scrollbar-none pb-2">
      <div className="flex items-center gap-2 min-w-max">
        
        {/* All Networks Filter */}
        <button
          onClick={() => onSelectChain('all')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            selectedChain === 'all'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/60 shadow-[0_0_15px_rgba(0,245,155,0.25)]'
              : 'bg-cyber-card border border-cyber-border text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>{t('all_networks')}</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            selectedChain === 'all' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-slate-800 text-slate-400'
          }`}>
            {chainCounts.all}
          </span>
        </button>

        {/* Cross-Chain Bridge Filter */}
        <button
          onClick={() => onSelectChain('cross_chain')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            selectedChain === 'cross_chain'
              ? 'bg-purple-500/25 text-purple-300 border border-purple-500/60 shadow-[0_0_15px_rgba(139,92,246,0.25)]'
              : 'bg-cyber-card border border-cyber-border text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <GitFork className="w-3.5 h-3.5 text-purple-400" />
          <span>{t('cross_chain_bridges')}</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            selectedChain === 'cross_chain' ? 'bg-purple-500/30 text-purple-200' : 'bg-slate-800 text-slate-400'
          }`}>
            {chainCounts.cross_chain}
          </span>
        </button>

        {/* Individual Blockchain Filters */}
        {Object.values(CHAINS).map((chain) => {
          const isSelected = selectedChain === chain.id;
          const count = chainCounts[chain.id] || 0;

          return (
            <button
              key={chain.id}
              onClick={() => onSelectChain(chain.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                isSelected
                  ? 'border shadow-md'
                  : 'bg-cyber-card border border-cyber-border text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              style={
                isSelected
                  ? {
                      backgroundColor: chain.badgeBg,
                      borderColor: chain.color,
                      color: chain.color,
                      boxShadow: `0 0 14px ${chain.color}33`,
                    }
                  : {}
              }
            >
              <img 
                src={chain.logo} 
                alt={chain.name}
                className="w-4 h-4 rounded-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span>{chain.name}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected ? 'bg-black/30 font-bold' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};
