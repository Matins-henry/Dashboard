/**
 * Analytics Helper Functions
 * Processes raw data from stores into chart-ready formats
 * Keeps components clean and focused on presentation
 */

/**
 * Get task completion stats for a given time period
 */
export function getWeeklyTaskStats(tasks, days = 7) {
  const stats = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    const completed = tasks.filter(task => {
      if (!task.completedAt) return false;
      const completedDate = new Date(task.completedAt);
      return completedDate >= date && completedDate < nextDate;
    }).length;
    
    const created = tasks.filter(task => {
      const createdDate = new Date(task.createdAt);
      return createdDate >= date && createdDate < nextDate;
    }).length;
    
    stats.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed,
      created,
      fullDate: date,
    });
  }
  
  return stats;
}

/**
 * Get activity breakdown by category
 */
export function getCategoryBreakdown(activities) {
  const breakdown = {
    work: { count: 0, duration: 0, color: '#3b82f6' },
    study: { count: 0, duration: 0, color: '#8b5cf6' },
    fitness: { count: 0, duration: 0, color: '#10b981' },
    trading: { count: 0, duration: 0, color: '#f59e0b' },
    personal: { count: 0, duration: 0, color: '#ec4899' },
  };
  
  activities.forEach(activity => {
    if (breakdown[activity.category]) {
      breakdown[activity.category].count++;
      breakdown[activity.category].duration += activity.duration || 0;
    }
  });
  
  return Object.entries(breakdown)
    .map(([category, data]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: data.count,
      hours: Math.round(data.duration / 60 * 10) / 10,
      color: data.color,
    }))
    .filter(item => item.value > 0);
}

/**
 * Get activity timeline data
 */
export function getTimelineData(activities, days = 7) {
  const timeline = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    const dayActivities = activities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate >= date && activityDate < nextDate;
    });
    
    const totalMinutes = dayActivities.reduce((sum, a) => sum + (a.duration || 0), 0);
    
    timeline.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      hours: Math.round(totalMinutes / 60 * 10) / 10,
      count: dayActivities.length,
      fullDate: date,
    });
  }
  
  return timeline;
}

/**
 * Get priority distribution for tasks
 */
export function getPriorityDistribution(tasks) {
  const distribution = {
    high: { count: 0, completed: 0, color: '#ef4444' },
    medium: { count: 0, completed: 0, color: '#f59e0b' },
    low: { count: 0, completed: 0, color: '#3b82f6' },
  };
  
  tasks.forEach(task => {
    if (distribution[task.priority]) {
      distribution[task.priority].count++;
      if (task.completed) {
        distribution[task.priority].completed++;
      }
    }
  });
  
  return Object.entries(distribution)
    .map(([priority, data]) => ({
      name: priority.charAt(0).toUpperCase() + priority.slice(1),
      total: data.count,
      completed: data.completed,
      pending: data.count - data.completed,
      color: data.color,
    }))
    .filter(item => item.total > 0);
}

/**
 * Get recent events (combined tasks and activities)
 */
export function getRecentEvents(tasks, activities, limit = 5) {
  const events = [];
  
  // Add completed tasks
  tasks.forEach(task => {
    if (task.completedAt) {
      events.push({
        id: `task-${task.id}`,
        type: 'task',
        title: task.title,
        timestamp: new Date(task.completedAt),
        icon: 'check',
        color: 'text-emerald-400',
      });
    }
  });
  
  // Add activities
  activities.forEach(activity => {
    events.push({
      id: `activity-${activity.id}`,
      type: 'activity',
      title: activity.title,
      category: activity.category,
      duration: activity.duration,
      timestamp: new Date(activity.date),
      icon: 'activity',
      color: 'text-blue-400',
    });
  });
  
  // Sort by timestamp and limit
  return events
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

/**
 * Get summary KPIs for a time period
 */
export function getSummaryKPIs(tasks, activities, period = 'today') {
  const now = new Date();
  let startDate = new Date();
  
  switch (period) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setDate(now.getDate() - 30);
      break;
    case 'all':
      startDate = new Date(0);
      break;
  }
  
  // Filter data by period
  const periodTasks = tasks.filter(task => {
    const createdDate = new Date(task.createdAt);
    return createdDate >= startDate;
  });
  
  const periodActivities = activities.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate >= startDate;
  });
  
  // Calculate KPIs
  const completedTasks = periodTasks.filter(t => t.completed).length;
  const totalActivities = periodActivities.length;
  const totalHours = Math.round(
    periodActivities.reduce((sum, a) => sum + (a.duration || 0), 0) / 60 * 10
  ) / 10;
  
  // Most active category
  const categoryCount = {};
  periodActivities.forEach(activity => {
    categoryCount[activity.category] = (categoryCount[activity.category] || 0) + 1;
  });
  
  const mostActiveCategory = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  
  return {
    completedTasks,
    totalTasks: periodTasks.length,
    totalActivities,
    totalHours,
    mostActiveCategory: mostActiveCategory.charAt(0).toUpperCase() + mostActiveCategory.slice(1),
    completionRate: periodTasks.length > 0 
      ? Math.round((completedTasks / periodTasks.length) * 100) 
      : 0,
  };
}
