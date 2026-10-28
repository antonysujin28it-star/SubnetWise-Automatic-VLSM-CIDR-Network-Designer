const fs = require('fs');

const files = [
  'public/js/icons.js',
  'public/js/api.js',
  'public/js/components/Toast.js',
  'public/js/components/AddressBar.js',
  'public/js/components/BinaryViewer.js',
  'public/js/components/SubnetDetailModal.js',
  'public/js/components/ExplainModal.js',
  'public/js/components/Sidebar.js',
  'public/js/components/Header.js',
  'public/js/views/DashboardView.js',
  'public/js/views/DesignerView.js',
  'public/js/views/VlsmCalcView.js',
  'public/js/views/CidrCalcView.js',
  'public/js/views/SubnetMapView.js',
  'public/js/views/AddressPlanView.js',
  'public/js/views/ValidationView.js',
  'public/js/views/HistoryView.js',
  'public/js/views/SettingsView.js',
  'public/js/app.js'
];

let bundleParts = [
  '// SubnetWise Production Application Bundle',
  'window.html = (window.htm && window.React) ? window.htm.bind(React.createElement) : null;'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  // Strip duplicate top-level bindings if not already wrapped
  bundleParts.push(`\n// --- File: ${f} ---\n(() => {\n${content}\n})();`);
}

fs.writeFileSync('public/js/bundle.js', bundleParts.join('\n'));
console.log('✓ Successfully generated public/js/bundle.js');
