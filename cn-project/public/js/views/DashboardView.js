// SubnetWise — Dashboard View
const html = htm.bind(React.createElement);

window.DashboardView = function DashboardView({ activeProject, calculationResult, onNavigate, onSelectSubnet, onLoadPreset }) {
  const base = calculationResult?.baseNetwork;
  const metrics = calculationResult?.metrics;

  return html`
    <div className="space-y-6">
      
      <!-- Top Welcome & Status Banner -->
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-900">Network Engineering Dashboard</h1>
            <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Online
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Active Project: <strong className="text-slate-800">${activeProject?.name || 'College Network'}</strong> • CIDR & VLSM Topology Monitor
          </p>
        </div>

        <!-- Quick actions -->
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick=${() => onNavigate('designer')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow-subtle transition-colors"
          >
            <${Icons.Designer} className="w-3.5 h-3.5" />
            <span>Open Network Designer</span>
          </button>
          <button
            onClick=${() => onNavigate('addressPlan')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium shadow-subtle transition-colors"
          >
            <${Icons.AddressPlan} className="w-3.5 h-3.5" />
            <span>Address Plan</span>
          </button>
        </div>
      </div>

      <!-- Top Statistics 6-Card Grid (Requirement 5) -->
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <!-- Stat 1: Base Network -->
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
          <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Base Network</span>
          <div className="font-mono text-sm font-bold text-slate-900 mt-1 truncate">
            ${base ? `${base.network}/${base.cidr}` : '—'}
          </div>
          <div className="text-2xs text-slate-400 mt-0.5">
            ${base ? `${base.totalAddresses} total addresses` : 'No base network'}
          </div>
        </div>

        <!-- Stat 2: Number of Subnets -->
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
          <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Subnets</span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            ${metrics?.subnetsCount ?? 0}
          </div>
          <div className="text-2xs text-emerald-600 font-medium mt-0.5 flex items-center space-x-1">
            <${Icons.CheckCircle} className="w-3 h-3" />
            <span>Allocated</span>
          </div>
        </div>

        <!-- Stat 3: Required Hosts -->
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
          <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Required Hosts</span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            ${metrics?.totalRequestedHosts ?? 0}
          </div>
          <div className="text-2xs text-slate-400 mt-0.5">Demanded capacity</div>
        </div>

        <!-- Stat 4: Allocated Capacity -->
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
          <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Allocated Capacity</span>
          <div className="text-xl font-bold text-blue-600 mt-1">
            ${metrics?.totalAllocatedCapacity ?? 0}
          </div>
          <div className="text-2xs text-slate-400 mt-0.5">Usable host capacity</div>
        </div>

        <!-- Stat 5: Address Utilization -->
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
          <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Address Utilization</span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            ${metrics?.addressUtilization ?? 0}%
          </div>
          <div className="text-2xs text-slate-400 mt-0.5">
            ${metrics ? `${metrics.freeAddresses} IPs unallocated` : ''}
          </div>
        </div>

        <!-- Stat 6: Wasted Addresses -->
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
          <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Wasted Addresses</span>
          <div className="text-xl font-bold text-amber-600 mt-1">
            ${metrics?.totalWastedAddresses ?? 0}
          </div>
          <div className="text-2xs text-slate-400 mt-0.5">
            Efficiency: ${metrics?.overallEfficiency ?? 0}%
          </div>
        </div>

      </div>

      <!-- Current Network Detail Card -->
      ${base && html`
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-card">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center space-x-2">
              <${Icons.Network} className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">Current Base Network Specification</span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-2xs text-slate-500">
              <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">Class ${base.ipClass}</span>
              <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">${base.isPrivate ? 'RFC 1918 Private' : 'Public'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 font-mono text-xs">
            <div>
              <span className="text-2xs font-sans text-slate-400 uppercase tracking-wider block">Network ID</span>
              <span className="font-bold text-slate-900">${base.network}/${base.cidr}</span>
            </div>
            <div>
              <span className="text-2xs font-sans text-slate-400 uppercase tracking-wider block">Subnet Mask</span>
              <span className="text-slate-700">${base.subnetMask}</span>
            </div>
            <div>
              <span className="text-2xs font-sans text-slate-400 uppercase tracking-wider block">Total Pool Size</span>
              <span className="text-slate-900">${base.totalAddresses.toLocaleString()} addresses</span>
            </div>
            <div>
              <span className="text-2xs font-sans text-slate-400 uppercase tracking-wider block">Usable Host Pool</span>
              <span className="text-emerald-700 font-semibold">${base.usableHosts.toLocaleString()} hosts</span>
            </div>
          </div>
        </div>
      `}

      <!-- Compact Address Space Visualization (Requirement 5 & 10) -->
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
            <${Icons.Layers} className="w-4 h-4 text-blue-600" />
            <span>Address Space Partitioning</span>
          </h2>
          <button
            onClick=${() => onNavigate('subnetMap')}
            className="text-2xs text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
          >
            <span>View Subnet Map</span>
            <${Icons.ArrowRight} className="w-3 h-3" />
          </button>
        </div>

        <${AddressBar}
          visualBlocks=${calculationResult?.visualBlocks}
          baseNetwork=${base}
          onSelectSubnet=${onSelectSubnet}
        />
      </div>

      <!-- Quick Demo Presets Launcher (Requirement 20) -->
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
            <${Icons.BookOpen} className="w-4 h-4 text-blue-600" />
            <span>Preset Academic Scenarios</span>
          </h2>
          <span className="text-2xs text-slate-400">Click to instantly populate and compute</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          <button
            onClick=${() => onLoadPreset('college')}
            className="p-3 text-left border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">College Network</span>
              <span className="text-2xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">192.168.10.0/24</span>
            </div>
            <p className="text-2xs text-slate-500 mt-1">CSE (100), ECE (50), Admin (25), Server Room (10)</p>
          </button>

          <button
            onClick=${() => onLoadPreset('smallOffice')}
            className="p-3 text-left border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Small Office</span>
              <span className="text-2xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">192.168.1.0/24</span>
            </div>
            <p className="text-2xs text-slate-500 mt-1">Development (60), Management (30), HR (15), Servers (10)</p>
          </button>

          <button
            onClick=${() => onLoadPreset('datacenter')}
            className="p-3 text-left border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Data Center</span>
              <span className="text-2xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">10.0.0.0/23</span>
            </div>
            <p className="text-2xs text-slate-500 mt-1">Application (120), Database (60), Mgmt (20), Monitor (10)</p>
          </button>

        </div>
      </div>

    </div>
  `;
};
