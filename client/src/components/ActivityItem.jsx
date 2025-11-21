import { Calendar, Clock, Tag, Trash2, MoreVertical, Edit2, Briefcase, BookOpen, Dumbbell, TrendingUp, User } from 'lucide-react';
import { useState } from 'react';
import useActivityStore from '../store/useActivityStore';

const CATEGORY_CONFIG = {
  work: { icon: Briefcase, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  study: { icon: BookOpen, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  fitness: { icon: Dumbbell, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  trading: { icon: TrendingUp, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  personal: { icon: User, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
};

export default function ActivityItem({ activity }) {
  const { deleteActivity } = useActivityStore();
  const [showMenu, setShowMenu] = useState(false);

  const categoryConfig = CATEGORY_CONFIG[activity.category] || CATEGORY_CONFIG.personal;
  const Icon = categoryConfig.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return null;
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/10 rounded-2xl p-5 transition-all duration-300">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500 pointer-events-none" />

      <div className="relative flex items-start gap-4">
        {/* Category Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${categoryConfig.color} border flex items-center justify-center`}>
          <Icon size={20} strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-[15px] font-semibold text-white tracking-tight">
            {activity.title}
          </h3>

          {/* Description */}
          {activity.description && (
            <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
              {activity.description}
            </p>
          )}

          {/* Meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Date */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06]">
              <Calendar size={12} />
              <span>{formatDate(activity.date)}</span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06]">
              <Clock size={12} />
              <span>{formatTime(activity.date)}</span>
            </div>

            {/* Duration */}
            {activity.duration > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <Clock size={12} />
                <span>{formatDuration(activity.duration)}</span>
              </div>
            )}

            {/* Category badge */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${categoryConfig.color}`}>
              <span className="capitalize">{activity.category}</span>
            </div>

            {/* Tags */}
            {activity.tags.map((tag) => (
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
                  Edit Activity
                </button>
                <button
                  onClick={() => {
                    deleteActivity(activity.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete Activity
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
