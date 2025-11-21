import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, Activity, Clock, Target, BarChart3, PieChart, Calendar, Sparkles, Download, Zap } from 'lucide-react';
import { 
  BarChart, Bar, PieChart as RechartsPie, Pie, LineChart, Line, AreaChart, Area,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar 
} from 'recharts';
import useTodoStore from '../store/useTodoStore';
import useActivityStore from '../store/useActivityStore';
import usePreferencesStore from '../store/usePreferencesStore';
import {
  getWeeklyTaskStats,
  getCategoryBreakdown,
  getTimelineData,
  getPriorityDistribution,
  getRecentEvents,
  getSummaryKPIs,
} from '../utils/analyticsHelpers';
import { generateMockTasks, generateMockActivities } from '../utils/mockData';
import { createStaggerContainer, fadeInUp, scaleIn } from '../utils/motionPresets';

const TIME_PERIODS = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'all', label: 'All Time' },
];

export default function Analytics() {
  const [period, setPeriod] = useState('week');
  const [useMockData, setUseMockData] = useState(false);
  const darkMode = usePreferencesStore((state) => state.appearance.darkMode);
  
  // Get raw data from stores
  let tasks = useTodoStore((state) => state.tasks) || [];
  let activities = useActivityStore((state) => state.activities) || [];
  
  // Use mock data if enabled or if no real data exists
  const hasNoData = tasks.length === 0 && activities.length === 0;
  if (useMockData || hasNoData) {
    tasks = generateMockTasks();
    activities = generateMockActivities();
  }
  
  // Process data with helper functions
  const kpis = getSummaryKPIs(tasks, activities, period);
  const taskStats = getWeeklyTaskStats(tasks, period === 'today' ? 1 : period === 'week' ? 7 : 30);
  const categoryBreakdown = getCategoryBreakdown(activities);
  const timeline = getTimelineData(activities, period === 'today' ? 1 : period === 'week' ? 7 : 30);
  const priorityDist = getPriorityDistribution(tasks);
  const recentEvents = getRecentEvents(tasks, activities, 5);

  // Theme-aware colors
  const chartColors = {
    grid: darkMode ? '#27272a' : 'rgba(0,0,0,0.08)',
    text: darkMode ? '#a1a1aa' : '#718096',
    textBold: darkMode ? '#e4e4e7' : '#1a1a1a',
    axis: darkMode ? '#27272a' : 'rgba(0,0,0,0.1)',
    tooltip: {
      bg: darkMode ? '#18181b' : '#ffffff',
      border: darkMode ? '#3f3f46' : 'rgba(0,0,0,0.12)',
      text: darkMode ? '#fff' : '#1a1a1a',
    },
    cursor: darkMode ? '#27272a' : 'rgba(0,0,0,0.05)',
  };

  // Animation variants
  const pageContainer = createStaggerContainer(0.05, 0);
  const kpiContainer = createStaggerContainer(0.08, 0.1);
  const chartContainer = createStaggerContainer(0.12, 0.3);

  // Export data function
  const exportAnalytics = () => {
    const data = {
      period,
      kpis,
      taskStats,
      categoryBreakdown,
      timeline,
      priorityDist,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${period}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={pageContainer}
      initial="hidden"
      animate="show"
    >
      {/* Header with Filter */}
      <motion.div 
        className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-4"
        variants={fadeInUp}
      >
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex flex-wrap items-center gap-2 sm:gap-3">
            Analytics
            {(useMockData || hasNoData) && (
              <span className="text-xs sm:text-sm font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 sm:px-3 py-1 rounded-lg flex items-center gap-1.5 sm:gap-2">
                <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" />
                Demo Data
              </span>
            )}
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-[15px]">
            Visual insights into your productivity
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 w-full lg:w-auto">
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Export Button */}
            <motion.button
              onClick={exportAnalytics}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05] hover:text-white hover:border-emerald-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export</span>
            </motion.button>

            {/* Mock Data Toggle */}
            {!hasNoData && (
              <button
                onClick={() => setUseMockData(!useMockData)}
                className={`
                  flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2
                  ${useMockData
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
                  }
                `}
              >
                <Sparkles size={14} />
                <span className="hidden sm:inline">Demo</span>
              </button>
            )}
          </div>
          
          {/* Time Period Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
            {TIME_PERIODS.map((tp) => (
              <button
                key={tp.value}
                onClick={() => setPeriod(tp.value)}
                className={`
                  flex-shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${period === tp.value
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
                  }
                `}
              >
                {tp.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Summary KPIs */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={kpiContainer}
      >
        <KPICard
          icon={CheckCircle2}
          label="Tasks Completed"
          value={kpis.completedTasks}
          subtitle={`${kpis.completionRate}% completion rate`}
          color="text-emerald-400"
        />
        <KPICard
          icon={Activity}
          label="Activities Logged"
          value={kpis.totalActivities}
          subtitle={`${kpis.totalHours}h total time`}
          color="text-blue-400"
        />
        <KPICard
          icon={Clock}
          label="Total Hours"
          value={`${kpis.totalHours}h`}
          subtitle={`Across ${kpis.totalActivities} activities`}
          color="text-purple-400"
        />
        <KPICard
          icon={Target}
          label="Most Active"
          value={kpis.mostActiveCategory}
          subtitle="Top category"
          color="text-orange-400"
        />
      </motion.div>

      {/* Charts Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={chartContainer}
      >
        {/* Task Completion Chart */}
        <ChartCard
          title="Task Completion Trend"
          icon={BarChart3}
          isEmpty={taskStats.every(d => d.completed === 0 && d.created === 0)}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskStats} barGap={8}>
              <defs>
                <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="createdGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} strokeOpacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke={chartColors.text} 
                style={{ fontSize: '12px', fontWeight: '500' }}
                tick={{ fill: chartColors.text }}
                axisLine={{ stroke: chartColors.axis }}
              />
              <YAxis 
                stroke={chartColors.text} 
                style={{ fontSize: '12px', fontWeight: '500' }}
                tick={{ fill: chartColors.text }}
                axisLine={{ stroke: chartColors.axis }}
              />
              <Tooltip
                cursor={{ fill: chartColors.cursor, opacity: 0.3 }}
                contentStyle={{
                  backgroundColor: chartColors.tooltip.bg,
                  border: `1px solid ${chartColors.tooltip.border}`,
                  borderRadius: '12px',
                  color: chartColors.tooltip.text,
                  boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.15)',
                  padding: '12px',
                }}
                labelStyle={{ color: chartColors.textBold, fontWeight: '600', marginBottom: '8px' }}
                itemStyle={{ color: chartColors.text, padding: '4px 0' }}
              />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '12px', 
                  color: '#a1a1aa',
                  paddingTop: '20px',
                  fontWeight: '500'
                }} 
                iconType="circle"
              />
              <Bar 
                dataKey="completed" 
                fill="url(#completedGradient)" 
                name="Completed" 
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
                animationBegin={0}
              />
              <Bar 
                dataKey="created" 
                fill="url(#createdGradient)" 
                name="Created" 
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
                animationBegin={200}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Category Breakdown */}
        <ChartCard
          title="Activities by Category"
          icon={PieChart}
          isEmpty={categoryBreakdown.length === 0}
        >
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <defs>
                {categoryBreakdown.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={110}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={3}
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#pieGradient-${index})`}
                    stroke="#18181b"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltip.bg,
                  border: `1px solid ${chartColors.tooltip.border}`,
                  borderRadius: '12px',
                  color: chartColors.tooltip.text,
                  boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.15)',
                  padding: '12px',
                }}
                itemStyle={{ color: chartColors.textBold, fontWeight: '600' }}
              />
            </RechartsPie>
          </ResponsiveContainer>
        </ChartCard>

        {/* Activity Timeline */}
        <ChartCard
          title="Activity Timeline"
          icon={Calendar}
          isEmpty={timeline.every(d => d.hours === 0)}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeline}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                  <stop offset="50%" stopColor="#34d399" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} strokeOpacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke={chartColors.text} 
                style={{ fontSize: '12px', fontWeight: '500' }}
                tick={{ fill: chartColors.text }}
                axisLine={{ stroke: chartColors.axis }}
              />
              <YAxis 
                stroke={chartColors.text} 
                style={{ fontSize: '12px', fontWeight: '500' }}
                tick={{ fill: chartColors.text }}
                axisLine={{ stroke: chartColors.axis }}
                label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: chartColors.text, fontSize: 12 }}
              />
              <Tooltip
                cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{
                  backgroundColor: chartColors.tooltip.bg,
                  border: `1px solid ${chartColors.tooltip.border}`,
                  borderRadius: '12px',
                  color: chartColors.tooltip.text,
                  boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.15)',
                  padding: '12px',
                }}
                labelStyle={{ color: chartColors.textBold, fontWeight: '600', marginBottom: '8px' }}
                itemStyle={{ color: '#10b981', fontWeight: '600' }}
              />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '12px', 
                  color: '#a1a1aa',
                  paddingTop: '20px',
                  fontWeight: '500'
                }}
                iconType="circle"
              />
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="hours"
                stroke="url(#lineGradient)"
                strokeWidth={4}
                dot={{ 
                  fill: '#10b981', 
                  r: 6, 
                  strokeWidth: 3, 
                  stroke: '#18181b',
                  filter: 'url(#glow)'
                }}
                activeDot={{ 
                  r: 8, 
                  fill: '#10b981',
                  stroke: '#18181b',
                  strokeWidth: 3,
                  filter: 'url(#glow)'
                }}
                name="Hours"
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Priority Distribution */}
        <ChartCard
          title="Task Priority Distribution"
          icon={Target}
          isEmpty={priorityDist.length === 0}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityDist} layout="vertical" barSize={32}>
              <defs>
                <linearGradient id="completedHorizontal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="pendingHorizontal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} strokeOpacity={0.5} horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                stroke={chartColors.text} 
                style={{ fontSize: '12px', fontWeight: '500' }}
                tick={{ fill: chartColors.text }}
                axisLine={{ stroke: chartColors.axis }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke={chartColors.text} 
                style={{ fontSize: '13px', fontWeight: '600' }}
                tick={{ fill: chartColors.textBold }}
                axisLine={{ stroke: chartColors.axis }}
                width={80}
              />
              <Tooltip
                cursor={{ fill: chartColors.cursor, opacity: 0.3 }}
                contentStyle={{
                  backgroundColor: chartColors.tooltip.bg,
                  border: `1px solid ${chartColors.tooltip.border}`,
                  borderRadius: '12px',
                  color: chartColors.tooltip.text,
                  boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.15)',
                  padding: '12px',
                }}
                labelStyle={{ color: chartColors.textBold, fontWeight: '600', marginBottom: '8px' }}
                itemStyle={{ color: chartColors.text, padding: '4px 0' }}
              />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '12px', 
                  color: '#a1a1aa',
                  paddingTop: '20px',
                  fontWeight: '500'
                }}
                iconType="circle"
              />
              <Bar 
                dataKey="completed" 
                fill="url(#completedHorizontal)" 
                name="Completed" 
                radius={[0, 8, 8, 0]}
                animationDuration={1000}
                animationBegin={0}
              />
              <Bar 
                dataKey="pending" 
                fill="url(#pendingHorizontal)" 
                name="Pending" 
                radius={[0, 8, 8, 0]}
                animationDuration={1000}
                animationBegin={200}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div 
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
        variants={fadeInUp}
      >
        <h2 className="text-xl font-semibold text-white mb-6 tracking-tight flex items-center gap-2">
          <TrendingUp size={20} className="text-emerald-400" />
          Recent Events
        </h2>
        
        {recentEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
              <Activity size={24} className="text-zinc-600" />
            </div>
            <p className="text-zinc-400 text-sm">No events yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="flex items-start gap-4 p-4 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] rounded-xl transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + (index * 0.1),
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ x: 4, scale: 1.01 }}
              >
                <div className={`w-2 h-2 mt-2 rounded-full ${event.type === 'task' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {event.type === 'task' ? 'Completed Task' : 'Logged Activity'}: {event.title}
                    </h3>
                    <span className="text-xs text-zinc-500 whitespace-nowrap">
                      {formatTimestamp(event.timestamp)}
                    </span>
                  </div>
                  {event.category && (
                    <p className="text-xs text-zinc-400 mt-1 capitalize">
                      {event.category} {event.duration && `• ${Math.round(event.duration / 60 * 10) / 10}h`}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Helper Components
function KPICard({ icon: Icon, label, value, subtitle, color }) {
  return (
    <motion.div 
      className="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/10 rounded-2xl p-6 transition-all duration-300"
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <p className="text-zinc-500 text-sm font-medium">{label}</p>
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon size={20} className={color} strokeWidth={2} />
          </motion.div>
        </div>
        
        <motion.h3 
          className="text-3xl font-bold text-white tracking-tight mb-1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.h3>
        
        <p className="text-xs text-zinc-600">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function ChartCard({ title, icon: Icon, children, isEmpty }) {
  return (
    <motion.div 
      className="group relative bg-white/[0.03] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.08] rounded-2xl p-6 transition-all duration-500"
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/[0.02] group-hover:to-transparent rounded-2xl transition-all duration-500 pointer-events-none" />
      
      <div className="relative">
        <h2 className="text-lg font-semibold text-white mb-6 tracking-tight flex items-center gap-2">
          <motion.div 
            className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/15 transition-colors duration-300"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon size={18} className="text-emerald-400" />
          </motion.div>
          {title}
        </h2>
        
        {isEmpty ? (
          <motion.div 
            className="h-[300px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <BarChart3 size={24} className="text-zinc-600" />
              </motion.div>
              <motion.p 
                className="text-zinc-400 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                No data available
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Helper Functions
function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ fontSize: '12px', fontWeight: '600' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

function formatTimestamp(timestamp) {
  const now = new Date();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
