/**
 * Seed Data Utility
 * Initializes stores with mock data if they're empty
 */

import { mockTasks, mockActivities } from '../services/mockData';
import useTodoStore from '../store/useTodoStore';
import useActivityStore from '../store/useActivityStore';

/**
 * Seed stores with mock data if empty
 */
export const seedStoresIfEmpty = () => {
  const todoStore = useTodoStore.getState();
  const activityStore = useActivityStore.getState();

  // Seed todos if empty
  if (todoStore.tasks.length === 0) {
    console.log('📝 Seeding todo store with mock data...');
    mockTasks.forEach((task) => {
      todoStore.addTask({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        tags: task.tags,
      });
    });
  }

  // Seed activities if empty
  if (activityStore.activities.length === 0) {
    console.log('📅 Seeding activity store with mock data...');
    mockActivities.forEach((activity) => {
      activityStore.addActivity({
        title: activity.title,
        description: activity.description,
        category: activity.type === 'meeting' ? 'work' : activity.type,
        date: activity.date,
        duration: activity.duration,
        tags: [activity.type],
      });
    });
  }
};

/**
 * Reset stores and reseed with mock data
 */
export const resetAndReseedStores = () => {
  const todoStore = useTodoStore.getState();
  const activityStore = useActivityStore.getState();

  // Clear existing data
  todoStore.tasks.forEach((task) => todoStore.deleteTask(task.id));
  activityStore.activities.forEach((activity) => activityStore.deleteActivity(activity.id));

  // Reseed
  seedStoresIfEmpty();
};
