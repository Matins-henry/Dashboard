import { TrendingUp, ArrowUpRight, CheckCircle2, Circle, Activity as ActivityIcon, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useTodoStore from "../store/useTodoStore";
import useActivityStore from "../store/useActivityStore";
import QuickActions from "../components/QuickActions";
import { mockRecentActivity, mockTasks, mockActivities } from "../services/mockData";

export default function Dashboard() {
  // Get store data directly, not computed functions
  const todoTasks = useTodoStore((state) => state.tasks) || [];
  const activityList = useActivityStore((state) => state.activities) || [];
  
  // Use mock data if stores are empty
  const tasks = todoTasks.length > 0 ? todoTasks : mockTasks;
  const activities = activityList.length > 0 ? activityList : mockActivities;
  
  // Compute stats from tasks (use mock data if empty)
  const todoStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  };
  
  // Compute activity stats
  const today = new Date().toDateString();
  const activityStats = {
    today: activities.filter(a => new Date(a.date).toDateString() === today).length,
    upcoming: activities.filter(a => a.status === 'upcoming').length,
  };
  
  // Get recent activities
  const recentActivities = [...activities]
    .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))
    .slice(0, 5);
  
  const stats = [
    { label: "Total Tasks", value: todoStats.total.toString(), icon: Circle, color: "text-zinc-400", link: "/todo", trend: "+12%" },
    { label: "Completed", value: todoStats.completed.toString(), icon: CheckCircle2, color: "text-emerald-400", link: "/todo", trend: "+8%" },
    { label: "In Progress", value: todoStats.inProgress.toString(), icon: ActivityIcon, color: "text-blue-400", link: "/todo", trend: "+5%" },
    { label: "Upcoming", value: activityStats.upcoming.toString(), icon: Clock, color: "text-purple-400", link: "/activities", trend: "+3" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page Header - Premium */}
      <motion.div 
        className="flex items-start justify-between"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Overview
          </h1>
          <p className="text-zinc-400 mt-2 text-[15px]">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-500 font-medium">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-xs text-zinc-600 mt-1">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid - Premium Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              <Link
                to={stat.link}
                className="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/10 rounded-2xl p-6 transition-all duration-300 block h-full"
              >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-zinc-500 text-sm font-medium">
                    {stat.label}
                  </p>
                  <Icon size={20} className={stat.color} strokeWidth={2} />
                </div>
                
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-bold text-white tracking-tight">
                    {stat.value}
                  </h3>
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                    <TrendingUp size={12} />
                    {stat.trend}
                  </span>
                </div>
              </div>
            </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Content Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Recent Activities
              </h2>
              <Link 
                to="/activities"
                className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                View all
                <ArrowUpRight size={14} />
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="group flex items-start gap-4 p-4 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/10 rounded-xl transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.5 + (index * 0.1),
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: activity.color + '20' }}
                  >
                    <ActivityIcon size={18} style={{ color: activity.color }} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {activity.date} at {activity.time} • {activity.duration} min
                    </p>
                    {activity.location && (
                      <p className="text-xs text-zinc-600 mt-1">
                        📍 {activity.location}
                      </p>
                    )}
                  </div>
                  <span 
                    className="text-xs font-medium px-2.5 py-1 rounded-lg capitalize"
                    style={{ 
                      backgroundColor: activity.color + '20',
                      color: activity.color
                    }}
                  >
                    {activity.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Content */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <QuickActions />
          
          {/* Activity Feed */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white tracking-tight mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {mockRecentActivity.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <Zap size={14} style={{ color: item.color }} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-400">
                      <span className="text-white font-medium">{item.user}</span>
                      {' '}{item.action}{' '}
                      <span className="text-white">{item.target}</span>
                    </p>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
