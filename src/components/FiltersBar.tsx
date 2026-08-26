import React from 'react';
import type { ArbitrageFilterState } from '../types/arbitrage';
import { Search, ArrowUpDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FiltersBarProps {
  filters: ArbitrageFilterState;
  onFilterChange: (newFilters: Partial<ArbitrageFilterState>) => void;
  totalFiltered: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  onFilterChange,
  totalFiltered,
}) => {
  const { t } = useLanguage();

  return (
    <div className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-cyber-border space-y-3">
      
      {/* Top Search & Filter row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-cyber-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-9 sm:pl-10 pr-8 py-2 rounded-xl bg-cyber-dark border border-cyber-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 font-mono transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Pills & Minimum Spread Filter */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 justify-between lg:justify-end">
          
          {/* Arbitrage Type Selector */}
          <div className="flex items-center gap-1 bg-cyber-dark p-0.5 sm:p-1 rounded-xl border border-cyber-border overflow-x-auto text-[11px] sm:text-xs">
            {[
              { id: 'all', label: t('filter_all') },
              { id: 'intra_chain', label: t('filter_intra') },
              { id: 'cross_chain', label: t('filter_cross') },
              { id: 'triangular', label: t('filter_triangular') },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => onFilterChange({ arbitrageType: type.id as ArbitrageFilterState['arbitrageType'] })}
                className={`px-2 sm:px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                  filters.arbitrageType === type.id
                    ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Min Spread Filter Buttons */}
          <div className="flex items-center gap-1 text-[11px] sm:text-xs">
            {[0, 1, 2, 3].map((spread) => (
              <button
                key={spread}
                onClick={() => onFilterChange({ minSpreadPct: spread })}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border font-mono font-bold transition-all ${
                  filters.minSpreadPct === spread
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                    : 'bg-cyber-dark border-cyber-border text-slate-400 hover:text-slate-200'
                }`}
              >
                {spread === 0 ? t('filter_all') : `>${spread}%`}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Secondary Sort and Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-cyber-border/40 text-[11px] sm:text-xs text-cyber-textMuted font-mono">
        <div>
          {t('showing_pairs')} <strong className="text-white">{totalFiltered}</strong> {t('optimal_pairs')}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">{t('sort_label')}</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as ArbitrageFilterState['sortBy'] })}
            className="bg-cyber-dark border border-cyber-border rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-emerald-500/50 text-[11px] sm:text-xs font-mono cursor-pointer"
          >
            <option value="netProfitPct">{t('sort_roi')}</option>
            <option value="netProfitUsd">{t('sort_profit_usd')}</option>
            <option value="grossSpreadPct">{t('sort_gross_spread')}</option>
            <option value="liquidityUsd">{t('sort_liquidity')}</option>
            <option value="timestamp">{t('sort_timestamp')}</option>
          </select>
        </div>
      </div>

    </div>
  );
};
