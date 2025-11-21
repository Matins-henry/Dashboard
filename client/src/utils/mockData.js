/**
 * Mock Data Generator for Analytics Demo
 * Creates realistic sample data to showcase charts
 */

export function generateMockTasks() {
  const now = new Date();
  const tasks = [];
  
  // Generate tasks for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random number of tasks per day (0-5)
    const tasksPerDay = Math.floor(Math.random() * 6);
    
    for (let j = 0; j < tasksPerDay; j++) {
      const isCompleted = Math.random() > 0.3; // 70% completion rate
      const priority = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];
      
      tasks.push({
        id: `mock-task-${i}-${j}`,
        title: getMockTaskTitle(),
        description: 'Sample task description',
        priority,
        dueDate: new Date(date.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['Work', 'Important'].slice(0, Math.floor(Math.random() * 2) + 1),
        completed: isCompleted,
        createdAt: date.toISOString(),
        completedAt: isCompleted ? new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000).toISOString() : null,
      });
    }
  }
  
  return tasks;
}

export function generateMockActivities() {
  const now = new Date();
  const activities = [];
  const categories = ['work', 'study', 'fitness', 'trading', 'personal'];
  
  // Generate activities for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random number of activities per day (1-4)
    const activitiesPerDay = Math.floor(Math.random() * 4) + 1;
    
    for (let j = 0; j < activitiesPerDay; j++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const duration = [30, 45, 60, 90, 120][Math.floor(Math.random() * 5)];
      
      activities.push({
        id: `mock-activity-${i}-${j}`,
        title: getMockActivityTitle(category),
        description: 'Sample activity description',
        category,
        date: new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        duration,
        tags: ['Productive', 'Focus'].slice(0, Math.floor(Math.random() * 2) + 1),
        createdAt: date.toISOString(),
      });
    }
  }
  
  return activities;
}

function getMockTaskTitle() {
  const titles = [
    'Review pull requests',
    'Update documentation',
    'Fix bug in authentication',
    'Design new feature',
    'Write unit tests',
    'Refactor codebase',
    'Client meeting preparation',
    'Code review session',
    'Deploy to production',
    'Update dependencies',
    'Research new technology',
    'Plan sprint tasks',
    'Write blog post',
    'Optimize performance',
    'Security audit',
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getMockActivityTitle(category) {
  const titles = {
    work: [
      'Deep work session',
      'Team standup meeting',
      'Client presentation',
      'Code review',
      'Project planning',
    ],
    study: [
      'React documentation',
      'Algorithm practice',
      'Online course',
      'Reading technical book',
      'Tutorial completion',
    ],
    fitness: [
      'Morning run',
      'Gym workout',
      'Yoga session',
      'Swimming',
      'Cycling',
    ],
    trading: [
      'Market analysis',
      'Portfolio review',
      'Trading session',
      'Research stocks',
      'Strategy planning',
    ],
    personal: [
      'Meditation',
      'Journaling',
      'Family time',
      'Hobby project',
      'Reading',
    ],
  };
  
  const categoryTitles = titles[category] || titles.personal;
  return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
}
