import { Calendar, Flag, Tag, Trash2, MoreVertical, Edit2 } from 'lucide-react';
import { useState } from 'react';
import useTodoStore from '../store/useTodoStore';

const PRIORITY_STYLES = {
  low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  high: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTodoStore();
  const [showMenu, setShowMenu] = useState(false);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`
        group relative
        bg-white/[0.03] hover:bg-white/[0.05]
        border border-white/[0.06] hover:border-white/10
        rounded-2xl p-5
        transition-all duration-300
        ${task.completed ? 'opacity-60' : ''}
      `}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500 pointer-events-none" />

      <div className="relative flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => toggleTask(task.id)}
          className="mt-1 flex-shrink-0"
        >
          <div
            className={`
              w-5 h-5 rounded-lg border-2 
              flex items-center justify-center
              transition-all duration-300
              ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-zinc-600 hover:border-emerald-500'
              }
            `}
          >
            {task.completed && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className={`
              text-[15px] font-semibold tracking-tight
              transition-all duration-300
              ${task.completed ? 'line-through text-zinc-500' : 'text-white'}
            `}
          >
            {task.title}
          </h3>

          {/* Description */}
          {task.description && (
            <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Priority */}
            <div
              className={`
                flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border
                ${PRIORITY_STYLES[task.priority]}
              `}
            >
              <Flag size={12} />
              <span className="capitalize">{task.priority}</span>
            </div>

            {/* Due date */}
            {task.dueDate && (
              <div
                className={`
                  flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
                  ${
                    isOverdue
                      ? 'text-red-400 bg-red-500/10 border border-red-500/20'
                      : 'text-zinc-400 bg-white/[0.03] border border-white/[0.06]'
                  }
                `}
              >
                <Calendar size={12} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}

            {/* Tags */}
            {task.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06]"
              >
                <Tag size={12} />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={16} className="text-zinc-400" />
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-10 z-20 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <button
                  onClick={() => {
                    // Edit functionality - to be implemented
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-2"
                >
                  <Edit2 size={14} />
                  Edit Task
                </button>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete Task
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
