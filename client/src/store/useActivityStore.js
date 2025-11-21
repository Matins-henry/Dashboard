import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Premium Activity Store with Zustand
 * Features: CRUD operations, filtering, sorting, statistics, time tracking
 */
const useActivityStore = create(
  persist(
    (set, get) => ({
      // State
      activities: [],
      filter: 'all', // all, work, study, fitness, trading, personal
      sortBy: 'date', // date, category, duration

      // Actions
      addActivity: (activity) => {
        const newActivity = {
          id: Date.now().toString(),
          title: activity.title,
          description: activity.description || '',
          category: activity.category || 'personal',
          date: activity.date || new Date().toISOString(),
          duration: activity.duration || 0, // in minutes
          tags: activity.tags || [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ activities: [newActivity, ...state.activities] }));
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, ...updates } : activity
          ),
        }));
      },

      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        }));
      },

      setFilter: (filter) => set({ filter }),

      setSortBy: (sortBy) => set({ sortBy }),

      // Computed values
      getFilteredActivities: () => {
        const { activities, filter, sortBy } = get();
        
        // Filter
        let filtered = activities;
        if (filter !== 'all') {
          filtered = activities.filter((activity) => activity.category === filter);
        }

        // Sort
        filtered.sort((a, b) => {
          if (sortBy === 'category') {
            return a.category.localeCompare(b.category);
          } else if (sortBy === 'duration') {
            return b.duration - a.duration;
          }
          return new Date(b.date) - new Date(a.date);
        });

        return filtered;
      },

      getStats: () => {
        const { activities } = get();
        const total = activities.length;
        
        // Category breakdown
        const byCategory = {
          work: 0,
          study: 0,
          fitness: 0,
          trading: 0,
          personal: 0,
        };
        
        // Time tracking
        let totalMinutes = 0;
        
        activities.forEach((activity) => {
          if (byCategory[activity.category] !== undefined) {
            byCategory[activity.category]++;
          }
          totalMinutes += activity.duration || 0;
        });

        // Today's activities
        const today = new Date().toDateString();
        const todayCount = activities.filter(
          (activity) => new Date(activity.date).toDateString() === today
        ).length;

        // This week's activities
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekCount = activities.filter(
          (activity) => new Date(activity.date) >= weekAgo
        ).length;

        return {
          total,
          today: todayCount,
          week: weekCount,
          totalHours: Math.round(totalMinutes / 60 * 10) / 10,
          byCategory,
        };
      },

      // Get recent activities for dashboard
      getRecentActivities: (limit = 5) => {
        const { activities } = get();
        return activities
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, limit);
      },

      // Get category chart data
      getCategoryChartData: () => {
        const { activities } = get();
        const categoryData = {
          work: 0,
          study: 0,
          fitness: 0,
          trading: 0,
          personal: 0,
        };

        activities.forEach((activity) => {
          if (categoryData[activity.category] !== undefined) {
            categoryData[activity.category] += activity.duration || 0;
          }
        });

        return Object.entries(categoryData).map(([category, minutes]) => ({
          category,
          hours: Math.round(minutes / 60 * 10) / 10,
          minutes,
        }));
      },
    }),
    {
      name: 'lifeboard-activities',
    }
  )
);

export default useActivityStore;
