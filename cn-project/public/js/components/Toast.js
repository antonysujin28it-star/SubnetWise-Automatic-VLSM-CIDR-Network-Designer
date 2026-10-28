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
