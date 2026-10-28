// SubnetWise — Subnet Details Modal Inspector
const html = htm.bind(React.createElement);

window.SubnetDetailModal = function SubnetDetailModal({ subnet, onClose }) {
  if (!subnet) return null;

  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <!-- Header -->
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
              <${Icons.Server} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <span>${subnet.name}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                  /${subnet.cidr}
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                ${subnet.network}/${subnet.cidr} • Priority: ${subnet.priority || 'Medium'}
              </p>
            </div>
          </div>
          <button
            onClick=${onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <${Icons.X} className="w-5 h-5" />
          </button>
        </div>

        <!-- Content Area -->
        <div className="p-6 overflow-y-auto space-y-6">
          
          <!-- Key Metrics Grid -->
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-2xs uppercase tracking-wider text-slate-500 font-medium">Required Hosts</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">${subnet.requiredHosts}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-2xs uppercase tracking-wider text-slate-500 font-medium">Usable Capacity</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">${subnet.usableHosts}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-2xs uppercase tracking-wider text-slate-500 font-medium">Wasted Hosts</span>
              <div className="text-lg font-bold text-amber-600 mt-0.5">${subnet.wastedHosts}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-2xs uppercase tracking-wider text-slate-500 font-medium">Host Efficiency</span>
              <div className="text-lg font-bold text-emerald-600 mt-0.5">${subnet.efficiency}%</div>
            </div>
          </div>

          <!-- Addressing Specifications Table -->
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Addressing Specifications</h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-200 text-xs font-mono">
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="text-slate-500 font-sans">Network Address</span>
                <span className="col-span-2 font-semibold text-slate-900">${subnet.network}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-slate-50/50">
                <span className="text-slate-500 font-sans">Subnet Mask</span>
                <span className="col-span-2 text-slate-800">${subnet.subnetMask}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="text-slate-500 font-sans">Wildcard Mask</span>
                <span className="col-span-2 text-slate-800">${subnet.wildcardMask}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-slate-50/50">
                <span className="text-slate-500 font-sans">Default Gateway</span>
                <span className="col-span-2 text-blue-700 font-semibold">${subnet.gateway || subnet.firstHost}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="text-slate-500 font-sans">Usable Host Range</span>
                <span className="col-span-2 text-emerald-700 font-semibold">
                  ${subnet.firstHost} — ${subnet.lastHost}
                </span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-slate-50/50">
                <span className="text-slate-500 font-sans">Broadcast Address</span>
                <span className="col-span-2 text-slate-900 font-semibold">${subnet.broadcast}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="text-slate-500 font-sans">Total Block Addresses</span>
                <span className="col-span-2 text-slate-800 font-sans">${subnet.totalAddresses} (2^${subnet.hostBits})</span>
              </div>
            </div>
          </div>

          <!-- Binary Representation Section -->
          <div>
            <${BinaryViewer} ip=${subnet.network} cidr=${subnet.cidr} label=${subnet.name} />
          </div>

          ${subnet.description && html`
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700">Description / Role: </span>
              <span className="text-slate-600">${subnet.description}</span>
            </div>
          `}
        </div>

        <!-- Footer -->
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-slate-50">
          <div className="text-2xs text-slate-500 font-mono">
            Boundary aligned to multiple of ${subnet.totalAddresses}
          </div>
          <button
            onClick=${onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  `;
};
