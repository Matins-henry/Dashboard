import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, SortAsc, Briefcase, BookOpen, Dumbbell, TrendingUp, User, Activity, BarChart3 } from 'lucide-react';
import useActivityStore from '../store/useActivityStore';
import CreateActivityModal from '../components/CreateActivityModal';
import ActivityItem from '../components/ActivityItem';
import { createStaggerContainer, fadeInUp, scaleIn } from '../utils/motionPresets';

export default function Activities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activities: allActivities, filter, setFilter, sortBy, setSortBy } = useActivityStore();
  
  // Filter activities locally
  let activities = allActivities || [];
  if (filter !== 'all') {
    activities = activities.filter(activity => activity.category === filter);
  }
  
  // Sort activities locally
  activities = [...activities].sort((a, b) => {
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    } else if (sortBy === 'duration') {
      return b.duration - a.duration;
    }
    return new Date(b.date) - new Date(a.date);
  });
  
  // Compute stats locally
  const today = new Date().toDateString();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const stats = {
    total: allActivities.length,
    today: allActivities.filter(a => new Date(a.date).toDateString() === today).length,
    week: allActivities.filter(a => new Date(a.date) >= weekAgo).length,
    totalHours: Math.round(allActivities.reduce((sum, a) => sum + (a.duration || 0), 0) / 60 * 10) / 10,
  };
  
  // Compute chart data locally
  const categoryData = {
    work: 0,
    study: 0,
    fitness: 0,
    trading: 0,
    personal: 0,
  };
  
  allActivities.forEach((activity) => {
    if (categoryData[activity.category] !== undefined) {
      categoryData[activity.category] += activity.duration || 0;
    }
  });
  
  const chartData = Object.entries(categoryData).map(([category, minutes]) => ({
    category,
    hours: Math.round(minutes / 60 * 10) / 10,
    minutes,
  }));

  const FILTERS = [
    { value: 'all', label: 'All', icon: Activity },
    { value: 'work', label: 'Work', icon: Briefcase },
    { value: 'study', label: 'Study', icon: BookOpen },
    { value: 'fitness', label: 'Fitness', icon: Dumbbell },
    { value: 'trading', label: 'Trading', icon: TrendingUp },
    { value: 'personal', label: 'Personal', icon: User },
  ];

  const SORT_OPTIONS = [
    { value: 'date', label: 'Recent' },
    { value: 'category', label: 'Category' },
    { value: 'duration', label: 'Duration' },
  ];

  // Animation variants
  const pageContainer = createStaggerContainer(0.05, 0);
  const statsContainer = createStaggerContainer(0.08, 0.1);
  const listContainer = createStaggerContainer(0.04, 0.4);

  return (
    <motion.div 
      className="space-y-8"
      variants={pageContainer}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div 
        className="flex items-start justify-between"
        variants={fadeInUp}
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Activities
          </h1>
          <p className="text-zinc-400 mt-2 text-[15px]">
            Track your daily activities and progress.
          </p>
        </div>
        
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="
            group relative px-5 py-3
            bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500
            text-white font-semibold
            rounded-xl
            shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40
            transition-all duration-300
            overflow-hidden
          "
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <div className="relative flex items-center gap-2">
            <Plus size={18} strokeWidth={2.5} />
            <span>Log Activity</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={statsContainer}
      >
        <motion.div 
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </motion.div>
        <motion.div 
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">Today</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.today}</p>
        </motion.div>
        <motion.div 
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">This Week</p>
          <p className="text-2xl font-bold text-blue-400">{stats.week}</p>
        </motion.div>
        <motion.div 
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">Total Hours</p>
          <p className="text-2xl font-bold text-purple-400">{stats.totalHours}h</p>
        </motion.div>
      </motion.div>

      {/* Category Chart */}
      <motion.div 
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
        variants={scaleIn}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={20} className="text-emerald-400" />
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Time by Category
          </h2>
        </div>
        
        <div className="space-y-3">
          {chartData.map((item, index) => {
            const maxHours = Math.max(...chartData.map(d => d.hours), 1);
            const percentage = (item.hours / maxHours) * 100;
            
            return (
              <motion.div 
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-zinc-300 capitalize">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {item.hours}h
                  </span>
                </div>
                <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.3 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Filters & Sort */}
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        variants={fadeInUp}
      >
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filterOption) => {
            const Icon = filterOption.icon;
            return (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${
                    filter === filterOption.value
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05]'
                  }
                `}
              >
                <Icon size={16} />
                <span>{filterOption.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <SortAsc size={16} className="text-zinc-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              px-3 py-2 
              bg-white/[0.03] hover:bg-white/[0.05]
              border border-white/[0.06] hover:border-white/10
              text-zinc-300 text-sm font-medium
              rounded-xl outline-none cursor-pointer
              transition-all duration-300
            "
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-zinc-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Activity List */}
      <motion.div 
        className="space-y-3"
        variants={listContainer}
      >
        {activities.length === 0 ? (
          <motion.div 
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-12"
            variants={fadeInUp}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <Activity size={24} className="text-zinc-600" strokeWidth={2} />
              </div>
              <p className="text-zinc-400 text-sm">
                {filter === 'all' 
                  ? 'No activities logged yet. Start tracking your day!' 
                  : `No ${filter} activities found.`}
              </p>
            </div>
          </motion.div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={{
                duration: 0.35,
                delay: 0.4 + index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ x: 4 }}
            >
              <ActivityItem activity={activity} />
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Create Activity Modal */}
      <CreateActivityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}
