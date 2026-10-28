// SubnetWise — Standalone VLSM Calculator View
const { useState } = React;
const html = htm.bind(React.createElement);

window.VlsmCalcView = function VlsmCalcView({ onSelectSubnet }) {
  const [baseIp, setBaseIp] = useState('192.168.10.0');
  const [baseCidr, setBaseCidr] = useState(24);
  const [hostsText, setHostsText] = useState('CSE: 100\nECE: 50\nAdmin: 25\nServer Room: 10');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const lines = hostsText.split('\n').filter(l => l.trim().length > 0);
      const reqs = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes(':') || line.includes('=')) {
          const sep = line.includes(':') ? ':' : '=';
          const parts = line.split(sep);
          const name = parts[0].trim();
          const count = parseInt(parts[1].trim().replace(/\D/g, ''), 10);
          if (!isNaN(count) && count > 0) {
            reqs.push({ name, requiredHosts: count, priority: 'Medium' });
          }
        } else if (line.includes(',')) {
          const parts = line.split(',');
          for (const p of parts) {
            const count = parseInt(p.trim().replace(/\D/g, ''), 10);
            if (!isNaN(count) && count > 0) {
              reqs.push({ name: `Subnet ${reqs.length + 1}`, requiredHosts: count, priority: 'Medium' });
            }
          }
        } else {
          const count = parseInt(line.replace(/\D/g, ''), 10);
          if (!isNaN(count) && count > 0) {
            reqs.push({ name: `Subnet ${reqs.length + 1}`, requiredHosts: count, priority: 'Medium' });
          }
        }
      }

      if (reqs.length === 0) {
        toast.warning('Enter at least one host requirement.');
        setLoading(false);
        return;
      }

      const res = await API.calculateVLSM(baseIp, Number(baseCidr), reqs);
      setResult(res);
      if (res.success) {
        toast.success('VLSM calculation completed.');
      } else {
        toast.error(res.error || 'Calculation failed.');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return html`
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">VLSM Calculator</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Fast-entry Variable Length Subnet Masking generator
        </p>
      </div>

      <!-- Quick Input Card -->
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Base IPv4 Address
            </label>
            <input
              type="text"
              value=${baseIp}
              onChange=${e => setBaseIp(e.target.value)}
              placeholder="192.168.10.0"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              CIDR Prefix (/${baseCidr})
            </label>
            <select
              value=${baseCidr}
              onChange=${e => setBaseCidr(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ${Array.from({ length: 23 }, (_, i) => 8 + i).map(c => html`
                <option key=${c} value=${c}>/${c} (${Math.pow(2, 32 - c).toLocaleString()} IPs)</option>
              `)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Host Requirements (Format: "Department: Hosts" or comma-separated numbers)
          </label>
          <textarea
            rows="4"
            value=${hostsText}
            onChange=${e => setHostsText(e.target.value)}
            placeholder="CSE: 100&#10;ECE: 50&#10;Admin: 25&#10;Server: 10"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <p className="text-2xs text-slate-400 mt-1">
            Accepts format: <code>CSE: 100</code> or <code>100, 50, 25, 10</code>
          </p>
        </div>

        <button
          onClick=${handleCalculate}
          disabled=${loading}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          <${Icons.Calculator} className="w-4 h-4" />
          <span>${loading ? 'Calculating...' : 'Calculate VLSM Subnets'}</span>
        </button>
      </div>

      <!-- Results -->
      ${result && result.success && html`
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
              <${Icons.CheckCircle} className="w-4 h-4 text-emerald-600" />
              <span>Calculated Subnets</span>
            </h2>
            <span className="text-xs font-mono font-semibold text-emerald-700">
              ${result.metrics.overallEfficiency}% Efficiency
            </span>
          </div>

          <${AddressBar}
            visualBlocks=${result.visualBlocks}
            baseNetwork=${result.baseNetwork}
            onSelectSubnet=${onSelectSubnet}
          />

          <div className="border border-slate-200 rounded-lg overflow-x-auto mt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3 text-right">Req. Hosts</th>
                  <th className="py-2.5 px-3 text-center">CIDR</th>
                  <th className="py-2.5 px-3 font-mono">Subnet Mask</th>
                  <th className="py-2.5 px-3 font-mono">Network</th>
                  <th className="py-2.5 px-3 font-mono">Usable Range</th>
                  <th className="py-2.5 px-3 font-mono">Broadcast</th>
                  <th className="py-2.5 px-3 text-right">Usable</th>
                  <th className="py-2.5 px-3 text-right">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-2xs">
                ${result.subnets.map(s => html`
                  <tr key=${s.id} onClick=${() => onSelectSubnet(s.id)} className="hover:bg-blue-50/50 cursor-pointer">
                    <td className="py-2 px-3 font-sans font-semibold text-slate-900">${s.name}</td>
                    <td className="py-2 px-3 text-right text-slate-700">${s.requiredHosts}</td>
                    <td className="py-2 px-3 text-center text-blue-700 font-semibold">/${s.cidr}</td>
                    <td className="py-2 px-3 text-slate-600">${s.subnetMask}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">${s.network}</td>
                    <td className="py-2 px-3 text-emerald-700">${s.firstHost} – ${s.lastHost}</td>
                    <td className="py-2 px-3 text-slate-800">${s.broadcast}</td>
                    <td className="py-2 px-3 text-right font-semibold text-slate-900">${s.usableHosts}</td>
                    <td className="py-2 px-3 text-right font-sans font-semibold text-emerald-700">${s.efficiency}%</td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>
      `}
    </div>
  `;
};
