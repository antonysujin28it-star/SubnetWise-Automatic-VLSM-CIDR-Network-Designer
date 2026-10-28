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
