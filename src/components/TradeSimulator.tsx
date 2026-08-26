import React, { useState } from 'react';
import { X, Calculator, TrendingUp, Calendar } from 'lucide-react';

interface TradeSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  avgNetProfitPct: number;
}

export const TradeSimulator: React.FC<TradeSimulatorProps> = ({
  isOpen,
  onClose,
  avgNetProfitPct,
}) => {
  if (!isOpen) return null;

  const [capital, setCapital] = useState<number>(2000);
  const [tradesPerDay, setTradesPerDay] = useState<number>(4);
  const [expectedRoiPct, setExpectedRoiPct] = useState<number>(avgNetProfitPct > 0 ? Number(avgNetProfitPct.toFixed(2)) : 2.2);
  const [compoundProfits, setCompoundProfits] = useState<boolean>(true);

  // Math Calculations
  const dailyProfitSimple = capital * (expectedRoiPct / 100) * tradesPerDay;
  const monthlyProfitSimple = dailyProfitSimple * 30;

  // Compound 30 days calculation
  let compoundCapital = capital;
  for (let i = 0; i < 30; i++) {
    const dayGain = compoundCapital * (expectedRoiPct / 100) * tradesPerDay;
    compoundCapital += dayGain;
  }
  const monthlyProfitCompound = compoundCapital - capital;

  const finalMonthlyProfit = compoundProfits ? monthlyProfitCompound : monthlyProfitSimple;
  const finalTotalBalance = compoundProfits ? compoundCapital : capital + monthlyProfitSimple;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel bg-[#0c111d] border border-cyber-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6 pr-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white">
              Earnings Simulator
            </h2>
            <p className="text-[11px] sm:text-xs text-cyber-textMuted font-mono">
              Forecast your returns based on live DEX spreads
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          
          {/* Starting Capital */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Working Capital ($):</span>
              <span className="text-emerald-400 font-bold">${capital.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="200"
              max="50000"
              step="200"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Average Net Profit % per trade */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Avg. Net % per Trade:</span>
              <span className="text-cyan-400 font-bold">{expectedRoiPct.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6.0"
              step="0.1"
              value={expectedRoiPct}
              onChange={(e) => setExpectedRoiPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Number of Trades Per Day */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Trades Executed Per Day:</span>
              <span className="text-purple-400 font-bold">{tradesPerDay} / day</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={tradesPerDay}
              onChange={(e) => setTradesPerDay(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>

          {/* Compound toggle */}
          <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] sm:text-xs font-mono text-slate-300">
              Compound Daily Gains:
            </span>
            <button
              onClick={() => setCompoundProfits(!compoundProfits)}
              className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all ${
                compoundProfits 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {compoundProfits ? 'COMPOUND ON' : 'SIMPLE ONLY'}
            </button>
          </div>

        </div>

        {/* Projection Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-cyber-dark/90 border border-cyber-border mb-4 sm:mb-6">
          <div>
            <div className="text-[11px] sm:text-xs text-cyber-textMuted font-mono mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Daily Net Profit:
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-cyan-300">
              +${dailyProfitSimple.toFixed(2)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-cyber-textMuted mt-0.5 font-mono">
              From {tradesPerDay} executed routes
            </div>
          </div>

          <div>
            <div className="text-[11px] sm:text-xs text-cyber-textMuted font-mono mb-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> 30-Day Total Net Profit:
            </div>
            <div className="text-xl sm:text-3xl font-black font-mono text-emerald-400">
              +${finalMonthlyProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-mono">
              Est. Total: <span className="text-white font-bold">${finalTotalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
          >
            Apply & Back
          </button>
        </div>

      </div>
    </div>
  );
};
