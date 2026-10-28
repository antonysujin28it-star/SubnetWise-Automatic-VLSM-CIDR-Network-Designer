// SubnetWise — Sidebar Navigation Component (Requirement 2, 3, 4)
const html = htm.bind(React.createElement);

window.Sidebar = function Sidebar({ currentTab, onNavigate, isOpen, onClose }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'designer', label: 'Network Designer', icon: Icons.Designer, badge: 'Main' },
    { id: 'vlsmCalc', label: 'VLSM Calculator', icon: Icons.Calculator },
    { id: 'cidrCalc', label: 'CIDR Calculator', icon: Icons.Hash },
    { id: 'subnetMap', label: 'Subnet Map', icon: Icons.Map },
    { id: 'addressPlan', label: 'Address Plan', icon: Icons.AddressPlan },
    { id: 'validation', label: 'Validation', icon: Icons.Validation },
    { id: 'history', label: 'History', icon: Icons.History },
    { id: 'settings', label: 'Settings', icon: Icons.Settings }
  ];

  const content = html`
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-200 select-none">
      
      <!-- Logo & Branding (Requirement 3) -->
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <!-- Geometric Network Icon Logo -->
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-subtle flex-shrink-0">
              <${Icons.Network} className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 tracking-tight leading-none">
                SubnetWise
              </div>
              <div className="text-2xs text-slate-400 mt-1 font-medium leading-none">
                Automatic VLSM & CIDR Network Designer
              </div>
            </div>
          </div>
          
          <!-- Mobile Close Button -->
          <button
            onClick=${onClose}
            className="md:hidden p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <${Icons.X} className="w-5 h-5" />
          </button>
        </div>

        <!-- Navigation Menu (Requirement 4) -->
        <nav className="p-3 space-y-1">
          ${navItems.map(item => {
            const isActive = currentTab === item.id;
            return html`
              <button
                key=${item.id}
                onClick=${() => {
                  onNavigate(item.id);
                  if (onClose) onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }"
              >
                <div className="flex items-center space-x-2.5">
                  <${item.icon} className="w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}" />
                  <span>${item.label}</span>
                </div>
                ${item.badge && html`
                  <span className="text-3xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-blue-200 text-blue-900' : 'bg-slate-100 text-slate-500'
                  }">
                    ${item.badge}
                  </span>
                `}
              </button>
            `;
          })}
        </nav>
      </div>

      <!-- Footer Info -->
      <div className="p-4 border-t border-slate-100 text-2xs text-slate-400 space-y-1 font-mono">
        <div className="flex items-center justify-between">
          <span>Engine Status:</span>
          <span className="text-emerald-600 font-sans font-semibold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            <span>Ready</span>
          </span>
        </div>
        <div className="text-slate-400 font-sans">Computer Networks Mini-Project</div>
      </div>

    </div>
  `;

  return html`
    <!-- Desktop Sidebar -->
    <aside className="hidden md:block w-64 h-screen fixed left-0 top-0 z-30">
      ${content}
    </aside>

    <!-- Mobile Drawer -->
    ${isOpen && html`
      <div className="md:hidden fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          onClick=${onClose}
        ></div>
        <div className="relative w-72 max-w-full h-full bg-white shadow-xl z-10">
          ${content}
        </div>
      </div>
    `}
  `;
};
