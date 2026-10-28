// SubnetWise — Subnet Map View (Requirement 14)
const html = htm.bind(React.createElement);

window.SubnetMapView = function SubnetMapView({ calculationResult, onSelectSubnet, onNavigate }) {
  if (!calculationResult || !calculationResult.success) {
    return html`
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">Subnet Map</h1>
          <p className="text-xs text-slate-500 mt-0.5">Hierarchical structural breakdown of the IPv4 address space</p>
        </div>
        <div className="p-12 text-center bg-white border border-slate-200 rounded-lg shadow-card space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
            <${Icons.Map} className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">No Network Allocation Generated Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Run a VLSM calculation in the Network Designer to render the hierarchical network map.
          </p>
          <button
            onClick=${() => onNavigate('designer')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Go to Network Designer
          </button>
        </div>
      </div>
    `;
  }

  const base = calculationResult.baseNetwork;
  const subnets = calculationResult.subnets;
  const freeBlocks = calculationResult.freeBlocks || [];

  return html`
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Subnet Map</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hierarchical binary decomposition of <strong className="text-slate-800 font-mono">${base.network}/${base.cidr}</strong>
          </p>
        </div>
        <span className="text-2xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
          ${subnets.length} subnets + ${freeBlocks.length} free block(s)
        </span>
      </div>

      <!-- Hierarchical Tree Diagram (Clean & Minimal - Requirement 14) -->
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-card overflow-x-auto space-y-8">
        
        <!-- Root Node: Base Network -->
        <div className="flex flex-col items-center">
          <div className="px-5 py-3 bg-slate-900 text-white rounded-lg shadow-sm border border-slate-800 text-center font-mono space-y-0.5">
            <div className="text-2xs uppercase tracking-wider text-slate-400 font-sans font-medium">Root Base Network</div>
            <div className="text-sm font-bold text-blue-300">${base.network}/${base.cidr}</div>
            <div className="text-2xs text-slate-400 font-sans">
              ${base.totalAddresses.toLocaleString()} IPs • Mask: ${base.subnetMask}
            </div>
          </div>
          <!-- Stem downward -->
          <div className="w-0.5 h-8 bg-slate-300"></div>
          
          <!-- Horizontal Trunk -->
          <div className="w-11/12 border-t-2 border-slate-300 relative">
            <!-- Downward connectors to branches -->
          </div>
        </div>

        <!-- Child Branches Grid -->
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          ${subnets.map((sub, idx) => html`
            <div
              key=${sub.id}
              onClick=${() => onSelectSubnet(sub.id)}
              className="relative p-4 rounded-lg border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
            >
              <!-- Branch indicator -->
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-300"></div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700 truncate">
                  ${sub.name}
                </span>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  /${sub.cidr}
                </span>
              </div>

              <div className="font-mono text-xs text-slate-700 font-medium">
                ${sub.network}
              </div>

              <div className="divide-y divide-slate-100 text-2xs text-slate-500 font-mono pt-1">
                <div className="flex justify-between py-1">
                  <span className="font-sans">Usable:</span>
                  <span className="text-emerald-700 font-semibold">${sub.usableHosts} hosts</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-sans">Required:</span>
                  <span className="text-slate-700 font-semibold">${sub.requiredHosts} hosts</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-sans">Gateway:</span>
                  <span className="text-blue-700">${sub.gateway}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-sans">Broadcast:</span>
                  <span className="text-slate-800">${sub.broadcast}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-2xs text-slate-400">
                <span>Wasted: ${sub.wastedHosts}</span>
                <span className="text-emerald-600 font-semibold">${sub.efficiency}%</span>
              </div>
            </div>
          `)}

          <!-- Free space blocks in tree -->
          ${freeBlocks.map((fb, idx) => html`
            <div
              key=${idx}
              className="relative p-4 rounded-lg border border-dashed border-slate-300 bg-slate-50/70 space-y-2"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-300"></div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-xs text-slate-500">Unallocated Block</span>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                  /${fb.cidr}
                </span>
              </div>
              <div className="font-mono text-xs text-slate-600 font-medium">
                ${fb.network}
              </div>
              <div className="text-2xs text-slate-400 pt-2 font-mono">
                ${fb.totalAddresses} total addresses free (${fb.usableHosts} usable)
              </div>
            </div>
          `)}
        </div>

      </div>

    </div>
  `;
};
