import React from 'react';
import type { ArbitrageOpportunity } from '../types/arbitrage';
import { DollarSign, Activity, Percent, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StatsOverviewProps {
  opportunities: ArbitrageOpportunity[];
  tradeSizeUsd: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  opportunities,
  tradeSizeUsd,
}) => {
  const { t } = useLanguage();

  const maxNetProfitPct = opportunities.length > 0
    ? Math.max(...opportunities.map(o => o.netProfitPct))
    : 0;

  const maxNetProfitUsd = opportunities.length > 0
    ? Math.max(...opportunities.map(o => o.netProfitUsd))
    : 0;

  const avgSpread = opportunities.length > 0
    ? (opportunities.reduce((acc, o) => acc + o.grossSpreadPct, 0) / opportunities.length).toFixed(2)
    : '0.00';

  const profitableCount = opportunities.filter(o => o.netProfitPct > 0.5).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
      
      {/* 1. Best Spread Opportunity */}
      <div className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-cyber-textMuted mb-1 text-[11px] sm:text-xs font-semibold">
          <span>{t('max_net_roi')}</span>
          <div className="p-1 sm:p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-emerald-400 truncate">
            +{maxNetProfitPct > 0 ? maxNetProfitPct.toFixed(2) : '0.00'}%
          </div>
          <div className="text-[10px] sm:text-[11px] text-cyber-textMuted mt-0.5 sm:mt-1 font-mono truncate">
            {t('max_roi_sub')}
          </div>
        </div>
      </div>

      {/* 2. Estimated Max Profit in USD */}
      <div className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-cyber-textMuted mb-1 text-[11px] sm:text-xs font-semibold">
          <span className="truncate">{t('est_net_profit')} (${tradeSizeUsd >= 1000 ? `${tradeSizeUsd / 1000}k` : tradeSizeUsd})</span>
          <div className="p-1 sm:p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-cyan-300 truncate">
            +${maxNetProfitUsd > 0 ? maxNetProfitUsd.toFixed(2) : '0.00'}
          </div>
          <div className="text-[10px] sm:text-[11px] text-cyber-textMuted mt-0.5 sm:mt-1 font-mono truncate">
            {t('est_net_sub')}
          </div>
        </div>
      </div>

      {/* 3. Profitable Pairs Found */}
      <div className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-cyber-textMuted mb-1 text-[11px] sm:text-xs font-semibold">
          <span>{t('live_pairs')}</span>
          <div className="p-1 sm:p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5 truncate">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-white">
              {profitableCount}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-slate-400">
              / {opportunities.length}
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-0.5 sm:mt-1 font-mono flex items-center gap-1 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0"></span>
            {t('avg_spread')} +{avgSpread}%
          </div>
        </div>
      </div>

      {/* 4. Safety & Execution Status */}
      <div className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-cyber-textMuted mb-1 text-[11px] sm:text-xs font-semibold">
          <span>{t('mev_protection')}</span>
          <div className="p-1 sm:p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-amber-400 truncate">
            {t('mev_status')}
          </div>
          <div className="text-[10px] sm:text-[11px] text-cyber-textMuted mt-0.5 sm:mt-1 font-mono truncate">
            {t('mev_sub')}
          </div>
        </div>
      </div>

    </div>
  );
};
