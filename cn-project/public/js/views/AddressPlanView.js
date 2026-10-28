// SubnetWise — Address Plan View (Requirement 15 & 21)
const { useState } = React;
const html = htm.bind(React.createElement);

window.AddressPlanView = function AddressPlanView({ calculationResult, onExportCsv, onNavigate }) {
  if (!calculationResult || !calculationResult.success) {
    return html`
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">Address Plan</h1>
          <p className="text-xs text-slate-500 mt-0.5">Deployment-ready addressing table with gateway specifications</p>
        </div>
        <div className="p-12 text-center bg-white border border-slate-200 rounded-lg shadow-card space-y-3">
          <h3 className="text-sm font-semibold text-slate-800">No Address Plan Available</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Design a network first to review and export the addressing plan.
          </p>
          <button
            onClick=${() => onNavigate('designer')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Open Network Designer
          </button>
        </div>
      </div>
    `;
  }

  // Local state allowing gateways to be edited dynamically
  const [customGateways, setCustomGateways] = useState({});

  const handleGatewayChange = (subnetId, newGateway) => {
    setCustomGateways({
      ...customGateways,
      [subnetId]: newGateway
    });
  };

  const base = calculationResult.baseNetwork;
  const subnets = calculationResult.subnets;

  return html`
    <div className="space-y-6">
      
      <!-- Top Action Bar -->
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3 no-print">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Address Plan</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Production addressing table with configurable default gateways for <strong className="text-slate-800 font-mono">${base.network}/${base.cidr}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick=${() => onExportCsv(customGateways)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <${Icons.Download} className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick=${() => window.print()}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <${Icons.Printer} className="w-4 h-4" />
            <span>Print View / PDF</span>
          </button>
        </div>
      </div>

      <!-- Printable Address Plan Container -->
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-card space-y-5 print-page">
        
        <!-- Header Info (visible in print & web) -->
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-2">
          <div>
            <div className="text-sm font-bold text-slate-900">SubnetWise IPv4 Addressing Scheme</div>
            <div className="text-xs font-mono text-slate-500">
              Root: ${base.network}/${base.cidr} (${base.totalAddresses.toLocaleString()} Total IPs, Mask: ${base.subnetMask})
            </div>
          </div>
          <div className="text-2xs font-mono text-slate-400">
            Generated: ${new Date().toLocaleDateString()}
          </div>
        </div>

        <!-- Addressing Table (Requirement 15) -->
        <div className="border border-slate-200 rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Department / Name</th>
                <th className="py-2.5 px-3 font-mono">Network</th>
                <th className="py-2.5 px-3 font-mono text-center">CIDR</th>
                <th className="py-2.5 px-3 font-mono">Subnet Mask</th>
                <th className="py-2.5 px-3 font-mono">Default Gateway</th>
                <th className="py-2.5 px-3 font-mono">First Usable Host</th>
                <th className="py-2.5 px-3 font-mono">Last Usable Host</th>
                <th className="py-2.5 px-3 font-mono">Broadcast</th>
                <th className="py-2.5 px-3 text-right">Usable Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-2xs">
              ${subnets.map(s => {
                const currentGw = customGateways[s.id] ?? s.gateway ?? s.firstHost;
                return html`
                  <tr key=${s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900 text-xs">
                      ${s.name}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">${s.network}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                        /${s.cidr}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">${s.subnetMask}</td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value=${currentGw}
                        onChange=${e => handleGatewayChange(s.id, e.target.value)}
                        className="no-print w-32 px-1.5 py-0.5 border border-slate-200 rounded font-mono text-2xs text-blue-700 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <span className="print-only hidden text-blue-700 font-semibold">${currentGw}</span>
                    </td>
                    <td className="py-2.5 px-3 text-emerald-700">${s.firstHost}</td>
                    <td className="py-2.5 px-3 text-emerald-700">${s.lastHost}</td>
                    <td className="py-2.5 px-3 text-slate-800">${s.broadcast}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-slate-900">${s.usableHosts}</td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between text-2xs text-slate-400 pt-2 border-t border-slate-100">
          <span>* Default gateway defaults to the first usable host in each subnet. You can edit gateway addresses inline.</span>
          <span className="font-mono">SubnetWise v1.0 • Academic Mini-Project</span>
        </div>

      </div>

    </div>
  `;
};
