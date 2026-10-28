// SubnetWise — Top Application Header Component
const html = htm.bind(React.createElement);

window.Header = function Header({ currentTab, baseIp, baseCidr, onToggleMobileNav, onExplain, calculationResult }) {
  const titles = {
    dashboard: 'Dashboard',
    designer: 'Network Designer',
    vlsmCalc: 'VLSM Calculator',
    cidrCalc: 'CIDR Calculator',
    subnetMap: 'Subnet Map',
    addressPlan: 'Address Plan',
    validation: 'Network Validation',
    history: 'Project History',
    settings: 'Settings'
  };

  return html`
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between no-print">
      
      <!-- Left: Mobile Menu Toggle & Title -->
      <div className="flex items-center space-x-3">
        <button
          onClick=${onToggleMobileNav}
          className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <${Icons.Menu} className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">SubnetWise /</span>
          <span className="text-sm font-bold text-slate-900">${titles[currentTab] || 'Workspace'}</span>
        </div>
      </div>

      <!-- Right: Active Network Indicator & Action -->
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200 font-mono text-2xs text-slate-700">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>Target: <strong className="text-slate-900">${baseIp}/${baseCidr}</strong></span>
        </div>

        ${calculationResult && calculationResult.success && html`
          <button
            onClick=${onExplain}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs"
          >
            <${Icons.BookOpen} className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Explain Design</span>
          </button>
        `}
      </div>

    </header>
  `;
};
