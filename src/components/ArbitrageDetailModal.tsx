import React, { useState } from 'react';
import type { ArbitrageOpportunity } from '../types/arbitrage';
import { recalculateOpportunity } from '../services/arbitrageScanner';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  AlertTriangle, 
  Sparkles, 
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

interface ArbitrageDetailModalProps {
  opportunity: ArbitrageOpportunity | null;
  onClose: () => void;
  initialTradeSizeUsd: number;
  initialUseFlashLoans: boolean;
}

export const ArbitrageDetailModal: React.FC<ArbitrageDetailModalProps> = ({
  opportunity: baseOpp,
  onClose,
  initialTradeSizeUsd,
  initialUseFlashLoans,
}) => {
  if (!baseOpp) return null;

  const [tradeSize, setTradeSize] = useState<number>(initialTradeSizeUsd);
  const [useFlashLoans, setUseFlashLoans] = useState<boolean>(initialUseFlashLoans && baseOpp.flashLoanEligible);
  const [copiedToken, setCopiedToken] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const { t } = useLanguage();

  // Recalculate everything dynamically with current slider capital
  const opp = recalculateOpportunity(baseOpp, tradeSize, useFlashLoans);

  const handleCopyContract = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleSimulateExecution = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }, 1500);
  };

  const isExceedingCapacity = tradeSize > opp.maxCapacityUsd;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel bg-[#0c111d] border border-cyber-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl my-4 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6 pr-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-2xl font-black text-white truncate">
                {t('arbitrage_plan')}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                +{opp.netProfitPct.toFixed(2)}% ROI
              </span>
            </div>
            <p className="text-[11px] sm:text-sm text-cyber-textMuted font-mono truncate">
              {opp.tokenIn.symbol} / {opp.tokenOut.symbol} • {opp.buyDex.name} ➔ {opp.sellDex.name}
            </p>
          </div>
        </div>

        {/* Trade Size & Capital Calculator */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-cyber-dark/90 border border-cyber-border mb-4 sm:mb-6">
          <div className="flex items-center justify-between gap-4 mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider font-mono">
                {t('working_capital_modal')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg sm:text-xl font-extrabold font-mono text-emerald-400">
                ${tradeSize.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="100"
            max="25000"
            step="100"
            value={tradeSize}
            onChange={(e) => setTradeSize(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 mb-3"
          />

          {/* Quick preset buttons */}
          <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
            <div className="flex gap-1 sm:gap-1.5 flex-wrap">
              {[500, 1000, 2500, 5000, 10000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTradeSize(amount)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-xs border transition-all ${
                    tradeSize === amount
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ${amount >= 1000 ? `${amount / 1000}k` : amount}
                </button>
              ))}
            </div>

            {/* Flash loan toggle */}
            {opp.flashLoanEligible && (
              <button
                onClick={() => setUseFlashLoans(!useFlashLoans)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-[10px] sm:text-xs transition-all ${
                  useFlashLoans
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t('flash_loan_badge')}</span>
              </button>
            )}
          </div>

          {/* Warning if capacity exceeded */}
          {isExceedingCapacity && (
            <div className="mt-2.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>
                {t('capacity_warning_start')}{tradeSize.toLocaleString()}{t('capacity_warning_end')}
              </span>
            </div>
          )}
        </div>

        {/* Step-by-Step Execution Route */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-[11px] sm:text-xs font-bold text-cyber-textMuted uppercase tracking-wider font-mono mb-2.5">
            {t('execution_steps')} ({opp.executionSteps.length} {t('actions')})
          </h3>

          <div className="space-y-2 sm:space-y-3">
            {opp.executionSteps.map((step) => (
              <div 
                key={step.stepNumber}
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#090d17] border border-slate-800/80 hover:border-emerald-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3"
              >
                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 flex-shrink-0">
                    {step.stepNumber}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span>{step.title}</span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {step.dexOrBridgeName}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-cyber-textMuted mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Direct Action Link */}
                <a
                  href={step.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap transition-all self-end sm:self-center"
                >
                  <span>{t('open_btn')} {step.dexOrBridgeName}</span>
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Profit and Costs Summary Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-cyber-dark/80 border border-cyber-border mb-4 sm:mb-6">
          <div>
            <div className="text-[11px] sm:text-xs text-cyber-textMuted font-mono mb-1">{t('total_estimated_costs')}</div>
            <div className="text-[10px] sm:text-xs font-mono space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>{t('dex_fees')}:</span>
                <span>-${((tradeSize * (opp.buyDex.defaultFeePct + opp.sellDex.defaultFeePct)) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('network_gas_cost')}</span>
                <span>-${(opp.estBuyGasUsd + opp.estSellGasUsd).toFixed(3)}</span>
              </div>
              {opp.type === 'cross_chain' && (
                <div className="flex justify-between text-purple-300">
                  <span>{t('bridge_fee_label')}:</span>
                  <span>-${opp.estBridgeFeeUsd.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t('est_price_impact')} ({opp.priceImpactPct}%):</span>
                <span>-${((tradeSize * opp.priceImpactPct) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center sm:items-end border-t sm:border-t-0 sm:border-l border-slate-800 pt-2.5 sm:pt-0 sm:pl-4">
            <div className="text-[11px] sm:text-xs text-cyber-textMuted font-mono">{t('net_profit')}:</div>
            <div className="text-xl sm:text-3xl font-black font-mono text-emerald-400">
              +${opp.netProfitUsd.toFixed(2)}
            </div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-emerald-500">
              +{opp.netProfitPct.toFixed(2)}% {t('net_return')}
            </div>
          </div>
        </div>

        {/* Token Contract Copy & Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-400 self-start sm:self-auto">
            <span className="truncate max-w-[200px] sm:max-w-none">{t('token_contract')} {opp.tokenIn.address.slice(0, 6)}...{opp.tokenIn.address.slice(-4)}</span>
            <button
              onClick={() => handleCopyContract(opp.tokenIn.address)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Copy Token Address"
            >
              {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleSimulateExecution}
              disabled={isSimulating}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
            >
              {isSimulating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('simulating')}</span>
                </>
              ) : simulationComplete ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t('simulated')} (+${opp.netProfitUsd.toFixed(2)})</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('simulate_execution')}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
