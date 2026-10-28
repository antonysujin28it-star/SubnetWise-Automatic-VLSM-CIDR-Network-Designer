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
