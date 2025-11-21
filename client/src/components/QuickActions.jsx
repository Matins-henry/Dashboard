import { useState } from 'react';
import { CheckSquare, Activity, MessageSquare } from 'lucide-react';
import CreateTaskModal from './CreateTaskModal';
import CreateActivityModal from './CreateActivityModal';

/**
 * Quick Actions Component for Dashboard
 * Provides quick access to create tasks, log activities, and create posts
 */
export default function QuickActions() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);

  const actions = [
    {
      id: 'task',
      label: 'Add Task',
      icon: CheckSquare,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      hoverBg: 'hover:bg-blue-500/20',
      onClick: () => setTaskModalOpen(true),
    },
    {
      id: 'activity',
      label: 'Log Activity',
      icon: Activity,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      hoverBg: 'hover:bg-emerald-500/20',
      onClick: () => setActivityModalOpen(true),
    },
    {
      id: 'post',
      label: 'Create Post',
      icon: MessageSquare,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      hoverBg: 'hover:bg-purple-500/20',
      onClick: () => setPostModalOpen(true),
    },
  ];

  return (
    <>
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">
          Quick Actions
        </h2>
        <div className="space-y-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className={`
                  w-full group relative px-4 py-3 
                  ${action.bgColor} ${action.hoverBg}
                  border ${action.borderColor}
                  rounded-xl text-left 
                  transition-all duration-300
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`${action.color}`}>
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <span className={`${action.color} font-medium text-sm transition-colors`}>
                    {action.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <CreateTaskModal isOpen={taskModalOpen} onClose={() => setTaskModalOpen(false)} />
      <CreateActivityModal isOpen={activityModalOpen} onClose={() => setActivityModalOpen(false)} />
      
      {/* Post Modal - Placeholder for now */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setPostModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Create Post</h2>
            <p className="text-zinc-400 mb-6">Community posting feature coming soon!</p>
            <button
              onClick={() => setPostModalOpen(false)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
