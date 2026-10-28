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
