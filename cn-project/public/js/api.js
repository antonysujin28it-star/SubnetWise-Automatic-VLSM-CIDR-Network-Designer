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
