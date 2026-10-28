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
