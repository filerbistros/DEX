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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel bg-[#0c111d] border border-cyber-border rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Arbitrage Earnings Simulator
            </h2>
            <p className="text-xs text-cyber-textMuted font-mono">
              Forecast your daily and 30-day net returns based on live DEX spreads
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          
          {/* Starting Capital */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Starting Working Capital ($):</span>
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
              <span className="text-slate-300">Avg. Net Profit % per Trade:</span>
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
              <span className="text-slate-300">Arbitrage Trades Executed Per Day:</span>
              <span className="text-purple-400 font-bold">{tradesPerDay} trades/day</span>
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
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs font-mono text-slate-300">
              Compound Profits (Reinvest gains daily):
            </span>
            <button
              onClick={() => setCompoundProfits(!compoundProfits)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-cyber-dark/90 border border-cyber-border mb-6">
          <div>
            <div className="text-xs text-cyber-textMuted font-mono mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Daily Net Profit:
            </div>
            <div className="text-2xl font-black font-mono text-cyan-300">
              +${dailyProfitSimple.toFixed(2)}
            </div>
            <div className="text-[11px] text-cyber-textMuted mt-1 font-mono">
              From {tradesPerDay} executed routes
            </div>
          </div>

          <div>
            <div className="text-xs text-cyber-textMuted font-mono mb-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> 30-Day Total Net Profit:
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              +${finalMonthlyProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Est. Total Balance: <span className="text-white font-bold">${finalTotalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
          >
            Apply & Back to Scanner
          </button>
        </div>

      </div>
    </div>
  );
};
