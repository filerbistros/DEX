import React from 'react';
import { 
  Zap, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Fuel, 
  Layers, 
  Flame, 
  Play, 
  Sliders
} from 'lucide-react';
import type { ChainGasStatus } from '../services/gasService';

interface NavbarProps {
  isScanning: boolean;
  onToggleScanning: () => void;
  soundAlertsEnabled: boolean;
  onToggleSound: () => void;
  tradeSizeUsd: number;
  onChangeTradeSize: (size: number) => void;
  useFlashLoans: boolean;
  onToggleFlashLoans: () => void;
  gasStatus: ChainGasStatus[];
  onOpenGasModal: () => void;
  onOpenSimulatorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isScanning,
  onToggleScanning,
  soundAlertsEnabled,
  onToggleSound,
  tradeSizeUsd,
  onChangeTradeSize,
  useFlashLoans,
  onToggleFlashLoans,
  gasStatus,
  onOpenGasModal,
  onOpenSimulatorModal,
}) => {
  const avgGasUsd = gasStatus.length > 0 
    ? (gasStatus.reduce((acc, g) => acc + g.gasPriceUsd, 0) / gasStatus.length).toFixed(3)
    : '0.04';

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-border/70 bg-[#070b13]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Logo & Live Status */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20 border border-emerald-500/30 glow-emerald">
            <Zap className="w-6 h-6 text-emerald-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                DEX ARB SCANNER
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PRO 2.0
              </span>
            </div>
            <p className="text-xs text-cyber-textMuted hidden sm:flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Real-time DEX & Cross-Chain Arbitrage Terminal
            </p>
          </div>
        </div>

        {/* Action Controls & Capital Quick Selector */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Quick Trade Size Selector */}
          <div className="hidden lg:flex items-center bg-cyber-card border border-cyber-border rounded-xl p-1 text-xs">
            <span className="px-2 text-cyber-textMuted font-mono flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Capital:
            </span>
            {[500, 1000, 5000, 10000].map((size) => (
              <button
                key={size}
                onClick={() => onChangeTradeSize(size)}
                className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${
                  tradeSizeUsd === size
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                ${size.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Flash Loan Toggle */}
          <button
            onClick={onToggleFlashLoans}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              useFlashLoans
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                : 'bg-cyber-card border-cyber-border text-cyber-textMuted hover:text-slate-200'
            }`}
            title="Flash Loans: Trade with $0 upfront capital using Aave / Balancer pools"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Flash Loan:</span>
            <span className={useFlashLoans ? 'text-purple-300 font-bold' : 'text-slate-500'}>
              {useFlashLoans ? 'ACTIVE' : 'OFF'}
            </span>
          </button>

          {/* Gas Tracker Button */}
          <button
            onClick={onOpenGasModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyber-card border border-cyber-border hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all"
            title="Open Live Gas Tracker"
          >
            <Fuel className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-mono hidden sm:inline">Gas Avg:</span>
            <span className="font-mono text-cyan-400 font-bold">${avgGasUsd}</span>
          </button>

          {/* Sound Alerts Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-all ${
              soundAlertsEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-cyber-card border-cyber-border text-slate-500 hover:text-slate-300'
            }`}
            title={soundAlertsEnabled ? 'Sound Alerts: Enabled (>1.5% spread)' : 'Sound Alerts: Muted'}
          >
            {soundAlertsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Scanner Pause / Resume */}
          <button
            onClick={onToggleScanning}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-semibold text-xs transition-all ${
              isScanning
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
            }`}
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">SCANNING</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>RESUME</span>
              </>
            )}
          </button>

          {/* Custom Trade Simulator Button */}
          <button
            onClick={onOpenSimulatorModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulator</span>
          </button>

        </div>
      </div>
    </header>
  );
};
