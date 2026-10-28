// SubnetWise Production Application Bundle
window.html = (window.htm && window.React) ? window.htm.bind(React.createElement) : null;

// --- File: public/js/icons.js ---
(() => {
// SubnetWise — Clean Outline SVG Icons Library
const createIcon = (svgContent, defaultClass = 'w-5 h-5') => ({ className = defaultClass, ...props } = {}) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    ...props,
    dangerouslySetInnerHTML: { __html: svgContent }
  });
};

window.Icons = {
  // Logo & Network
  Network: createIcon('<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>'),
  Server: createIcon('<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>'),
  Cpu: createIcon('<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>'),
  Router: createIcon('<rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6.01 18H6"/><path d="M10.01 18H10"/><path d="M15 10v4"/><path d="M17.84 7.17a4 4 0 0 0-5.66 0"/><path d="M20.66 4.34a8 8 0 0 0-11.32 0"/>'),
  Layers: createIcon('<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>'),
  
  // Navigation
  Dashboard: createIcon('<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'),
  Designer: createIcon('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="m15 5 3 3"/>'),
  Calculator: createIcon('<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>'),
  Map: createIcon('<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/>'),
  AddressPlan: createIcon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>'),
  Validation: createIcon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
  History: createIcon('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>'),
  Settings: createIcon('<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'),

  // Status & Actions
  CheckCircle: createIcon('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'),
  AlertTriangle: createIcon('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>'),
  AlertCircle: createIcon('<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'),
  Info: createIcon('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  HelpCircle: createIcon('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>'),
  
  Plus: createIcon('<line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>'),
  Trash: createIcon('<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>'),
  Copy: createIcon('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
  Download: createIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>'),
  Printer: createIcon('<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>'),
  Refresh: createIcon('<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>'),
  Eye: createIcon('<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'),
  BookOpen: createIcon('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'),
  ChevronRight: createIcon('<polyline points="9 18 15 12 9 6"/>'),
  ArrowRight: createIcon('<line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/>'),
  X: createIcon('<line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/>'),
  Play: createIcon('<polygon points="5 3 19 12 5 21 5 3"/>'),
  Hash: createIcon('<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>'),
  Sliders: createIcon('<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/>'),
  Menu: createIcon('<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>'),
  Save: createIcon('<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>')
};

})();

// --- File: public/js/api.js ---
(() => {
// SubnetWise — Client API Service
window.API = {
  async calculateVLSM(baseIp, baseCidr, requirements, options = {}) {
    const res = await fetch('/api/vlsm/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseIp, baseCidr, requirements, options })
    });
    return res.json();
  },

  async calculateCIDR(ip, cidr) {
    const res = await fetch('/api/cidr/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip, cidr })
    });
    return res.json();
  },

  async validateNetwork(baseIp, baseCidr, requirements, calculatedResult) {
    const res = await fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseIp, baseCidr, requirements, calculatedResult })
    });
    return res.json();
  },

  async explainDesign(calculationResult) {
    const res = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculationResult })
    });
    return res.json();
  },

  async exportCSV(subnets, baseNetwork) {
    const res = await fetch('/api/export/csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subnets, baseNetwork })
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subnetwise-${baseNetwork.network.replace(/\./g, '_')}_${baseNetwork.cidr}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },

  async getProjects() {
    const res = await fetch('/api/projects');
    return res.json();
  },

  async getProject(id) {
    const res = await fetch(`/api/projects/${id}`);
    return res.json();
  },

  async saveProject(projectData) {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    return res.json();
  },

  async duplicateProject(id) {
    const res = await fetch(`/api/projects/${id}/duplicate`, {
      method: 'POST'
    });
    return res.json();
  },

  async deleteProject(id) {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  async getSettings() {
    const res = await fetch('/api/settings');
    return res.json();
  },

  async saveSettings(settings) {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return res.json();
  }
};

})();

// --- File: public/js/components/Toast.js ---
(() => {
// SubnetWise — Toast Notification System
const { useState, useEffect } = React;
const html = htm.bind(React.createElement);

let addToastGlobal = null;

window.toast = {
  success(message, duration = 4000) {
    if (addToastGlobal) addToastGlobal({ id: Date.now(), type: 'success', message, duration });
  },
  error(message, duration = 5000) {
    if (addToastGlobal) addToastGlobal({ id: Date.now(), type: 'error', message, duration });
  },
  warning(message, duration = 4500) {
    if (addToastGlobal) addToastGlobal({ id: Date.now(), type: 'warning', message, duration });
  },
  info(message, duration = 3500) {
    if (addToastGlobal) addToastGlobal({ id: Date.now(), type: 'info', message, duration });
  }
};

window.ToastContainer = function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastGlobal = (newToast) => {
      setToasts(prev => [...prev, newToast]);
      if (newToast.duration) {
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== newToast.id));
        }, newToast.duration);
      }
    };
    return () => { addToastGlobal = null; };
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return html`
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      ${toasts.map(t => {
        let borderClass = 'border-slate-200 bg-white text-slate-900';
        let icon = html`<${Icons.Info} className="w-5 h-5 text-blue-600 flex-shrink-0" />`;

        if (t.type === 'success') {
          borderClass = 'border-emerald-200 bg-emerald-50/90 text-emerald-950';
          icon = html`<${Icons.CheckCircle} className="w-5 h-5 text-emerald-600 flex-shrink-0" />`;
        } else if (t.type === 'error') {
          borderClass = 'border-rose-200 bg-rose-50/90 text-rose-950';
          icon = html`<${Icons.AlertCircle} className="w-5 h-5 text-rose-600 flex-shrink-0" />`;
        } else if (t.type === 'warning') {
          borderClass = 'border-amber-200 bg-amber-50/90 text-amber-950';
          icon = html`<${Icons.AlertTriangle} className="w-5 h-5 text-amber-600 flex-shrink-0" />`;
        }

        return html`
          <div
            key=${t.id}
            className="pointer-events-auto flex items-start space-x-3 p-3.5 rounded-lg border shadow-lg ${borderClass} transition-all duration-200"
          >
            ${icon}
            <div className="flex-1 text-xs font-medium leading-relaxed">${t.message}</div>
            <button
              onClick=${() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            >
              <${Icons.X} className="w-4 h-4" />
            </button>
          </div>
        `;
      })}
    </div>
  `;
};

})();

// --- File: public/js/components/AddressBar.js ---
(() => {
// SubnetWise — Address Space Visualizer
const { useState } = React;
const html = htm.bind(React.createElement);

window.AddressBar = function AddressBar({ visualBlocks, baseNetwork, onSelectSubnet }) {
  const [hoveredBlock, setHoveredBlock] = useState(null);

  if (!visualBlocks || visualBlocks.length === 0 || !baseNetwork) {
    return html`
      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-400 text-xs">
        No address allocation calculated yet.
      </div>
    `;
  }

  return html`
    <div className="space-y-3">
      <!-- Header with Base Network summary -->
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center space-x-2 font-mono">
          <span className="font-semibold text-slate-900">${baseNetwork.network}/${baseNetwork.cidr}</span>
          <span className="text-slate-400">(${baseNetwork.totalAddresses.toLocaleString()} total IPs)</span>
        </div>
        <div className="flex items-center space-x-4 text-2xs uppercase tracking-wider font-medium text-slate-500">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block"></span>
            <span>Allocated</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
            <span>Optimal (≥75%)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block"></span>
            <span>Unused Free</span>
          </span>
        </div>
      </div>

      <!-- Proportional Visual Bar -->
      <div className="relative w-full h-14 bg-slate-100 rounded-lg border border-slate-200 p-1 flex overflow-hidden shadow-inner">
        ${visualBlocks.map((block, idx) => {
          const isFree = block.type === 'free';
          const isHighEfficiency = !isFree && block.efficiency >= 75;
          const widthPercent = Math.max(block.percentage, 1.2); // minimum width for clickable visibility

          let bgClass = 'bg-blue-500 hover:bg-blue-600 text-white';
          if (isFree) {
            bgClass = 'bg-slate-200 hover:bg-slate-300 text-slate-600 border border-slate-300/60';
          } else if (isHighEfficiency) {
            bgClass = 'bg-emerald-600 hover:bg-emerald-700 text-white';
          }

          return html`
            <div
              key=${idx}
              style=${{ width: `${widthPercent}%` }}
              onMouseEnter=${() => setHoveredBlock(block)}
              onMouseLeave=${() => setHoveredBlock(null)}
              onClick=${() => {
                if (!isFree && onSelectSubnet) {
                  onSelectSubnet(block.subnetId);
                }
              }}
              className="subnet-block relative h-full flex flex-col justify-center items-center px-1.5 border-r border-white/40 last:border-r-0 select-none transition-all duration-150 ${bgClass}"
              title="${block.name} (/${block.cidr}): ${block.totalAddresses} addresses"
            >
              <div className="w-full text-center truncate font-medium text-xs leading-tight">
                ${block.name}
              </div>
              <div className="text-2xs font-mono opacity-85 truncate">
                /${block.cidr}
              </div>
            </div>
          `;
        })}
      </div>

      <!-- Hover Tooltip Detail Panel -->
      <div className="min-h-[44px] px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs flex items-center justify-between transition-all">
        ${hoveredBlock ? html`
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full ${hoveredBlock.type === 'free' ? 'bg-slate-400' : hoveredBlock.efficiency >= 75 ? 'bg-emerald-500' : 'bg-blue-500'}"></span>
              <span>${hoveredBlock.name}</span>
              <span className="font-mono text-slate-500">/${hoveredBlock.cidr}</span>
            </span>
            <span className="text-slate-600 font-mono">
              Net: <strong className="text-slate-900">${hoveredBlock.network}</strong>
            </span>
            <span className="text-slate-600 font-mono">
              Bcast: <strong className="text-slate-900">${hoveredBlock.broadcast}</strong>
            </span>
            <span className="text-slate-600">
              ${hoveredBlock.type === 'free' ? 'Available: ' : 'Usable: '}
              <strong className="text-slate-900 font-mono">${hoveredBlock.usableHosts}</strong>
              <span className="text-slate-400 ml-1">(${hoveredBlock.totalAddresses} total)</span>
            </span>
            ${hoveredBlock.type !== 'free' && html`
              <span className="text-slate-600">
                Efficiency: <strong className="${hoveredBlock.efficiency >= 75 ? 'text-emerald-700' : 'text-slate-900'}">${hoveredBlock.efficiency}%</strong>
              </span>
            `}
          </div>
        ` : html`
          <span className="text-slate-400 italic">Hover over any subnet block above to inspect address boundaries, or click to view deep details.</span>
        `}

        ${hoveredBlock && hoveredBlock.type !== 'free' && html`
          <span className="text-2xs font-medium text-blue-600 flex items-center space-x-0.5">
            <span>Click to inspect</span>
            <${Icons.ChevronRight} className="w-3 h-3" />
          </span>
        `}
      </div>
    </div>
  `;
};

})();

// --- File: public/js/components/BinaryViewer.js ---
(() => {
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

})();

// --- File: public/js/components/SubnetDetailModal.js ---
(() => {
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

})();

// --- File: public/js/components/ExplainModal.js ---
(() => {
// SubnetWise — Dynamic Design Explanation Modal
const html = htm.bind(React.createElement);

window.ExplainModal = function ExplainModal({ explanation, onClose }) {
  if (!explanation) return null;

  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <!-- Header -->
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
              <${Icons.BookOpen} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ${explanation.title || 'Architectural Explanation'}
              </h3>
              <p className="text-xs text-slate-500">
                Mathematical step-by-step reasoning for this VLSM allocation
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
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          
          <!-- High-level paragraphs -->
          ${explanation.paragraphs && explanation.paragraphs.map((p, idx) => html`
            <div key=${idx} className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-lg text-xs leading-relaxed text-slate-800">
              ${p}
            </div>
          `)}

          <!-- Step-by-step Allocation Breakdown -->
          ${explanation.steps && explanation.steps.length > 0 && html`
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Subnet Allocation Sequence (Descending Order of Host Demands)
              </h4>
              <div className="space-y-3">
                ${explanation.steps.map(step => html`
                  <div key=${step.stepNumber} className="border border-slate-200 rounded-lg p-3.5 bg-white shadow-card space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-2xs flex items-center justify-center font-bold">
                          ${step.stepNumber}
                        </span>
                        <span className="font-bold text-slate-900 text-xs">${step.name}</span>
                        <span className="font-mono text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          ${step.cidr}
                        </span>
                      </div>
                      <div className="text-2xs font-mono text-slate-500">
                        ${step.network} – ${step.broadcast} • ${step.usable} usable hosts (${step.efficiency})
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      ${step.explanation}
                    </p>
                  </div>
                `)}
              </div>
            </div>
          `}

          <!-- Academic Viva Tip -->
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start space-x-2.5">
            <${Icons.AlertTriangle} className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Computer Networks Viva Note: </strong>
              <span>
                VLSM requires sorting requirements from largest to smallest because larger subnets have stricter binary boundary alignment (powers of 2). Aligning largest subnets first guarantees continuous contiguous packing without leaving unaligned gaps.
              </span>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div className="flex items-center justify-end px-6 py-3.5 border-t border-slate-200 bg-slate-50">
          <button
            onClick=${onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  `;
};

})();

// --- File: public/js/components/Sidebar.js ---
(() => {
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

})();

// --- File: public/js/components/Header.js ---
(() => {
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

})();

// --- File: public/js/views/DashboardView.js ---
(() => {
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

})();

// --- File: public/js/views/DesignerView.js ---
(() => {
// SubnetWise — Network Designer View (Main Feature)
const { useState, useEffect } = React;
const html = htm.bind(React.createElement);

window.DesignerView = function DesignerView({
  baseIp,
  setBaseIp,
  baseCidr,
  setBaseCidr,
  requirements,
  setRequirements,
  calculationResult,
  onCalculate,
  isCalculating,
  onSelectSubnet,
  onExplain,
  onExportCsv,
  onSaveProject,
  onLoadPreset
}) {
  const [sortField, setSortField] = useState('networkInt');
  const [sortAsc, setSortAsc] = useState(true);
  const [basePreview, setBasePreview] = useState(null);

  // Live preview of Base Network details
  useEffect(() => {
    let active = true;
    if (baseIp && baseCidr) {
      API.calculateCIDR(baseIp, Number(baseCidr))
        .then(res => {
          if (active && res.success) {
            setBasePreview(res.details);
          } else if (active) {
            setBasePreview(null);
          }
        })
        .catch(() => { if (active) setBasePreview(null); });
    }
    return () => { active = false; };
  }, [baseIp, baseCidr]);

  // Requirement row operations
  const handleAddRequirement = () => {
    if (requirements.length >= 50) {
      toast.warning('Maximum 50 requirements allowed.');
      return;
    }
    const newId = `req-${Date.now()}`;
    setRequirements([
      ...requirements,
      { id: newId, name: `Subnet ${requirements.length + 1}`, requiredHosts: 20, priority: 'Medium', description: '' }
    ]);
  };

  const handleRemoveRequirement = (id) => {
    if (requirements.length <= 1) {
      toast.warning('At least one requirement is needed.');
      return;
    }
    setRequirements(requirements.filter(r => r.id !== id));
  };

  const handleDuplicateRequirement = (req) => {
    if (requirements.length >= 50) {
      toast.warning('Maximum 50 requirements allowed.');
      return;
    }
    const newReq = {
      ...req,
      id: `req-${Date.now()}`,
      name: `${req.name} (Copy)`
    };
    setRequirements([...requirements, newReq]);
  };

  const handleUpdateRequirement = (id, field, value) => {
    setRequirements(requirements.map(r => {
      if (r.id !== id) return r;
      return { ...r, [field]: value };
    }));
  };

  // Sorting for Subnet Results Table
  const sortedSubnets = calculationResult?.subnets ? [...calculationResult.subnets].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  }) : [];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return html`
    <div className="space-y-8">
      
      <!-- Screen Title & Top Bar -->
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Network Designer</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automatic Variable Length Subnet Masking (VLSM) synthesis and bit-level planning
          </p>
        </div>

        <!-- Presets quick selector -->
        <div className="flex items-center space-x-2">
          <span className="text-2xs font-semibold uppercase text-slate-500">Presets:</span>
          <button
            onClick=${() => onLoadPreset('college')}
            className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 font-medium transition-colors"
          >
            College Network
          </button>
          <button
            onClick=${() => onLoadPreset('smallOffice')}
            className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 font-medium transition-colors"
          >
            Small Office
          </button>
          <button
            onClick=${() => onLoadPreset('datacenter')}
            className="px-2.5 py-1 text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 font-medium transition-colors"
          >
            Data Center
          </button>
        </div>
      </div>

      <!-- WORKFLOW STEP 1: Define Base Network (Requirement 6) -->
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Step 1 — Define Base IPv4 Network
            </h2>
          </div>
          <span className="text-2xs text-slate-400 font-mono">CIDR Range: /8 through /30</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- IPv4 Input -->
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Base IPv4 Address
            </label>
            <div className="relative">
              <input
                type="text"
                value=${baseIp}
                onChange=${e => setBaseIp(e.target.value)}
                placeholder="192.168.10.0"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <p className="text-2xs text-slate-400 mt-1">E.g., 192.168.10.0 or 10.0.0.0</p>
          </div>

          <!-- CIDR Input -->
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              CIDR Prefix Length (/${baseCidr})
            </label>
            <div className="flex items-center space-x-2">
              <select
                value=${baseCidr}
                onChange=${e => setBaseCidr(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              >
                ${Array.from({ length: 23 }, (_, i) => 8 + i).map(c => html`
                  <option key=${c} value=${c}>/${c} (${Math.pow(2, 32 - c).toLocaleString()} IPs)</option>
                `)}
              </select>
            </div>
            <p className="text-2xs text-slate-400 mt-1">Select from /8 down to /30</p>
          </div>

          <!-- Live Network Summary -->
          <div className="flex flex-col justify-center">
            ${basePreview ? html`
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-2xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">True Network:</span>
                  <span className="font-bold text-slate-900">${basePreview.network}/${basePreview.cidr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Subnet Mask:</span>
                  <span className="text-slate-700">${basePreview.subnetMask}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Usable Pool:</span>
                  <span className="text-emerald-700 font-semibold">${basePreview.usableHosts.toLocaleString()} hosts</span>
                </div>
              </div>
            ` : html`
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-2xs text-rose-700">
                Invalid base IPv4 or CIDR prefix.
              </div>
            `}
          </div>
        </div>

        <!-- Calculated Live Info Bar (Requirement 6) -->
        ${basePreview && html`
          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs">
            <div className="p-2 bg-slate-50/60 rounded border border-slate-100">
              <span className="text-2xs font-sans text-slate-400 block">Subnet Mask</span>
              <span className="text-slate-800 font-semibold truncate block">${basePreview.subnetMask}</span>
            </div>
            <div className="p-2 bg-slate-50/60 rounded border border-slate-100">
              <span className="text-2xs font-sans text-slate-400 block">Total Addresses</span>
              <span className="text-slate-800 font-semibold">${basePreview.totalAddresses.toLocaleString()}</span>
            </div>
            <div className="p-2 bg-slate-50/60 rounded border border-slate-100">
              <span className="text-2xs font-sans text-slate-400 block">Usable Hosts</span>
              <span className="text-emerald-700 font-semibold">${basePreview.usableHosts.toLocaleString()}</span>
            </div>
            <div className="p-2 bg-slate-50/60 rounded border border-slate-100">
              <span className="text-2xs font-sans text-slate-400 block">First Address</span>
              <span className="text-slate-800 truncate block">${basePreview.firstHost}</span>
            </div>
            <div className="p-2 bg-slate-50/60 rounded border border-slate-100">
              <span className="text-2xs font-sans text-slate-400 block">Last Address</span>
              <span className="text-slate-800 truncate block">${basePreview.lastHost}</span>
            </div>
            <div className="p-2 bg-slate-50/60 rounded border border-slate-100">
              <span className="text-2xs font-sans text-slate-400 block">Broadcast</span>
              <span className="text-slate-800 truncate block">${basePreview.broadcast}</span>
            </div>
          </div>
        `}
      </div>

      <!-- WORKFLOW STEP 2: Add Requirements (Requirement 7) -->
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Step 2 — Add Department / Network Requirements
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xs text-slate-500 font-medium">
              ${requirements.length} / 50 Requirements
            </span>
            <button
              onClick=${handleAddRequirement}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg transition-colors border border-slate-200"
            >
              <${Icons.Plus} className="w-3.5 h-3.5" />
              <span>Add Requirement</span>
            </button>
          </div>
        </div>

        <!-- Requirements dynamic table -->
        <div className="border border-slate-200 rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-2.5 px-3 w-10 text-center">#</th>
                <th className="py-2.5 px-3 min-w-[140px]">Department / Name</th>
                <th className="py-2.5 px-3 w-36">Required Hosts</th>
                <th className="py-2.5 px-3 w-32">Priority</th>
                <th className="py-2.5 px-3 min-w-[160px]">Description</th>
                <th className="py-2.5 px-3 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              ${requirements.map((req, idx) => html`
                <tr key=${req.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-2xs">
                    ${idx + 1}
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value=${req.name}
                      onChange=${e => handleUpdateRequirement(req.id, 'name', e.target.value)}
                      placeholder="e.g. CSE"
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      min="1"
                      value=${req.requiredHosts}
                      onChange=${e => handleUpdateRequirement(req.id, 'requiredHosts', Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <select
                      value=${req.priority || 'Medium'}
                      onChange=${e => handleUpdateRequirement(req.id, 'priority', e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-700 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value=${req.description || ''}
                      onChange=${e => handleUpdateRequirement(req.id, 'description', e.target.value)}
                      placeholder="Optional notes"
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex items-center space-x-1">
                      <button
                        onClick=${() => handleDuplicateRequirement(req)}
                        title="Duplicate"
                        className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"
                      >
                        <${Icons.Copy} className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick=${() => handleRemoveRequirement(req.id)}
                        title="Remove"
                        disabled=${requirements.length <= 1}
                        className="p-1 text-rose-400 hover:text-rose-600 disabled:opacity-30 rounded hover:bg-rose-50 transition-colors"
                      >
                        <${Icons.Trash} className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>

        <!-- Generate VLSM Plan CTA Button -->
        <div className="flex flex-wrap items-center justify-between pt-2 gap-3">
          <div className="text-2xs text-slate-500">
            Total Requested: <strong className="text-slate-800">${requirements.reduce((s, r) => s + (Number(r.requiredHosts) || 0), 0)} hosts</strong> across ${requirements.length} departments.
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick=${onSaveProject}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center space-x-1.5"
            >
              <${Icons.Save} className="w-3.5 h-3.5" />
              <span>Save Design</span>
            </button>
            <button
              onClick=${onCalculate}
              disabled=${isCalculating}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <${Icons.Play} className="w-3.5 h-3.5" />
              <span>${isCalculating ? 'Computing Allocation...' : 'Generate VLSM Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- CALCULATION RESULTS SECTION (Requirement 9, 10, 17, 18, 19, 21) -->
      ${calculationResult && calculationResult.success && html`
        <div className="space-y-6 pt-2">
          
          <!-- Summary Banner with Efficiency & Actions -->
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
                  <${Icons.CheckCircle} className="w-4 h-4 text-emerald-600" />
                  <span>VLSM Allocation Results</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Optimal binary packing achieved with zero address collisions.
                </p>
              </div>

              <!-- Top Action Buttons (Requirement 19 & 21) -->
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick=${onExplain}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <${Icons.BookOpen} className="w-3.5 h-3.5" />
                  <span>Explain Design</span>
                </button>
                <button
                  onClick=${onExportCsv}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <${Icons.Download} className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick=${() => window.print()}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center space-x-1.5 no-print"
                >
                  <${Icons.Printer} className="w-3.5 h-3.5" />
                  <span>Print Plan</span>
                </button>
              </div>
            </div>

            <!-- Address Space Visualization (Requirement 10) -->
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">Address Space Partitioning</div>
              <${AddressBar}
                visualBlocks=${calculationResult.visualBlocks}
                baseNetwork=${calculationResult.baseNetwork}
                onSelectSubnet=${onSelectSubnet}
              />
            </div>
          </div>

          <!-- RESULT TABLE (Requirement 9) -->
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
                <${Icons.Layers} className="w-4 h-4 text-blue-600" />
                <span>Generated Subnet Table</span>
              </h3>
              <span className="text-2xs text-slate-400">
                Click column header to sort • Click any row to inspect details
              </span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold select-none">
                  <tr>
                    <th onClick=${() => handleSort('name')} className="py-2.5 px-3 cursor-pointer hover:bg-slate-100">
                      Subnet / Dept ${sortField === 'name' ? (sortAsc ? '↑' : '↓') : ''}
                    </th>
                    <th onClick=${() => handleSort('requiredHosts')} className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 text-right">
                      Required ${sortField === 'requiredHosts' ? (sortAsc ? '↑' : '↓') : ''}
                    </th>
                    <th onClick=${() => handleSort('cidr')} className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 text-center font-mono">
                      CIDR ${sortField === 'cidr' ? (sortAsc ? '↑' : '↓') : ''}
                    </th>
                    <th className="py-2.5 px-3 font-mono">Subnet Mask</th>
                    <th onClick=${() => handleSort('networkInt')} className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 font-mono">
                      Network IP ${sortField === 'networkInt' ? (sortAsc ? '↑' : '↓') : ''}
                    </th>
                    <th className="py-2.5 px-3 font-mono">First Host</th>
                    <th className="py-2.5 px-3 font-mono">Last Host</th>
                    <th className="py-2.5 px-3 font-mono">Broadcast</th>
                    <th onClick=${() => handleSort('usableHosts')} className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 text-right font-mono">
                      Usable ${sortField === 'usableHosts' ? (sortAsc ? '↑' : '↓') : ''}
                    </th>
                    <th onClick=${() => handleSort('wastedHosts')} className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 text-right font-mono">
                      Wasted ${sortField === 'wastedHosts' ? (sortAsc ? '↑' : '↓') : ''}
                    </th>
                    <th onClick=${() => handleSort('efficiency')} className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 text-right">
                      Efficiency ${sortField === 'efficiency' ? (sortAsc ? '↑' : '↓') : ''}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-2xs">
                  ${sortedSubnets.map(s => html`
                    <tr
                      key=${s.id}
                      onClick=${() => onSelectSubnet(s.id)}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3 font-sans font-semibold text-slate-900 text-xs">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full ${s.efficiency >= 75 ? 'bg-emerald-500' : 'bg-blue-500'}"></span>
                          <span>${s.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-700 font-medium">
                        ${s.requiredHosts}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                          /${s.cidr}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">${s.subnetMask}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">${s.network}</td>
                      <td className="py-2.5 px-3 text-emerald-700">${s.firstHost}</td>
                      <td className="py-2.5 px-3 text-emerald-700">${s.lastHost}</td>
                      <td className="py-2.5 px-3 text-slate-800">${s.broadcast}</td>
                      <td className="py-2.5 px-3 text-right font-semibold text-slate-900">${s.usableHosts}</td>
                      <td className="py-2.5 px-3 text-right text-amber-600 font-medium">${s.wastedHosts}</td>
                      <td className="py-2.5 px-3 text-right font-sans font-semibold ${s.efficiency >= 75 ? 'text-emerald-700' : 'text-slate-700'}">
                        ${s.efficiency}%
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          </div>

          <!-- COMPARISON: VLSM VS FIXED SUBNETTING (Requirement 18) -->
          ${calculationResult.comparison && html`
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
                  <${Icons.Sliders} className="w-4 h-4 text-blue-600" />
                  <span>Educational Comparison: VLSM vs Traditional Fixed Subnetting</span>
                </h3>
                <span className="text-2xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ${calculationResult.comparison.savingsPercent}% Address Savings
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-3.5 bg-blue-50/40 border border-blue-200 rounded-lg space-y-1.5">
                  <div className="text-xs font-bold text-blue-900 flex items-center justify-between">
                    <span>VLSM (Variable Length)</span>
                    <span className="text-2xs font-mono bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">Adaptive</span>
                  </div>
                  <p className="text-2xs text-slate-600 leading-relaxed">
                    Dynamically sizes each subnet prefix to fit each department (/25, /26, /27, /28).
                  </p>
                  <div className="text-xs font-mono text-blue-950 font-bold pt-1">
                    Total Addresses Used: ${calculationResult.comparison.vlsmTotalAddressesUsed}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Fixed-Size Subnetting</span>
                    <span className="text-2xs font-mono bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                      /${calculationResult.comparison.fixedPrefix} Fixed
                    </span>
                  </div>
                  <p className="text-2xs text-slate-600 leading-relaxed">
                    Every department is forced to use the largest required mask (/${calculationResult.comparison.fixedPrefix}, ${calculationResult.comparison.fixedAddressesPerSubnet} IPs each).
                  </p>
                  <div className="text-xs font-mono text-slate-900 font-bold pt-1">
                    Total Addresses Needed: ${calculationResult.comparison.fixedTotalAddressesNeeded}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                ${calculationResult.comparison.explanation}
              </p>
            </div>
          `}

          <!-- NETWORK EFFICIENCY PROGRESS BAR (Requirement 17) -->
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Network Host Efficiency
              </h3>
              <span className="font-mono text-xs font-bold text-emerald-700">
                ${calculationResult.metrics.overallEfficiency}% Overall Efficiency
              </span>
            </div>

            <!-- Simple clean progress bar (Requirement 17) -->
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200 flex">
              <div
                style=${{ width: `${calculationResult.metrics.overallEfficiency}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
              ></div>
            </div>

            <div className="flex justify-between text-2xs text-slate-500 font-mono">
              <span>Requested Hosts: <strong>${calculationResult.metrics.totalRequestedHosts}</strong></span>
              <span>Allocated Capacity: <strong>${calculationResult.metrics.totalAllocatedCapacity}</strong></span>
              <span>Wasted Host Capacity: <strong className="text-amber-600">${calculationResult.metrics.totalWastedAddresses}</strong></span>
            </div>
          </div>

        </div>
      `}

      <!-- Overflow Error State (Requirement 26 & 28) -->
      ${calculationResult && !calculationResult.success && calculationResult.hasOverflow && html`
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 space-y-2">
          <div className="flex items-center space-x-2">
            <${Icons.AlertCircle} className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <h3 className="text-sm font-bold">Insufficient Address Space</h3>
          </div>
          <p className="text-xs leading-relaxed text-rose-800">
            ${calculationResult.error}
          </p>
          <div className="text-2xs font-mono text-rose-700 pt-1">
            Shortfall: Need at least <strong>${calculationResult.totalShortfall}</strong> additional addresses. Consider expanding the base network prefix (e.g., from /24 to /23).
          </div>
        </div>
      `}

    </div>
  `;
};

})();

// --- File: public/js/views/VlsmCalcView.js ---
(() => {
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

})();

// --- File: public/js/views/CidrCalcView.js ---
(() => {
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

})();

// --- File: public/js/views/SubnetMapView.js ---
(() => {
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

})();

// --- File: public/js/views/AddressPlanView.js ---
(() => {
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

})();

// --- File: public/js/views/ValidationView.js ---
(() => {
// SubnetWise — Network Validation View (Requirement 16)
const { useState, useEffect } = React;
const html = htm.bind(React.createElement);

window.ValidationView = function ValidationView({ baseIp, baseCidr, requirements, calculationResult, onNavigate }) {
  const [validationData, setValidationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const runValidation = async () => {
    setLoading(true);
    try {
      const res = await API.validateNetwork(baseIp, Number(baseCidr), requirements, calculationResult);
      setValidationData(res);
    } catch (err) {
      toast.error('Validation check error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runValidation();
  }, [baseIp, baseCidr, requirements, calculationResult]);

  return html`
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Network Validation Engine</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated diagnostic test runner for boundary alignment, overlapping subnets, and host collisions
          </p>
        </div>

        <button
          onClick=${runValidation}
          className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <${Icons.Refresh} className="w-3.5 h-3.5" />
          <span>Re-run Checks</span>
        </button>
      </div>

      ${loading && html`
        <div className="p-12 text-center text-slate-500 text-xs">
          Running diagnostic suite...
        </div>
      `}

      ${!loading && validationData && html`
        <div className="space-y-6">
          
          <!-- Master Status Banner -->
          <div className="p-4 rounded-lg border ${
            validationData.hasErrors
              ? 'bg-rose-50 border-rose-200 text-rose-950'
              : validationData.hasWarnings
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          } flex items-start space-x-3 shadow-card">
            ${validationData.hasErrors
              ? html`<${Icons.AlertCircle} className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />`
              : validationData.hasWarnings
                ? html`<${Icons.AlertTriangle} className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />`
                : html`<${Icons.CheckCircle} className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />`}
            <div>
              <h3 className="text-sm font-bold">
                ${validationData.hasErrors
                  ? 'Critical Validation Failures Found'
                  : validationData.hasWarnings
                    ? 'Validation Passed with Warnings'
                    : 'All Verification Checks Passed (100% Valid)'}
              </h3>
              <p className="text-xs mt-0.5 leading-relaxed opacity-90">
                ${validationData.summary}
              </p>
            </div>
          </div>

          <!-- Diagnostic Check Cards Grid -->
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Diagnostic Audit Report (${validationData.diagnostics?.length || 0} Checks Evaluated)
            </h2>

            <div className="grid grid-cols-1 gap-3">
              ${validationData.diagnostics?.map(item => {
                let badge = html`<span className="text-2xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">✓ Valid</span>`;
                let border = 'border-slate-200 bg-white';
                let icon = html`<${Icons.CheckCircle} className="w-4 h-4 text-emerald-600 flex-shrink-0" />`;

                if (item.type === 'error') {
                  badge = html`<span className="text-2xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">✕ Error</span>`;
                  border = 'border-rose-200 bg-rose-50/30';
                  icon = html`<${Icons.AlertCircle} className="w-4 h-4 text-rose-600 flex-shrink-0" />`;
                } else if (item.type === 'warning') {
                  badge = html`<span className="text-2xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">⚠ Warning</span>`;
                  border = 'border-amber-200 bg-amber-50/30';
                  icon = html`<${Icons.AlertTriangle} className="w-4 h-4 text-amber-600 flex-shrink-0" />`;
                }

                return html`
                  <div key=${item.id} className="p-3.5 rounded-lg border ${border} shadow-card flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">${icon}</div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">${item.title}</h4>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          ${item.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">${badge}</div>
                  </div>
                `;
              })}
            </div>
          </div>

          <!-- Academic Checklist Reference -->
          <div className="bg-white rounded-lg border border-slate-200 p-4 text-xs text-slate-600 shadow-card space-y-2">
            <h4 className="font-semibold text-slate-800">Verification Rules Tested:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-2xs text-slate-500 list-disc list-inside">
              <li>IPv4 Format & Octet Boundaries (0–255)</li>
              <li>CIDR Prefix Validation (/8 through /30)</li>
              <li>Network Boundary Alignment (Binary Powers of 2)</li>
              <li>Base Network Space Containment</li>
              <li>Mutual Exclusion (Zero Subnet Overlaps)</li>
              <li>Gateway Host Validity (No Net/Bcast Collisions)</li>
              <li>Demanded Host Capacity Sufficiency</li>
              <li>Department Namespace Collision Check</li>
            </ul>
          </div>

        </div>
      `}
    </div>
  `;
};

})();

// --- File: public/js/views/HistoryView.js ---
(() => {
// SubnetWise — Project History View (Requirement 22)
const { useState, useEffect } = React;
const html = htm.bind(React.createElement);

window.HistoryView = function HistoryView({ onLoadProject, onDuplicateProject, onDeleteProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.getProjects();
      if (res.success) {
        setProjects(res.projects);
      }
    } catch (err) {
      toast.error('Failed to load project history: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete project "${name}"?`)) return;
    try {
      const res = await API.deleteProject(id);
      if (res.success) {
        toast.success(`Project "${name}" deleted.`);
        fetchProjects();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const res = await API.duplicateProject(id);
      if (res.success) {
        toast.success('Project duplicated.');
        fetchProjects();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return html`
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Project History</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Saved network topologies persisted in local SQLite database
          </p>
        </div>

        <button
          onClick=${fetchProjects}
          className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <${Icons.Refresh} className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Project Name</th>
                <th className="py-3 px-4 font-mono">Base Network</th>
                <th className="py-3 px-4 text-center">Subnets</th>
                <th className="py-3 px-4 text-center">Efficiency</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              ${loading && html`
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                    Loading saved designs...
                  </td>
                </tr>
              `}

              ${!loading && projects.length === 0 && html`
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400 text-xs">
                    No saved projects found in database.
                  </td>
                </tr>
              `}

              ${!loading && projects.map(p => html`
                <tr key=${p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">${p.name}</div>
                    <div className="text-2xs text-slate-400 truncate max-w-xs">${p.description || 'No description'}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700 font-medium">
                    ${p.baseNetwork}/${p.cidr}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-slate-800">
                    ${p.subnetsCount}
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-700">
                    ${p.efficiency}%
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-2xs">
                    ${new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center space-x-1.5">
                      <button
                        onClick=${() => onLoadProject(p.id)}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-xs font-medium transition-colors"
                      >
                        Open
                      </button>
                      <button
                        onClick=${() => handleDuplicate(p.id)}
                        title="Duplicate project"
                        className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors"
                      >
                        <${Icons.Copy} className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick=${() => handleDelete(p.id, p.name)}
                        title="Delete project"
                        className="p-1 text-rose-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                      >
                        <${Icons.Trash} className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};

})();

// --- File: public/js/views/SettingsView.js ---
(() => {
// SubnetWise — Settings View
const { useState, useEffect } = React;
const html = htm.bind(React.createElement);

window.SettingsView = function SettingsView({ gatewayConvention, setGatewayConvention }) {
  const [settings, setSettings] = useState({
    defaultGatewayConvention: gatewayConvention || 'first',
    showBinaryDots: true,
    autoCalculate: true
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    API.getSettings().then(res => {
      if (res.success && res.settings) {
        setSettings(res.settings);
        if (res.settings.defaultGatewayConvention) {
          setGatewayConvention(res.settings.defaultGatewayConvention);
        }
      }
    });
  }, []);

  const handleSave = async () => {
    try {
      await API.saveSettings(settings);
      setGatewayConvention(settings.defaultGatewayConvention);
      setSaved(true);
      toast.success('Preferences saved successfully.');
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      toast.error('Failed to save settings: ' + err.message);
    }
  };

  return html`
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Application Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">Configure network conventions, export standards, and engine parameters</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-card space-y-6 max-w-2xl">
        
        <!-- Gateway Convention -->
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide">
            Default Gateway Assignment Convention
          </label>
          <p className="text-xs text-slate-500">
            Determines which host address in the subnet is automatically assigned as default router gateway.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
              settings.defaultGatewayConvention === 'first'
                ? 'border-blue-500 bg-blue-50/40 text-blue-900 font-medium'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }">
              <input
                type="radio"
                name="gatewayConvention"
                value="first"
                checked=${settings.defaultGatewayConvention === 'first'}
                onChange=${e => setSettings({ ...settings, defaultGatewayConvention: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="text-xs">
                <span className="block font-bold">First Usable Host</span>
                <span className="text-2xs text-slate-500">Industry standard (e.g., .1)</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
              settings.defaultGatewayConvention === 'last'
                ? 'border-blue-500 bg-blue-50/40 text-blue-900 font-medium'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }">
              <input
                type="radio"
                name="gatewayConvention"
                value="last"
                checked=${settings.defaultGatewayConvention === 'last'}
                onChange=${e => setSettings({ ...settings, defaultGatewayConvention: e.target.value })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="text-xs">
                <span className="block font-bold">Last Usable Host</span>
                <span className="text-2xs text-slate-500">Enterprise convention (e.g., .254)</span>
              </div>
            </label>
          </div>
        </div>

        <hr className="border-slate-100" />

        <!-- Binary View Options -->
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide">
            Educational Display Preferences
          </label>
          <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">Show Octet Separation Dots</span>
              <span className="text-2xs text-slate-500">Format binary strings with dots between octets</span>
            </div>
            <input
              type="checkbox"
              checked=${settings.showBinaryDots}
              onChange=${e => setSettings({ ...settings, showBinaryDots: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded border-slate-300"
            />
          </div>
        </div>

        <hr className="border-slate-100" />

        <!-- Save Button -->
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xs text-slate-400 font-mono">
            SQLite Database: subnetwise.db (Active)
          </span>
          <button
            onClick=${handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            ${saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

      </div>
    </div>
  `;
};

})();

// --- File: public/js/app.js ---
(() => {
// SubnetWise — Master Application Controller
const { useState, useEffect } = React;
const html = htm.bind(React.createElement);

const PRESET_DATA = {
  college: {
    name: 'College Network',
    baseNetwork: '192.168.10.0',
    cidr: 24,
    description: 'Academic campus allocation: CSE, ECE, Admin, and Server Room.',
    requirements: [
      { id: 'req-cse', name: 'CSE', requiredHosts: 100, priority: 'High', description: 'Computer Science & Engineering Labs' },
      { id: 'req-ece', name: 'ECE', requiredHosts: 50, priority: 'High', description: 'Electronics & Communication Labs' },
      { id: 'req-admin', name: 'Admin', requiredHosts: 25, priority: 'Medium', description: 'Administrative Staff & Dean Offices' },
      { id: 'req-server', name: 'Server Room', requiredHosts: 10, priority: 'Critical', description: 'Internal Campus Servers & Storage' }
    ]
  },
  smallOffice: {
    name: 'Small Office',
    baseNetwork: '192.168.1.0',
    cidr: 24,
    description: 'Corporate corporate office division across departments.',
    requirements: [
      { id: 'req-so-dev', name: 'Development', requiredHosts: 60, priority: 'High', description: 'Software engineering workstations' },
      { id: 'req-so-mgmt', name: 'Management', requiredHosts: 30, priority: 'Medium', description: 'Executive & finance teams' },
      { id: 'req-so-hr', name: 'HR', requiredHosts: 15, priority: 'Low', description: 'Human resources and legal staff' },
      { id: 'req-so-srv', name: 'Servers', requiredHosts: 10, priority: 'Critical', description: 'Active Directory and file servers' }
    ]
  },
  datacenter: {
    name: 'Data Center',
    baseNetwork: '10.0.0.0',
    cidr: 23,
    description: 'High-density multi-tier application infrastructure.',
    requirements: [
      { id: 'req-dc-app', name: 'Application', requiredHosts: 120, priority: 'High', description: 'App server clusters and worker nodes' },
      { id: 'req-dc-db', name: 'Database', requiredHosts: 60, priority: 'Critical', description: 'Primary & replica SQL databases' },
      { id: 'req-dc-mgmt', name: 'Management', requiredHosts: 20, priority: 'Medium', description: 'Bastion host and VPN access' },
      { id: 'req-dc-mon', name: 'Monitoring', requiredHosts: 10, priority: 'Low', description: 'Prometheus & logging collectors' }
    ]
  }
};

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Active network state (initialized with College Network demo - Section 29)
  const [baseIp, setBaseIp] = useState('192.168.10.0');
  const [baseCidr, setBaseCidr] = useState(24);
  const [requirements, setRequirements] = useState(PRESET_DATA.college.requirements);
  const [activeProject, setActiveProject] = useState({ id: 'proj-college-net', name: 'College Network' });
  const [gatewayConvention, setGatewayConvention] = useState('first');

  // Calculation and inspection state
  const [calculationResult, setCalculationResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedSubnet, setSelectedSubnet] = useState(null);
  const [explanationData, setExplanationData] = useState(null);

  // Run calculation
  const runCalculation = async (ip = baseIp, cidr = baseCidr, reqs = requirements, gwConv = gatewayConvention) => {
    setIsCalculating(true);
    try {
      const res = await API.calculateVLSM(ip, Number(cidr), reqs, { gatewayPosition: gwConv });
      setCalculationResult(res);
      if (res.success) {
        toast.success('VLSM allocation completed successfully.');
      } else {
        toast.error(res.error || 'Calculation failed. Check inputs.');
      }
    } catch (err) {
      toast.error('Calculation error: ' + err.message);
    } finally {
      setIsCalculating(false);
    }
  };

  // Initial calculation on startup
  useEffect(() => {
    runCalculation(baseIp, baseCidr, requirements, gatewayConvention);
  }, []);

  // Load preset scenario
  const handleLoadPreset = (presetKey) => {
    const preset = PRESET_DATA[presetKey];
    if (!preset) return;
    setBaseIp(preset.baseNetwork);
    setBaseCidr(preset.cidr);
    setRequirements(preset.requirements);
    setActiveProject({ id: `proj-${presetKey}`, name: preset.name });
    runCalculation(preset.baseNetwork, preset.cidr, preset.requirements, gatewayConvention);
    toast.info(`Loaded preset: "${preset.name}"`);
  };

  // Inspect subnet
  const handleSelectSubnet = (subnetId) => {
    if (!calculationResult || !calculationResult.subnets) return;
    const sub = calculationResult.subnets.find(s => s.id === subnetId);
    if (sub) {
      setSelectedSubnet(sub);
    }
  };

  // "Explain Design"
  const handleExplain = async () => {
    if (!calculationResult || !calculationResult.success) {
      toast.warning('Calculate a network first to generate an explanation.');
      return;
    }
    try {
      const res = await API.explainDesign(calculationResult);
      if (res.success && res.explanation) {
        setExplanationData(res.explanation);
      }
    } catch (err) {
      toast.error('Failed to generate explanation: ' + err.message);
    }
  };

  // Export CSV
  const handleExportCsv = async (customGateways = {}) => {
    if (!calculationResult || !calculationResult.subnets) {
      toast.warning('No active address plan to export.');
      return;
    }
    try {
      const subnetsWithCustomGateways = calculationResult.subnets.map(s => ({
        ...s,
        gateway: customGateways[s.id] || s.gateway || s.firstHost
      }));
      await API.exportCSV(subnetsWithCustomGateways, calculationResult.baseNetwork);
      toast.success('Address plan exported as CSV.');
    } catch (err) {
      toast.error('Failed to export CSV: ' + err.message);
    }
  };

  // Save Project to SQLite
  const handleSaveProject = async () => {
    try {
      const projData = {
        id: activeProject.id || `proj-${Date.now()}`,
        name: activeProject.name || 'Custom Network Design',
        baseNetwork: baseIp,
        cidr: baseCidr,
        gatewayConvention,
        description: 'Saved from Network Designer',
        requirements
      };
      const res = await API.saveProject(projData);
      if (res.success) {
        toast.success(`Project "${projData.name}" saved to database.`);
      }
    } catch (err) {
      toast.error('Failed to save project: ' + err.message);
    }
  };

  // Load project from History
  const handleLoadProjectFromHistory = async (projId) => {
    try {
      const res = await API.getProject(projId);
      if (res.success && res.data) {
        const { project, requirements: reqs } = res.data;
        setBaseIp(project.baseNetwork);
        setBaseCidr(project.cidr);
        setRequirements(reqs);
        setActiveProject({ id: project.id, name: project.name });
        setCurrentTab('designer');
        runCalculation(project.baseNetwork, project.cidr, reqs, project.gatewayConvention || 'first');
        toast.success(`Opened project: "${project.name}"`);
      }
    } catch (err) {
      toast.error('Failed to open project: ' + err.message);
    }
  };

  return html`
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      
      <!-- Toast Container -->
      <${ToastContainer} />

      <!-- Subnet Detail Modal -->
      ${selectedSubnet && html`
        <${SubnetDetailModal}
          subnet=${selectedSubnet}
          onClose=${() => setSelectedSubnet(null)}
        />
      `}

      <!-- Explain Design Modal -->
      ${explanationData && html`
        <${ExplainModal}
          explanation=${explanationData}
          onClose=${() => setExplanationData(null)}
        />
      `}

      <!-- Left Sidebar Navigation -->
      <${Sidebar}
        currentTab=${currentTab}
        onNavigate=${setCurrentTab}
        isOpen=${mobileNavOpen}
        onClose=${() => setMobileNavOpen(false)}
      />

      <!-- Main Workspace -->
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        
        <!-- Top App Header -->
        <${Header}
          currentTab=${currentTab}
          baseIp=${baseIp}
          baseCidr=${baseCidr}
          onToggleMobileNav=${() => setMobileNavOpen(!mobileNavOpen)}
          onExplain=${handleExplain}
          calculationResult=${calculationResult}
        />

        <!-- Page Content View -->
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          ${currentTab === 'dashboard' && html`
            <${DashboardView}
              activeProject=${activeProject}
              calculationResult=${calculationResult}
              onNavigate=${setCurrentTab}
              onSelectSubnet=${handleSelectSubnet}
              onLoadPreset=${handleLoadPreset}
            />
          `}

          ${currentTab === 'designer' && html`
            <${DesignerView}
              baseIp=${baseIp}
              setBaseIp=${setBaseIp}
              baseCidr=${baseCidr}
              setBaseCidr=${setBaseCidr}
              requirements=${requirements}
              setRequirements=${setRequirements}
              calculationResult=${calculationResult}
              onCalculate=${() => runCalculation()}
              isCalculating=${isCalculating}
              onSelectSubnet=${handleSelectSubnet}
              onExplain=${handleExplain}
              onExportCsv=${() => handleExportCsv()}
              onSaveProject=${handleSaveProject}
              onLoadPreset=${handleLoadPreset}
            />
          `}

          ${currentTab === 'vlsmCalc' && html`
            <${VlsmCalcView}
              onSelectSubnet=${handleSelectSubnet}
            />
          `}

          ${currentTab === 'cidrCalc' && html`
            <${CidrCalcView} />
          `}

          ${currentTab === 'subnetMap' && html`
            <${SubnetMapView}
              calculationResult=${calculationResult}
              onSelectSubnet=${handleSelectSubnet}
              onNavigate=${setCurrentTab}
            />
          `}

          ${currentTab === 'addressPlan' && html`
            <${AddressPlanView}
              calculationResult=${calculationResult}
              onExportCsv=${handleExportCsv}
              onNavigate=${setCurrentTab}
            />
          `}

          ${currentTab === 'validation' && html`
            <${ValidationView}
              baseIp=${baseIp}
              baseCidr=${baseCidr}
              requirements=${requirements}
              calculationResult=${calculationResult}
              onNavigate=${setCurrentTab}
            />
          `}

          ${currentTab === 'history' && html`
            <${HistoryView}
              onLoadProject=${handleLoadProjectFromHistory}
              onDuplicateProject=${id => API.duplicateProject(id)}
              onDeleteProject=${id => API.deleteProject(id)}
            />
          `}

          ${currentTab === 'settings' && html`
            <${SettingsView}
              gatewayConvention=${gatewayConvention}
              setGatewayConvention=${setGatewayConvention}
            />
          `}
        </main>

      </div>

    </div>
  `;
}

// Mount React Root
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(App));

})();