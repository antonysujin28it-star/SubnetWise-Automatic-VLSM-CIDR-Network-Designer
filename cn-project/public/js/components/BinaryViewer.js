// SubnetWise — Educational Binary Representation Component
const html = htm.bind(React.createElement);

window.BinaryViewer = function BinaryViewer({ ip, cidr, label = 'Network Address' }) {
  if (!ip || !cidr) return null;

  const cidrNum = Number(cidr);
  const octets = ip.split('.').map(Number);
  const rawBits = octets.map(o => o.toString(2).padStart(8, '0')).join('');

  // Break down into 4 octets of 8 bits each
  const octetViews = [];
  for (let octetIdx = 0; octetIdx < 4; octetIdx++) {
    const bitStartIndex = octetIdx * 8;
    const bitEndIndex = bitStartIndex + 8;
    const octetBits = [];

    for (let bitIdx = bitStartIndex; bitIdx < bitEndIndex; bitIdx++) {
      const bitVal = rawBits[bitIdx];
      const isNetworkBit = bitIdx < cidrNum;
      const isBoundary = bitIdx === cidrNum - 1 && cidrNum < 32;

      octetBits.push(html`
        <span
          key=${bitIdx}
          className="inline-flex items-center relative font-mono text-xs px-0.5 py-0.5 rounded-sm transition-colors ${
            isNetworkBit
              ? 'text-blue-700 bg-blue-50 font-semibold'
              : 'text-slate-600 bg-slate-100 font-normal'
          } ${isBoundary ? 'border-r-2 border-r-rose-500 mr-0.5' : ''}"
          title="Bit ${bitIdx + 1}: ${isNetworkBit ? 'Network Bit' : 'Host Bit'} (${bitVal})"
        >
          ${bitVal}
        </span>
      `);
    }

    octetViews.push(html`
      <div key=${octetIdx} className="flex items-center space-x-0.5">
        <div className="flex items-center bg-slate-50 border border-slate-200 px-1.5 py-1 rounded">
          ${octetBits}
        </div>
        ${octetIdx < 3 && html`<span className="text-slate-400 font-mono px-0.5 font-bold">.</span>`}
      </div>
    `);
  }

  return html`
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold text-slate-800 flex items-center space-x-2">
          <${Icons.Hash} className="w-4 h-4 text-blue-600" />
          <span>Binary Architecture Breakdown</span>
          <span className="text-slate-400 font-normal">(${label}: ${ip}/${cidrNum})</span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Network Bits: <strong>${cidrNum}</strong></span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>Host Bits: <strong>${32 - cidrNum}</strong></span>
          </span>
        </div>
      </div>

      <!-- Bit representation with octet groupings -->
      <div className="flex flex-wrap items-center gap-1.5 py-1 overflow-x-auto">
        ${octetViews}
      </div>

      <div className="flex items-center justify-between text-2xs text-slate-500 pt-1 border-t border-slate-100">
        <span className="flex items-center space-x-1">
          <span className="w-1.5 h-3 bg-rose-500 inline-block rounded-xs"></span>
          <span>Red bar indicates the CIDR network prefix boundary (/<strong>${cidrNum}</strong>)</span>
        </span>
        <span className="font-mono text-slate-400">
          Capacity: 2^${32 - cidrNum} = ${Math.pow(2, 32 - cidrNum)} IPs (${Math.pow(2, 32 - cidrNum) - 2} usable)
        </span>
      </div>
    </div>
  `;
};
