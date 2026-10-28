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
