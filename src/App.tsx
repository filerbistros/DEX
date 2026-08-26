import { useState, useEffect, useMemo } from 'react';
import type { 
  ArbitrageOpportunity, 
  ArbitrageFilterState
} from './types/arbitrage';
import { 
  generateInitialOpportunities, 
  generateRandomOpportunity,
  recalculateOpportunity 
} from './services/arbitrageScanner';
import { soundAlerts } from './services/audioAlerts';
import { getAllChainsGas } from './services/gasService';
import type { ChainGasStatus } from './services/gasService';

import { Navbar } from './components/Navbar';
import { ChainSelector } from './components/ChainSelector';
import { StatsOverview } from './components/StatsOverview';
import { FiltersBar } from './components/FiltersBar';
import { ArbitrageCard } from './components/ArbitrageCard';
import { ArbitrageDetailModal } from './components/ArbitrageDetailModal';
import { TradeSimulator } from './components/TradeSimulator';
import { LiveGasTrackerModal } from './components/LiveGasTrackerModal';
import { AlertCircle } from 'lucide-react';

export function App() {
  // Core Scanner State
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>(() => generateInitialOpportunities());
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [gasStatus, setGasStatus] = useState<ChainGasStatus[]>(() => getAllChainsGas());

  // Global Filters & User Settings
  const [filters, setFilters] = useState<ArbitrageFilterState>({
    selectedChain: 'all',
    minSpreadPct: 0,
    minLiquidityUsd: 0,
    arbitrageType: 'all',
    tradeSizeUsd: 1000,
    useFlashLoansOnly: false,
    minNetProfitUsd: 0,
    sortBy: 'netProfitPct',
    sortOrder: 'desc',
    searchQuery: '',
    soundAlertsEnabled: true,
    soundThresholdPct: 1.5,
  });

  // Modal States
  const [selectedOpportunity, setSelectedOpportunity] = useState<ArbitrageOpportunity | null>(null);
  const [isGasModalOpen, setIsGasModalOpen] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);

  // Sound sync
  useEffect(() => {
    soundAlerts.setMuted(!filters.soundAlertsEnabled);
  }, [filters.soundAlertsEnabled]);

  // Periodic Gas Price Tracker Updates (every 6 seconds)
  useEffect(() => {
    const gasInterval = setInterval(() => {
      setGasStatus(getAllChainsGas());
    }, 6000);
    return () => clearInterval(gasInterval);
  }, []);

  // Live DEX Arbitrage Scanner Loop
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setOpportunities((prev) => {
        // 1. Slightly adjust prices & recalculate existing opportunities to simulate pool trades
        const updated = prev.map((opp) => {
          const priceDrift = (Math.random() - 0.49) * 0.003;
          const newBuyPrice = Number((opp.buyPrice * (1 + priceDrift)).toFixed(4));
          const newSellPrice = Number((opp.sellPrice * (1 - priceDrift * 0.8)).toFixed(4));
          
          const updatedOpp = recalculateOpportunity({
            ...opp,
            buyPrice: newBuyPrice,
            sellPrice: newSellPrice,
          }, filters.tradeSizeUsd, filters.useFlashLoansOnly);

          return updatedOpp;
        });

        // 2. Occasionally discover a new live opportunity (35% probability per tick)
        if (Math.random() < 0.35) {
          const newOpp = generateRandomOpportunity();
          const recalculatedNew = recalculateOpportunity(newOpp, filters.tradeSizeUsd, filters.useFlashLoansOnly);
          
          // Sound trigger if threshold met
          if (recalculatedNew.netProfitPct >= filters.soundThresholdPct) {
            soundAlerts.playOpportunityFound(recalculatedNew.netProfitPct);
          }

          return [recalculatedNew, ...updated.slice(0, 15)];
        }

        return updated;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isScanning, filters.tradeSizeUsd, filters.useFlashLoansOnly, filters.soundThresholdPct]);

  // Re-calculate all opportunities when tradeSize or flashLoan toggles change
  const handleTradeSizeChange = (newSize: number) => {
    setFilters((prev) => ({ ...prev, tradeSizeUsd: newSize }));
    setOpportunities((prev) => 
      prev.map((opp) => recalculateOpportunity(opp, newSize, filters.useFlashLoansOnly))
    );
  };

  const handleToggleFlashLoans = () => {
    const nextState = !filters.useFlashLoansOnly;
    setFilters((prev) => ({ ...prev, useFlashLoansOnly: nextState }));
    setOpportunities((prev) => 
      prev.map((opp) => recalculateOpportunity(opp, filters.tradeSizeUsd, nextState))
    );
  };

  const handleFilterUpdate = (newFilters: Partial<ArbitrageFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Filter and Sort calculation
  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        // Chain filter
        if (filters.selectedChain === 'cross_chain') {
          if (opp.type !== 'cross_chain') return false;
        } else if (filters.selectedChain !== 'all') {
          if (opp.buyChain.id !== filters.selectedChain && opp.sellChain.id !== filters.selectedChain) {
            return false;
          }
        }

        // Type filter
        if (filters.arbitrageType !== 'all' && opp.type !== filters.arbitrageType) {
          return false;
        }

        // Min Spread filter
        if (opp.netProfitPct < filters.minSpreadPct) {
          return false;
        }

        // Search query (token symbol, name, or DEX)
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matchToken = opp.tokenIn.symbol.toLowerCase().includes(query) || opp.tokenIn.name.toLowerCase().includes(query);
          const matchDex = opp.buyDex.name.toLowerCase().includes(query) || opp.sellDex.name.toLowerCase().includes(query);
          const matchChain = opp.buyChain.name.toLowerCase().includes(query) || opp.sellChain.name.toLowerCase().includes(query);
          if (!matchToken && !matchDex && !matchChain) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'netProfitPct') return b.netProfitPct - a.netProfitPct;
        if (filters.sortBy === 'netProfitUsd') return b.netProfitUsd - a.netProfitUsd;
        if (filters.sortBy === 'grossSpreadPct') return b.grossSpreadPct - a.grossSpreadPct;
        if (filters.sortBy === 'liquidityUsd') return b.liquidityUsd - a.liquidityUsd;
        if (filters.sortBy === 'timestamp') return b.timestamp - a.timestamp;
        return 0;
      });
  }, [opportunities, filters]);

  const avgNetRoi = opportunities.length > 0
    ? opportunities.reduce((acc, o) => acc + o.netProfitPct, 0) / opportunities.length
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#06090e] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Top Cyber Navigation Bar */}
      <Navbar
        isScanning={isScanning}
        onToggleScanning={() => setIsScanning(!isScanning)}
        soundAlertsEnabled={filters.soundAlertsEnabled}
        onToggleSound={() => handleFilterUpdate({ soundAlertsEnabled: !filters.soundAlertsEnabled })}
        tradeSizeUsd={filters.tradeSizeUsd}
        onChangeTradeSize={handleTradeSizeChange}
        useFlashLoans={filters.useFlashLoansOnly}
        onToggleFlashLoans={handleToggleFlashLoans}
        gasStatus={gasStatus}
        onOpenGasModal={() => setIsGasModalOpen(true)}
        onOpenSimulatorModal={() => setIsSimulatorOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Real-time stats header overview */}
        <StatsOverview
          opportunities={filteredOpportunities}
          tradeSizeUsd={filters.tradeSizeUsd}
        />

        {/* Chain selector bar */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-cyber-textMuted uppercase tracking-wider">
            Select Network or Cross-Chain Bridge Mode:
          </div>
          <ChainSelector
            selectedChain={filters.selectedChain}
            onSelectChain={(chain) => handleFilterUpdate({ selectedChain: chain })}
            opportunities={opportunities}
          />
        </div>

        {/* Filters and search bar */}
        <FiltersBar
          filters={filters}
          onFilterChange={handleFilterUpdate}
          totalFiltered={filteredOpportunities.length}
        />

        {/* Arbitrage Opportunities Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredOpportunities.map((opportunity) => (
              <ArbitrageCard
                key={opportunity.id}
                opportunity={opportunity}
                tradeSizeUsd={filters.tradeSizeUsd}
                useFlashLoans={filters.useFlashLoansOnly}
                onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center border border-cyber-border space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">No Arbitrage Pairs Found</h3>
              <p className="text-sm text-cyber-textMuted font-mono max-w-md mx-auto mt-1">
                No active routes match the current filter criteria (Min Net {filters.minSpreadPct}%). Try switching network or lowering spread threshold.
              </p>
            </div>
            <button
              onClick={() => handleFilterUpdate({ selectedChain: 'all', minSpreadPct: 0, searchQuery: '', arbitrageType: 'all' })}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold hover:bg-emerald-500/30 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-border/60 bg-[#04060a] py-6 text-xs text-cyber-textMuted font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>DEX Arbitrage Scanner Terminal v2.0 • Real-time Cross-Chain Bridge & Gas Engine</span>
          </div>
          <div>
            Built for High-Speed Multi-DEX Profit Maximization
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ArbitrageDetailModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        initialTradeSizeUsd={filters.tradeSizeUsd}
        initialUseFlashLoans={filters.useFlashLoansOnly}
      />

      <TradeSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        avgNetProfitPct={avgNetRoi}
      />

      <LiveGasTrackerModal
        isOpen={isGasModalOpen}
        onClose={() => setIsGasModalOpen(false)}
        gasStatus={gasStatus}
      />

    </div>
  );
}

export default App;
