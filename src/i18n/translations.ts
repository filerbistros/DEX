export type Language = 'ru' | 'en';

export const translations = {
  en: {
    // Navbar
    app_title: 'DEX ARB',
    app_badge: 'PRO',
    app_subtitle: 'Multi-Chain Arbitrage Terminal',
    mode_label: 'MODE:',
    mode_live: 'LIVE MAINNET',
    mode_sim: 'SIMULATION',
    mode_live_short: 'LIVE',
    mode_sim_short: 'SIM',
    capital_label: 'Capital:',
    flash_loan_label: 'Flash:',
    flash_on: 'ON',
    flash_off: 'OFF',
    gas_avg: 'Gas Avg:',
    sound_enabled: 'Sound Alerts: Enabled',
    sound_muted: 'Sound Alerts: Muted',
    sound_on_btn: 'Sound ON',
    sound_off_btn: 'Muted',
    scanning: 'SCANNING',
    resume: 'RESUME',
    simulator: 'Simulator',
    working_capital: 'Working Capital:',

    // Live Banner
    live_banner_title: 'LIVE MAINNET MODE ACTIVE:',
    live_banner_desc: 'Streaming real pools & prices via DexScreener REST API & On-Chain DEX Router data.',
    polling_live: 'Polling DexScreener...',

    // Stats Overview
    max_net_roi: 'Max Net ROI',
    max_roi_sub: 'Pure profit after all fees',
    est_net_profit: 'Est. Net',
    est_net_sub: 'Per single trade execution',
    live_pairs: 'Live Pairs',
    avg_spread: 'Avg:',
    mev_protection: 'MEV & Slippage',
    mev_status: 'PROTECTED',
    mev_sub: 'Honeypot guard active',

    // Chain Selector
    select_network_label: 'Select Network or Cross-Chain Bridge Mode:',
    all_networks: 'All Networks',
    cross_chain_bridges: 'Cross-Chain Bridges',

    // Filters Bar
    search_placeholder: 'Search token (ETH, SOL, ARB, AERO...) or DEX...',
    filter_all: 'All',
    filter_intra: 'DEX-to-DEX',
    filter_cross: 'Cross-Chain',
    filter_triangular: '3-Step',
    showing_pairs: 'Showing',
    optimal_pairs: 'optimal arbitrage pairs',
    sort_label: 'Sort:',
    sort_roi: 'Highest Net % (ROI)',
    sort_profit_usd: 'Highest Net $ Profit',
    sort_gross_spread: 'Gross Spread %',
    sort_liquidity: 'Deepest Pool Liquidity',
    sort_timestamp: 'Latest Window',

    // Empty state
    no_pairs_found: 'No Arbitrage Pairs Found',
    no_pairs_desc: 'No active routes match the current filter criteria. Try switching network or lowering spread threshold.',
    reset_filters: 'Reset All Filters',

    // Arbitrage Card
    buy_on: 'BUY',
    sell_on: 'SELL',
    audited: 'Audited',
    flash_loan_badge: '⚡ Flash Loan',
    dex_arbitrage_badge: 'DEX Arbitrage',
    cross_chain_badge: 'Cross-Chain',
    triangular_badge: '3-Step',
    bridge_via: 'Bridge via',
    fee_approx: 'Fee:',
    net_profit: 'Net Profit',
    gross_spread: 'Gross Spread',
    show_fee_breakdown: 'Show Fee Breakdown (Gas, DEX, Slippage)',
    hide_costs: 'Hide Costs',
    dex_fees: 'DEX Fees',
    network_gas_cost: 'Network Gas Cost:',
    bridge_fee_label: 'Bridge Fee',
    est_price_impact: 'Est. Price Impact',
    pool_liquidity: 'Pool Liquidity:',
    view_route_trade: 'View Route & Trade',

    // Arbitrage Detail Modal
    arbitrage_plan: 'Arbitrage Plan',
    working_capital_modal: 'Working Capital:',
    capacity_warning_start: 'Order size ($',
    capacity_warning_end: ') exceeds suggested pool depth. Slippage may reduce profit.',
    execution_steps: 'Execution Steps',
    actions: 'Actions',
    open_btn: 'Open',
    total_estimated_costs: 'Total Estimated Costs:',
    net_return: 'Net Return',
    token_contract: 'Contract:',
    simulate_execution: 'Simulate 1-Click Execution',
    simulating: 'Simulating...',
    simulated: 'Simulated',

    // Simulator Modal
    simulator_title: 'Earnings Simulator',
    simulator_sub: 'Forecast your returns based on live DEX spreads',
    avg_net_per_trade: 'Avg. Net % per Trade:',
    trades_per_day: 'Trades Executed Per Day:',
    compound_daily: 'Compound Daily Gains:',
    compound_on: 'COMPOUND ON',
    compound_off: 'SIMPLE ONLY',
    daily_net_profit: 'Daily Net Profit:',
    from_trades: 'From executed routes',
    monthly_total_net: '30-Day Total Net Profit:',
    est_total_balance: 'Est. Total:',
    apply_and_back: 'Apply & Back',

    // Gas Tracker Modal
    gas_tracker_title: 'Multi-Chain Gas Matrix',
    gas_tracker_sub: 'Live network gas tracker with DEX swap fee estimates',
    per_swap: 'per swap',
    gas_tip: '💡 Tip: L2 networks (Arbitrum, Base, Optimism) & Solana offer <$0.05 gas fees, making micro-spreads profitable.',
    close_tracker: 'Close Tracker',

    // Footer
    footer_text: 'DEX Arbitrage Scanner Terminal v2.0 • Real-time Cross-Chain Bridge & Gas Engine',
    footer_sub: 'Built for High-Speed Multi-DEX Profit Maximization',
  },

  ru: {
    // Navbar
    app_title: 'DEX АРБ',
    app_badge: 'PRO',
    app_subtitle: 'Мультичейн арбитражный терминал',
    mode_label: 'РЕЖИМ:',
    mode_live: 'БОЕВОЙ LIVE',
    mode_sim: 'СИМУЛЯЦИЯ',
    mode_live_short: 'LIVE',
    mode_sim_short: 'СИМ',
    capital_label: 'Депозит:',
    flash_loan_label: 'Флеш:',
    flash_on: 'ВКЛ',
    flash_off: 'ВЫКЛ',
    gas_avg: 'Средний газ:',
    sound_enabled: 'Звук: Включен',
    sound_muted: 'Звук: Выключен',
    sound_on_btn: 'Звук ВКЛ',
    sound_off_btn: 'Без звука',
    scanning: 'СКАНИРУЕТ',
    resume: 'СТАРТ',
    simulator: 'Калькулятор',
    working_capital: 'Рабочий капитал:',

    // Live Banner
    live_banner_title: 'БОЕВОЙ РЕЖИМ (LIVE MAINNET) АКТИВЕН:',
    live_banner_desc: 'Поток реальных цен и пулов ликвидности через DexScreener API и On-Chain роутеры бирж.',
    polling_live: 'Опрос DexScreener...',

    // Stats Overview
    max_net_roi: 'Макс. Чистый ROI',
    max_roi_sub: 'Чистый профит после всех комиссий',
    est_net_profit: 'Чистый доход',
    est_net_sub: 'За одну успешную сделку',
    live_pairs: 'Живые связки',
    avg_spread: 'Средний:',
    mev_protection: 'Защита MEV и Slippage',
    mev_status: 'ЗАЩИЩЕНО',
    mev_sub: 'Honeypot-фильтр активен',

    // Chain Selector
    select_network_label: 'Выберите сеть или режим кросс-чейн мостов:',
    all_networks: 'Все сети',
    cross_chain_bridges: 'Кросс-чейн мосты',

    // Filters Bar
    search_placeholder: 'Поиск токена (ETH, SOL, ARB, AERO...) или DEX биржи...',
    filter_all: 'Все',
    filter_intra: 'Внутри сети (DEX-to-DEX)',
    filter_cross: 'Кросс-чейн',
    filter_triangular: '3 шага (Треугольный)',
    showing_pairs: 'Отображается',
    optimal_pairs: 'прибыльных связок',
    sort_label: 'Сортировка:',
    sort_roi: 'По макс. ROI % (Чистая доходность)',
    sort_profit_usd: 'По чистой прибыли $',
    sort_gross_spread: 'По грязному спреду %',
    sort_liquidity: 'По глубине пула ликвидности',
    sort_timestamp: 'По новизне окна',

    // Empty state
    no_pairs_found: 'Связки не найдены',
    no_pairs_desc: 'Нет активных маршрутов, подходящих под текущие фильтры. Попробуйте сменить сеть или уменьшить порог минимального спреда.',
    reset_filters: 'Сбросить все фильтры',

    // Arbitrage Card
    buy_on: 'КУПИТЬ НА',
    sell_on: 'ПРОДАТЬ НА',
    audited: 'Проверено',
    flash_loan_badge: '⚡ Флеш-займ',
    dex_arbitrage_badge: 'DEX Арбитраж',
    cross_chain_badge: 'Кросс-чейн',
    triangular_badge: '3 шага',
    bridge_via: 'Мост через',
    fee_approx: 'Комиссия:',
    net_profit: 'Чистая прибыль',
    gross_spread: 'Грязный спред',
    show_fee_breakdown: 'Показать расчет затрат (Газ, DEX, Проскальзывание)',
    hide_costs: 'Скрыть затраты',
    dex_fees: 'Комиссии DEX',
    network_gas_cost: 'Стоимость газа сети:',
    bridge_fee_label: 'Комиссия моста',
    est_price_impact: 'Влияние на цену (Slippage)',
    pool_liquidity: 'Ликвидность пула:',
    view_route_trade: 'Маршрут и сделка',

    // Arbitrage Detail Modal
    arbitrage_plan: 'План исполнения связки',
    working_capital_modal: 'Рабочий депозит:',
    capacity_warning_start: 'Сумма сделки ($',
    capacity_warning_end: ') превышает рекомендуемую глубину пула. Проскальзывание может снизить прибыль.',
    execution_steps: 'Шаги исполнения сделки',
    actions: 'Действия',
    open_btn: 'Открыть',
    total_estimated_costs: 'Расчет всех сопутствующих затрат:',
    net_return: 'Чистая доходность',
    token_contract: 'Контракт:',
    simulate_execution: 'Симулировать исполнение в 1 клик',
    simulating: 'Симуляция...',
    simulated: 'Успешно симулировано',

    // Simulator Modal
    simulator_title: 'Калькулятор доходности',
    simulator_sub: 'Прогноз прибыли на основе реальных DEX спредов',
    avg_net_per_trade: 'Средний чистый % за сделку:',
    trades_per_day: 'Сделок в день:',
    compound_daily: 'Сложный процент (реинвестирование):',
    compound_on: 'СЛОЖНЫЙ % ВКЛ',
    compound_off: 'БЕЗ РЕИНВЕСТА',
    daily_net_profit: 'Прибыль в день:',
    from_trades: 'При выполнении связок',
    monthly_total_net: 'Чистая прибыль за 30 дней:',
    est_total_balance: 'Итоговый депозит:',
    apply_and_back: 'Применить и закрыть',

    // Gas Tracker Modal
    gas_tracker_title: 'Матрица стоимости газа сетей',
    gas_tracker_sub: 'Мониторинг комиссий блокчейнов в реальном времени',
    per_swap: 'за один своп',
    gas_tip: '💡 Совет: Сети L2 (Arbitrum, Base, Optimism) и Solana предлагают газ <$0.05, позволяя зарабатывать даже на микро-спредах.',
    close_tracker: 'Закрыть трекер',

    // Footer
    footer_text: 'DEX Arbitrage Scanner Terminal v2.0 • Терминал поиска межбиржевых и кросс-чейн связок',
    footer_sub: 'Разработано для максимизации прибыли на децентрализованных биржах',
  },
};

export type TranslationKey = keyof typeof translations.en;
