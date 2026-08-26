import React, { useState } from 'react';
import { 
  Zap, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Fuel, 
  Layers, 
  Flame, 
  Play, 
  Sliders,
  Radio,
  Menu,
  X,
  Globe
} from 'lucide-react';
import type { ChainGasStatus } from '../services/gasService';
import { useLanguage } from '../context/LanguageContext';

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
  isLiveMainnetMode: boolean;
  onToggleLiveMainnet: () => void;
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
  isLiveMainnetMode,
  onToggleLiveMainnet,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const avgGasUsd = gasStatus.length > 0 
    ? (gasStatus.reduce((acc, g) => acc + g.gasPriceUsd, 0) / gasStatus.length).toFixed(3)
    : '0.04';

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-border/70 bg-[#070b13]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          
          {/* Logo & Live Status */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20 border border-emerald-500/30 glow-emerald">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-extrabold text-base sm:text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  {t('app_title')}
                </h1>
                <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {t('app_badge')}
                </span>
              </div>
              <p className="text-[10px] text-cyber-textMuted hidden lg:flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {t('app_subtitle')}
              </p>
            </div>
          </div>

          {/* Desktop & Tablet Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
            
            {/* Mode Switch Toggle */}
            <button
              onClick={onToggleLiveMainnet}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                isLiveMainnetMode
                  ? 'bg-emerald-500/20 border-emerald-500/80 text-emerald-300 shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                  : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
              }`}
              title={isLiveMainnetMode ? 'Active: Live Mainnet DexScreener' : 'Active: High Frequency Simulation'}
            >
              <Radio className={`w-3.5 h-3.5 ${isLiveMainnetMode ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
              <span className="hidden xl:inline">{t('mode_label')}</span>
              <span>{isLiveMainnetMode ? t('mode_live') : t('mode_sim')}</span>
            </button>

            {/* Quick Capital Preset */}
            <div className="hidden xl:flex items-center bg-cyber-card border border-cyber-border rounded-xl p-0.5 text-xs">
              <span className="px-2 text-cyber-textMuted font-mono flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> {t('capital_label')}
              </span>
              {[500, 1000, 5000, 10000].map((size) => (
                <button
                  key={size}
                  onClick={() => onChangeTradeSize(size)}
                  className={`px-2 py-1 rounded-lg font-mono font-bold transition-all ${
                    tradeSizeUsd === size
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  ${size >= 1000 ? `${size / 1000}k` : size}
                </button>
              ))}
            </div>

            {/* Flash Loan Toggle */}
            <button
              onClick={onToggleFlashLoans}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                useFlashLoans
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                  : 'bg-cyber-card border-cyber-border text-cyber-textMuted hover:text-slate-200'
              }`}
              title="Aave V3 Flash Loan"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden lg:inline">{t('flash_loan_label')}</span>
              <span className={useFlashLoans ? 'text-purple-300 font-bold' : 'text-slate-500'}>
                {useFlashLoans ? t('flash_on') : t('flash_off')}
              </span>
            </button>

            {/* Gas Tracker Button */}
            <button
              onClick={onOpenGasModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyber-card border border-cyber-border hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all"
              title="Gas Matrix"
            >
              <Fuel className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
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
              title={soundAlertsEnabled ? t('sound_enabled') : t('sound_muted')}
            >
              {soundAlertsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Scanner Pause / Resume */}
            <button
              onClick={onToggleScanning}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold text-xs transition-all ${
                isScanning
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
                  : 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
              }`}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden lg:inline">{t('scanning')}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>{t('resume')}</span>
                </>
              )}
            </button>

            {/* Simulator Button */}
            <button
              onClick={onOpenSimulatorModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t('simulator')}</span>
            </button>

            {/* Language Selector Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-xs font-mono font-bold text-slate-200 hover:text-white transition-all shadow-sm"
              title="Переключить язык / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}</span>
            </button>

          </div>

          {/* Mobile Quick Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Language button on mobile */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-mono font-bold text-slate-200"
            >
              {language === 'ru' ? 'RU' : 'EN'}
            </button>

            {/* Live mode toggle button on mobile */}
            <button
              onClick={onToggleLiveMainnet}
              className={`px-2 py-1 rounded-lg border text-[10px] font-mono font-bold flex items-center gap-1 ${
                isLiveMainnetMode
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
              }`}
            >
              <Radio className="w-2.5 h-2.5" />
              <span>{isLiveMainnetMode ? t('mode_live_short') : t('mode_sim_short')}</span>
            </button>

            {/* Simulator quick button */}
            <button
              onClick={onOpenSimulatorModal}
              className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
              title={t('simulator')}
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-cyber-card border border-cyber-border text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-cyber-border/80 space-y-2.5 text-xs font-mono">
            {/* Capital buttons */}
            <div>
              <span className="text-[11px] text-cyber-textMuted mb-1 block">{t('working_capital')}</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[500, 1000, 5000, 10000].map((size) => (
                  <button
                    key={size}
                    onClick={() => { onChangeTradeSize(size); setMobileMenuOpen(false); }}
                    className={`py-1.5 rounded-lg text-center font-bold border ${
                      tradeSizeUsd === size
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                        : 'bg-cyber-dark border-cyber-border text-slate-400'
                    }`}
                  >
                    ${size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={() => { onToggleFlashLoans(); setMobileMenuOpen(false); }}
                className={`py-2 rounded-xl border flex items-center justify-center gap-1 font-bold ${
                  useFlashLoans
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-cyber-dark border-cyber-border text-slate-400'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t('flash_loan_label')} {useFlashLoans ? t('flash_on') : t('flash_off')}</span>
              </button>

              <button
                onClick={() => { onOpenGasModal(); setMobileMenuOpen(false); }}
                className="py-2 rounded-xl bg-cyber-dark border border-cyber-border text-cyan-300 flex items-center justify-center gap-1 font-bold"
              >
                <Fuel className="w-3.5 h-3.5 text-cyan-400" />
                <span>${avgGasUsd}</span>
              </button>

              <button
                onClick={() => { onToggleSound(); }}
                className={`py-2 rounded-xl border flex items-center justify-center gap-1 font-bold ${
                  soundAlertsEnabled
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-cyber-dark border-cyber-border text-slate-400'
                }`}
              >
                {soundAlertsEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundAlertsEnabled ? t('sound_on_btn') : t('sound_off_btn')}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
