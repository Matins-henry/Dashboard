import { TrendingUp, ArrowUpRight, CheckCircle2, Circle, AlertTriangle, Activity as ActivityIcon, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import useTodoStore from "../store/useTodoStore";
import useActivityStore from "../store/useActivityStore";
import QuickActions from "../components/QuickActions";

export default function Dashboard() {
  const todoStats = useTodoStore((state) => state.getStats()) || { total: 0, completed: 0, active: 0, highPriority: 0, overdue: 0 };
  const activityStats = useActivityStore((state) => state.getStats()) || { total: 0, today: 0, week: 0, totalHours: 0 };
  const recentActivities = useActivityStore((state) => state.getRecentActivities(3)) || [];
  
  const stats = [
    { label: "Total Tasks", value: (todoStats.total || 0).toString(), icon: Circle, color: "text-zinc-400", link: "/todo" },
    { label: "Completed", value: (todoStats.completed || 0).toString(), icon: CheckCircle2, color: "text-emerald-400", link: "/todo" },
    { label: "Activities Today", value: (activityStats.today || 0).toString(), icon: ActivityIcon, color: "text-blue-400", link: "/activities" },
    { label: "Hours Logged", value: `${activityStats.totalHours || 0}h`, icon: Clock, color: "text-purple-400", link: "/activities" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header - Premium */}
      <div className="flex items-start justify-between">
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
      </div>

      {/* Stats Grid - Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/10 rounded-2xl p-6 transition-all duration-300 block"
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
                
                <h3 className="text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
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
            
            {recentActivities.length === 0 ? (
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <ActivityIcon size={24} className="text-zinc-600" strokeWidth={2} />
                  </div>
                  <p className="text-zinc-400 text-sm">No activities logged yet</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-4 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] rounded-xl transition-all duration-300"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1">
                        {new Date(activity.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        {activity.duration > 0 && ` • ${Math.round(activity.duration / 60 * 10) / 10}h`}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-zinc-400 capitalize px-2 py-1 bg-white/[0.03] rounded-lg">
                      {activity.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
