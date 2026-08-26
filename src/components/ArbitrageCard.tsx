import React, { useState } from 'react';
import type { ArbitrageOpportunity } from '../types/arbitrage';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Info,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ArbitrageCardProps {
  opportunity: ArbitrageOpportunity;
  tradeSizeUsd: number;
  useFlashLoans: boolean;
  onSelectOpportunity: (opp: ArbitrageOpportunity) => void;
}

export const ArbitrageCard: React.FC<ArbitrageCardProps> = ({
  opportunity,
  tradeSizeUsd,
  onSelectOpportunity,
}) => {
  const [showCostDetails, setShowCostDetails] = useState(false);
  const { t } = useLanguage();

  const isCrossChain = opportunity.type === 'cross_chain';
  const isTriangular = opportunity.type === 'triangular';

  const totalGasUsd = (opportunity.estBuyGasUsd + opportunity.estSellGasUsd).toFixed(3);
  const totalDexFeesPct = (
    opportunity.buyDex.defaultFeePct + 
    opportunity.sellDex.defaultFeePct + 
    (opportunity.intermediateDex ? opportunity.intermediateDex.defaultFeePct : 0)
  ).toFixed(2);

  return (
    <div className="glass-panel glass-panel-hover rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-cyber-border transition-all relative overflow-hidden flex flex-col justify-between">
      
      {/* Top row: Chain & Opportunity Badges */}
      <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          
          {/* Main Pair Badge */}
          <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-bold text-white">
            <img 
              src={opportunity.tokenIn.logo} 
              alt={opportunity.tokenIn.symbol}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <span>{opportunity.tokenIn.symbol}</span>
            <span className="text-slate-500">/</span>
            <span>{opportunity.tokenOut.symbol}</span>
          </div>

          {/* Arbitrage Type Badge */}
          {isCrossChain ? (
            <span className="px-2 py-0.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] sm:text-[11px] font-mono font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" /> {t('cross_chain_badge')} ({opportunity.bridge?.name.split(' ')[0]})
            </span>
          ) : isTriangular ? (
            <span className="px-2 py-0.5 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono font-semibold flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" /> {t('triangular_badge')}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-[11px] font-mono font-semibold">
              {t('dex_arbitrage_badge')}
            </span>
          )}

          {/* Flash Loan badge */}
          {opportunity.flashLoanEligible && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-medium">
              {t('flash_loan_badge')}
            </span>
          )}
        </div>

        {/* Safety Indicator */}
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 flex-shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t('audited')}</span>
        </div>
      </div>

      {/* Center Route Diagram (Buy -> Bridge/Swap -> Sell) */}
      <div className="my-1.5 sm:my-2 p-2.5 sm:p-3 rounded-xl bg-cyber-dark/80 border border-cyber-border/70 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 items-stretch">
          
          {/* Step A: Buy Side */}
          <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-[#0d121f] border border-slate-800">
            <div className="flex items-center gap-2">
              <img 
                src={opportunity.buyDex.logo} 
                alt={opportunity.buyDex.name} 
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-slate-900 p-0.5 object-contain flex-shrink-0" 
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[11px] text-cyber-textMuted flex items-center gap-1 font-mono truncate">
                  <span>{t('buy_on')}</span>
                  <span className="text-white font-semibold truncate">{opportunity.buyDex.name}</span>
                </div>
                <div className="text-xs font-mono font-bold text-slate-200">
                  ${opportunity.buyPrice < 1 ? opportunity.buyPrice.toFixed(4) : opportunity.buyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="text-right flex-shrink-0 pl-2">
              <span 
                className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded border block truncate max-w-[90px]"
                style={{
                  backgroundColor: opportunity.buyChain.badgeBg,
                  borderColor: opportunity.buyChain.color,
                  color: opportunity.buyChain.color,
                }}
              >
                {opportunity.buyChain.name}
              </span>
            </div>
          </div>

          {/* Step B: Sell Side */}
          <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-[#0d121f] border border-slate-800">
            <div className="flex items-center gap-2">
              <img 
                src={opportunity.sellDex.logo} 
                alt={opportunity.sellDex.name} 
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-slate-900 p-0.5 object-contain flex-shrink-0" 
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[11px] text-cyber-textMuted flex items-center gap-1 font-mono truncate">
                  <span>{t('sell_on')}</span>
                  <span className="text-white font-semibold truncate">{opportunity.sellDex.name}</span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400">
                  ${opportunity.sellPrice < 1 ? opportunity.sellPrice.toFixed(4) : opportunity.sellPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="text-right flex-shrink-0 pl-2">
              <span 
                className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded border block truncate max-w-[90px]"
                style={{
                  backgroundColor: opportunity.sellChain.badgeBg,
                  borderColor: opportunity.sellChain.color,
                  color: opportunity.sellChain.color,
                }}
              >
                {opportunity.sellChain.name}
              </span>
            </div>
          </div>

        </div>

        {/* Bridge indicator if cross-chain */}
        {isCrossChain && opportunity.bridge && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-purple-300 bg-purple-950/30 rounded-lg border border-purple-900/40 gap-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-purple-400 flex-shrink-0" />
              <span className="truncate">{t('bridge_via')} {opportunity.bridge.name} (~{opportunity.bridge.estimatedTimeMin} min)</span>
            </div>
            <span className="text-slate-400">{t('fee_approx')} ~${opportunity.estBridgeFeeUsd.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Bottom section: Profit Summary & Execution button */}
      <div className="pt-2">
        
        {/* Profit Metrics */}
        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
          <div>
            <div className="text-[10px] sm:text-[11px] text-cyber-textMuted font-mono">
              {t('net_profit')} (${tradeSizeUsd >= 1000 ? `${tradeSizeUsd / 1000}k` : tradeSizeUsd})
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-2xl font-black font-mono text-emerald-400">
                +${opportunity.netProfitUsd.toFixed(2)}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                +{opportunity.netProfitPct.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] sm:text-[11px] text-cyber-textMuted font-mono">{t('gross_spread')}</div>
            <div className="text-xs sm:text-sm font-mono font-bold text-cyan-300">
              +{opportunity.grossSpreadPct.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Breakdown of Costs Toggle */}
        <div className="mb-2.5 sm:mb-3">
          <button
            onClick={() => setShowCostDetails(!showCostDetails)}
            className="text-[10px] sm:text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <Info className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span>{showCostDetails ? t('hide_costs') : t('show_fee_breakdown')}</span>
          </button>

          {showCostDetails && (
            <div className="mt-2 p-2 sm:p-2.5 rounded-xl bg-[#090d16] border border-slate-800 text-[10px] sm:text-[11px] font-mono space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">{t('dex_fees')} ({totalDexFeesPct}%):</span>
                <span>-${((tradeSizeUsd * Number(totalDexFeesPct)) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t('network_gas_cost')}</span>
                <span>-${totalGasUsd}</span>
              </div>
              {isCrossChain && (
                <div className="flex justify-between text-purple-300">
                  <span>{t('bridge_fee_label')} ({opportunity.bridge?.name}):</span>
                  <span>-${opportunity.estBridgeFeeUsd.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">{t('est_price_impact')} ({opportunity.priceImpactPct}%):</span>
                <span>-${((tradeSizeUsd * opportunity.priceImpactPct) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                <span>{t('pool_liquidity')}</span>
                <span className="text-cyan-400">${opportunity.liquidityUsd.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button: Execute Route */}
        <button
          onClick={() => onSelectOpportunity(opportunity)}
          className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-200"
        >
          <span>{t('view_route_trade')}</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

      </div>

    </div>
  );
};
