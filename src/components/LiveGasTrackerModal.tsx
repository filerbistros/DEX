import React from 'react';
import type { ChainGasStatus } from '../services/gasService';
import { CHAINS } from '../data/chains';
import { X, Fuel } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  if (!isOpen) return null;

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
            <Fuel className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white">
              {t('gas_tracker_title')}
            </h2>
            <p className="text-[11px] sm:text-xs text-cyber-textMuted font-mono">
              {t('gas_tracker_sub')}
            </p>
          </div>
        </div>

        {/* Gas Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          {gasStatus.map((gas) => {
            const chainInfo = CHAINS[gas.chainId];
            return (
              <div 
                key={gas.chainId}
                className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#090d16] border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <img 
                    src={chainInfo?.logo} 
                    alt={gas.chainName}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{gas.chainName}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        gas.status === 'low' ? 'bg-emerald-400' : gas.status === 'high' ? 'bg-rose-400' : 'bg-amber-400'
                      }`}></span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                      {gas.gwei} Gwei • {chainInfo?.blockTimeSec}s
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs sm:text-sm font-black font-mono text-cyan-300">
                    ${gas.gasPriceUsd.toFixed(3)}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono">
                    {t('per_swap')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-cyan-300 text-[11px] sm:text-xs font-mono mb-4 sm:mb-6">
          {t('gas_tip')}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
          >
            {t('close_tracker')}
          </button>
        </div>

      </div>
    </div>
  );
};
