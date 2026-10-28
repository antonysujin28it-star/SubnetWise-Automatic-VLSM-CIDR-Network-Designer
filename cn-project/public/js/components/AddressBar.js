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
