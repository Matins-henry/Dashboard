import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Premium Todo Store with Zustand
 * Features: CRUD operations, filtering, sorting, statistics
 */
const useTodoStore = create(
  persist(
    (set, get) => ({
      // State
      tasks: [],
      filter: 'all', // all, active, completed
      sortBy: 'createdAt', // createdAt, dueDate, priority

      // Actions
      addTask: (task) => {
        const newTask = {
          id: Date.now().toString(),
          title: task.title,
          description: task.description || '',
          priority: task.priority || 'medium',
          dueDate: task.dueDate || null,
          tags: task.tags || [],
          completed: false,
          createdAt: new Date().toISOString(),
          completedAt: null,
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },

      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  completedAt: !task.completed ? new Date().toISOString() : null,
                }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      setFilter: (filter) => set({ filter }),

      setSortBy: (sortBy) => set({ sortBy }),

      // Computed values
      getFilteredTasks: () => {
        const { tasks, filter, sortBy } = get();
        
        // Filter
        let filtered = tasks;
        if (filter === 'active') {
          filtered = tasks.filter((task) => !task.completed);
        } else if (filter === 'completed') {
          filtered = tasks.filter((task) => task.completed);
        }

        // Sort
        filtered.sort((a, b) => {
          if (sortBy === 'dueDate') {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
          } else if (sortBy === 'priority') {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return filtered;
      },

      getStats: () => {
        const { tasks } = get();
        const total = tasks.length;
        const completed = tasks.filter((task) => task.completed).length;
        const active = total - completed;
        const highPriority = tasks.filter(
          (task) => task.priority === 'high' && !task.completed
        ).length;
        const overdue = tasks.filter((task) => {
          if (task.completed || !task.dueDate) return false;
          return new Date(task.dueDate) < new Date();
        }).length;

        return { total, completed, active, highPriority, overdue };
      },
    }),
    {
      name: 'lifeboard-todos',
    }
  )
);

export default useTodoStore;
