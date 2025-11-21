import { useState } from 'react';
import { Download, X, FileJson, FileText, Database, Check } from 'lucide-react';
import useTodoStore from '../../store/useTodoStore';
import useActivityStore from '../../store/useActivityStore';
import useCommunityStore from '../../store/useCommunityStore';
import useMessageStore from '../../store/useMessageStore';

/**
 * Export Data Modal
 * Export all user data in JSON or CSV format
 */
export default function ExportDataModal({ onClose }) {
  const [format, setFormat] = useState('json');
  const [selectedData, setSelectedData] = useState({
    tasks: true,
    activities: true,
    posts: true,
    messages: true,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const tasks = useTodoStore((state) => state.tasks);
  const activities = useActivityStore((state) => state.activities);
  const posts = useCommunityStore((state) => state.posts);
  const conversations = useMessageStore((state) => state.conversations);

  const handleToggleData = (key) => {
    setSelectedData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExport = async () => {
    setIsExporting(true);

    // Gather selected data
    const exportData = {};
    if (selectedData.tasks) exportData.tasks = tasks;
    if (selectedData.activities) exportData.activities = activities;
    if (selectedData.posts) exportData.posts = posts;
    if (selectedData.messages) exportData.conversations = conversations;

    // Add metadata
    const dataWithMeta = {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      data: exportData,
    };

    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (format === 'json') {
      // Export as JSON
      const blob = new Blob([JSON.stringify(dataWithMeta, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lifeboard-export-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Export as CSV (simplified - tasks only for demo)
      let csv = 'Type,Title,Status,Date\n';
      
      if (selectedData.tasks) {
        tasks.forEach(task => {
          csv += `Task,"${task.title}",${task.completed ? 'Completed' : 'Pending'},${task.createdAt}\n`;
        });
      }
      
      if (selectedData.activities) {
        activities.forEach(activity => {
          csv += `Activity,"${activity.title}",${activity.category},${activity.date}\n`;
        });
      }

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lifeboard-export-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    setIsExporting(false);
    setExportComplete(true);

    // Auto close after success
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const dataOptions = [
    { key: 'tasks', label: 'Tasks', count: tasks.length, icon: Check },
    { key: 'activities', label: 'Activities', count: activities.length, icon: Database },
    { key: 'posts', label: 'Community Posts', count: posts.length, icon: FileText },
    { key: 'messages', label: 'Messages', count: conversations.length, icon: FileJson },
  ];

  const totalSelected = Object.values(selectedData).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#18181b] border border-white/[0.1] rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Download size={20} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Export Your Data
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Download all your data in {format.toUpperCase()} format
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
          >
            <X size={20} className="text-zinc-400" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-white mb-3 block">
            Export Format
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setFormat('json')}
              className={`
                flex-1 p-4 rounded-xl border transition-all duration-300
                ${format === 'json'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:bg-white/[0.04]'
                }
              `}
            >
              <FileJson size={24} className="mx-auto mb-2" />
              <p className="text-sm font-medium">JSON</p>
              <p className="text-xs opacity-60 mt-1">Complete data</p>
            </button>
            <button
              onClick={() => setFormat('csv')}
              className={`
                flex-1 p-4 rounded-xl border transition-all duration-300
                ${format === 'csv'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:bg-white/[0.04]'
                }
              `}
            >
              <FileText size={24} className="mx-auto mb-2" />
              <p className="text-sm font-medium">CSV</p>
              <p className="text-xs opacity-60 mt-1">Spreadsheet</p>
            </button>
          </div>
        </div>

        {/* Data Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-white mb-3 block">
            Select Data to Export ({totalSelected} selected)
          </label>
          <div className="space-y-2">
            {dataOptions.map(({ key, label, count, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleToggleData(key)}
                className={`
                  w-full p-3 rounded-xl border transition-all duration-300 flex items-center justify-between
                  ${selectedData[key]
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={selectedData[key] ? 'text-emerald-400' : 'text-zinc-400'} />
                  <span className={`text-sm font-medium ${selectedData[key] ? 'text-white' : 'text-zinc-400'}`}>
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">
                    {count} items
                  </span>
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
                    ${selectedData[key]
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-white/[0.2]'
                    }
                  `}>
                    {selectedData[key] && <Check size={12} className="text-white" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="
              flex-1 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05]
              text-zinc-300 border border-white/[0.06] hover:border-white/[0.08]
              rounded-xl font-medium transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || totalSelected === 0 || exportComplete}
            className={`
              flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300
              flex items-center justify-center gap-2
              ${isExporting || totalSelected === 0 || exportComplete
                ? 'bg-white/[0.03] text-zinc-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              }
            `}
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Exporting...
              </>
            ) : exportComplete ? (
              <>
                <Check size={18} />
                Exported!
              </>
            ) : (
              <>
                <Download size={18} />
                Export Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
