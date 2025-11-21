import { Filter, TrendingUp, User, Hash } from 'lucide-react';
import useCommunityStore from '../../store/useCommunityStore';

const MAIN_FILTERS = [
  { value: 'all', label: 'All Posts', icon: Filter },
  { value: 'my-posts', label: 'My Posts', icon: User },
  { value: 'popular', label: 'Popular', icon: TrendingUp },
];

const TAG_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'study', label: 'Study' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'trading', label: 'Trading' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Popular' },
];

export default function PostFilters() {
  const { filter, tagFilter, sortBy, setFilter, setTagFilter, setSortBy } = useCommunityStore();

  return (
    <div className="space-y-4">
      {/* Main Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-zinc-500 font-medium">Filter:</span>
        {MAIN_FILTERS.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                flex items-center gap-2
                ${filter === f.value
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
                }
              `}
            >
              <Icon size={14} />
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Tag Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Hash size={16} className="text-zinc-500" />
          {TAG_FILTERS.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setTagFilter(tag.value)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                ${tagFilter === tag.value
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
                }
              `}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl
              text-sm text-zinc-300 font-medium
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
              transition-all duration-300
              cursor-pointer
            "
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#18181b]">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
