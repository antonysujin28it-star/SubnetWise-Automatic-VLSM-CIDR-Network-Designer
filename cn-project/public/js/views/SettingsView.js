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
