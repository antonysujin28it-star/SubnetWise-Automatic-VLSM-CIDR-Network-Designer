// SubnetWise — Dedicated CIDR Calculator View (Requirement 13)
const { useState, useEffect } = React;
const html = htm.bind(React.createElement);

window.CidrCalcView = function CidrCalcView() {
  const [ip, setIp] = useState('192.168.10.50');
  const [cidr, setCidr] = useState(26);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    try {
      setError(null);
      const res = await API.calculateCIDR(ip, Number(cidr));
      if (res.success) {
        setDetails(res.details);
      } else {
        setError(res.error || 'Invalid IP or CIDR');
        setDetails(null);
      }
    } catch (err) {
      setError(err.message);
      setDetails(null);
    }
  };

  useEffect(() => {
    calculate();
  }, [ip, cidr]);

  return html`
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">CIDR Calculator</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Single subnet deep inspector, addressing range derivation, and bitwise analysis
        </p>
      </div>

      <!-- Inputs -->
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              IPv4 Address (Host or Network)
            </label>
            <input
              type="text"
              value=${ip}
              onChange=${e => setIp(e.target.value)}
              placeholder="192.168.10.50"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              CIDR Prefix Length (/${cidr})
            </label>
            <select
              value=${cidr}
              onChange=${e => setCidr(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ${Array.from({ length: 23 }, (_, i) => 8 + i).map(c => html`
                <option key=${c} value=${c}>/${c} (${Math.pow(2, 32 - c).toLocaleString()} addresses)</option>
              `)}
            </select>
          </div>
        </div>

        ${error && html`
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
            ${error}
          </div>
        `}
      </div>

      <!-- Outputs (Requirement 13) -->
      ${details && html`
        <div className="space-y-6">
          <!-- Summary Cards -->
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
              <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Network Address</span>
              <div className="font-mono text-base font-bold text-slate-900 mt-1">${details.network}</div>
              <div className="text-2xs font-mono text-blue-600 mt-0.5">/${details.cidr} Prefix</div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
              <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Subnet Mask</span>
              <div className="font-mono text-base font-bold text-slate-900 mt-1">${details.subnetMask}</div>
              <div className="text-2xs font-mono text-slate-400 mt-0.5">Wildcard: ${details.wildcardMask}</div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
              <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Usable Hosts</span>
              <div className="font-mono text-base font-bold text-emerald-700 mt-1">${details.usableHosts.toLocaleString()}</div>
              <div className="text-2xs text-slate-400 mt-0.5">${details.totalAddresses.toLocaleString()} Total IPs</div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-card">
              <span className="text-2xs font-medium uppercase tracking-wider text-slate-500">Network Class</span>
              <div className="font-mono text-base font-bold text-slate-900 mt-1">Class ${details.ipClass}</div>
              <div className="text-2xs text-slate-400 mt-0.5">${details.isPrivate ? 'RFC 1918 Private' : 'Public Internet'}</div>
            </div>
          </div>

          <!-- Detailed Specifications Table -->
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Subnet Boundaries & Range</h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs font-mono">
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="text-slate-500 font-sans">Network Address</span>
                <span className="col-span-2 font-bold text-slate-900">${details.network}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-slate-50/60">
                <span className="text-slate-500 font-sans">First Usable Host</span>
                <span className="col-span-2 font-semibold text-emerald-700">${details.firstHost}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="text-slate-500 font-sans">Last Usable Host</span>
                <span className="col-span-2 font-semibold text-emerald-700">${details.lastHost}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-slate-50/60">
                <span className="text-slate-500 font-sans">Broadcast Address</span>
                <span className="col-span-2 font-bold text-slate-900">${details.broadcast}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-white">
                <span className="text-slate-500 font-sans">Wildcard Mask</span>
                <span className="col-span-2 text-slate-800">${details.wildcardMask}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-slate-50/60">
                <span className="text-slate-500 font-sans">Default Gateway (Suggested)</span>
                <span className="col-span-2 font-semibold text-blue-700">${details.firstHost}</span>
              </div>
            </div>
          </div>

          <!-- Binary Breakdown (Requirement 13) -->
          <${BinaryViewer} ip=${details.network} cidr=${details.cidr} label="CIDR Network" />
        </div>
      `}
    </div>
  `;
};
