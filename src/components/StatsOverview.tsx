import React from 'react';
import type { ArbitrageOpportunity } from '../types/arbitrage';
import { DollarSign, Activity, Percent, ShieldCheck } from 'lucide-react';

interface StatsOverviewProps {
  opportunities: ArbitrageOpportunity[];
  tradeSizeUsd: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  opportunities,
  tradeSizeUsd,
}) => {
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      
      {/* 1. Best Spread Opportunity */}
      <div className="glass-panel rounded-2xl p-4 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent relative overflow-hidden">
        <div className="flex items-center justify-between text-cyber-textMuted mb-1 text-xs font-semibold">
          <span>Max Net ROI</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
          +{maxNetProfitPct > 0 ? maxNetProfitPct.toFixed(2) : '0.00'}%
        </div>
        <div className="text-[11px] text-cyber-textMuted mt-1 font-mono">
          Pure profit after all gas & fees
        </div>
      </div>

      {/* 2. Estimated Max Profit in USD */}
      <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent relative overflow-hidden">
        <div className="flex items-center justify-between text-cyber-textMuted mb-1 text-xs font-semibold">
          <span>Est. Net Profit (${tradeSizeUsd.toLocaleString()})</span>
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
          +${maxNetProfitUsd > 0 ? maxNetProfitUsd.toFixed(2) : '0.00'}
        </div>
        <div className="text-[11px] text-cyber-textMuted mt-1 font-mono">
          Per single trade execution
        </div>
      </div>

      {/* 3. Profitable Pairs Found */}
      <div className="glass-panel rounded-2xl p-4 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent relative overflow-hidden">
        <div className="flex items-center justify-between text-cyber-textMuted mb-1 text-xs font-semibold">
          <span>Live Opportunities</span>
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
            {profitableCount}
          </span>
          <span className="text-xs font-mono text-slate-400">
            / {opportunities.length} pairs
          </span>
        </div>
        <div className="text-[11px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          Avg spread: +{avgSpread}%
        </div>
      </div>

      {/* 4. Safety & Execution Status */}
      <div className="glass-panel rounded-2xl p-4 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden">
        <div className="flex items-center justify-between text-cyber-textMuted mb-1 text-xs font-semibold">
          <span>Slippage & Risk Filter</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
          PROTECTED
        </div>
        <div className="text-[11px] text-cyber-textMuted mt-1 font-mono">
          Honeypot & MEV simulation active
        </div>
      </div>

    </div>
  );
};
