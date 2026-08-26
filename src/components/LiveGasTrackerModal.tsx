import React from 'react';
import type { ChainGasStatus } from '../services/gasService';
import { CHAINS } from '../data/chains';
import { X, Fuel } from 'lucide-react';

interface LiveGasTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  gasStatus: ChainGasStatus[];
}

export const LiveGasTrackerModal: React.FC<LiveGasTrackerModalProps> = ({
  isOpen,
  onClose,
  gasStatus,
}) => {
  if (!isOpen) return null;

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
            <Fuel className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Multi-Chain Gas & Fee Matrix
            </h2>
            <p className="text-xs text-cyber-textMuted font-mono">
              Live network gas tracker with DEX swap and cross-chain bridge cost estimates
            </p>
          </div>
        </div>

        {/* Gas Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {gasStatus.map((gas) => {
            const chainInfo = CHAINS[gas.chainId];
            return (
              <div 
                key={gas.chainId}
                className="p-3.5 rounded-2xl bg-[#090d16] border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={chainInfo?.logo} 
                    alt={gas.chainName}
                    className="w-7 h-7 rounded-full object-cover"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{gas.chainName}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        gas.status === 'low' ? 'bg-emerald-400' : gas.status === 'high' ? 'bg-rose-400' : 'bg-amber-400'
                      }`}></span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {gas.gwei} Gwei • {chainInfo?.blockTimeSec}s block
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black font-mono text-cyan-300">
                    ${gas.gasPriceUsd.toFixed(3)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    per swap
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 text-cyan-300 text-xs font-mono mb-6">
          💡 <strong>Arbitrage Pro Tip:</strong> L2 networks (Arbitrum, Base, Optimism) and Solana offer &lt;$0.05 gas fees, making micro-spreads (&gt;0.8%) immediately profitable.
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
