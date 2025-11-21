/**
 * Mock Community Data Generator
 * Creates realistic sample posts for the community feed
 */

const AUTHORS = [
  { name: 'Matins Henry', seed: 'MH' },
  { name: 'Sarah Chen', seed: 'SC' },
  { name: 'Alex Johnson', seed: 'AJ' },
  { name: 'Maya Patel', seed: 'MP' },
  { name: 'David Kim', seed: 'DK' },
  { name: 'Emma Wilson', seed: 'EW' },
  { name: 'James Rodriguez', seed: 'JR' },
  { name: 'Lisa Anderson', seed: 'LA' },
];

const POSTS_DATA = [
  {
    title: 'Completed My First Marathon! 🏃‍♂️',
    body: 'After 6 months of training, I finally completed my first marathon today! The feeling of crossing that finish line was incredible. Time to celebrate and rest those legs!',
    tags: ['Fitness', 'Achievement'],
  },
  {
    title: 'New Trading Strategy Working Well',
    body: 'Been testing a new momentum-based trading strategy for the past 2 weeks. Results are looking promising with a 68% win rate. Still being cautious and keeping position sizes small.',
    tags: ['Trading', 'Reflection'],
  },
  {
    title: 'Finished React Advanced Patterns Course',
    body: 'Just wrapped up the Advanced React Patterns course on Frontend Masters. Learned so much about compound components, render props, and custom hooks. Time to apply these in my projects!',
    tags: ['Study', 'Achievement'],
  },
  {
    title: 'Morning Meditation Routine',
    body: 'Started my day with a 20-minute meditation session. It\'s amazing how much clarity and focus this brings to the rest of my day. Highly recommend starting small if you\'re new to it.',
    tags: ['Personal', 'Reflection'],
  },
  {
    title: 'Launched My Side Project! 🚀',
    body: 'Finally deployed my side project after 3 months of development. It\'s a productivity tool for developers. Would love to get some feedback from the community!',
    tags: ['Work', 'Achievement'],
  },
  {
    title: 'Weekly Fitness Goals',
    body: 'Setting my fitness goals for this week: 5 gym sessions, 10k steps daily, and proper meal prep. Accountability post - let\'s do this!',
    tags: ['Fitness', 'Goal'],
  },
  {
    title: 'Deep Work Session Today',
    body: 'Blocked out 4 hours for deep work this morning. No distractions, just pure focus on building the new feature. Productivity through the roof!',
    tags: ['Work', 'Reflection'],
  },
  {
    title: 'Learning TypeScript',
    body: 'Diving deep into TypeScript this week. The type safety is a game changer for large projects. Wish I had started using it sooner!',
    tags: ['Study', 'Reflection'],
  },
  {
    title: 'Market Analysis: Tech Stocks',
    body: 'Spent the weekend analyzing tech stocks. Some interesting patterns emerging in the semiconductor sector. Keeping a close eye on a few key players.',
    tags: ['Trading', 'Work'],
  },
  {
    title: 'Gratitude Check-In',
    body: 'Taking a moment to appreciate the small wins today. Grateful for good health, supportive friends, and the opportunity to work on things I love.',
    tags: ['Personal', 'Reflection'],
  },
  {
    title: 'Code Review Best Practices',
    body: 'Been improving my code review process. Key learnings: be specific, be kind, focus on the code not the person, and always explain the "why" behind suggestions.',
    tags: ['Work', 'Reflection'],
  },
  {
    title: 'Hit My Savings Goal! 💰',
    body: 'Reached my Q4 savings goal today! Consistency and discipline really pay off. Next goal: building that emergency fund to 6 months.',
    tags: ['Personal', 'Achievement'],
  },
  {
    title: 'Algorithm Practice Streak',
    body: 'Day 30 of solving one algorithm problem daily. The consistency is building real problem-solving skills. LeetCode medium problems are getting easier!',
    tags: ['Study', 'Achievement'],
  },
  {
    title: 'Yoga for Developers',
    body: 'Started incorporating yoga into my routine to combat the desk job posture issues. Already feeling more flexible and less back pain after just 2 weeks.',
    tags: ['Fitness', 'Personal'],
  },
  {
    title: 'Portfolio Rebalancing',
    body: 'Quarterly portfolio review done. Rebalanced allocations and took some profits. Staying disciplined with the investment strategy.',
    tags: ['Trading', 'Reflection'],
  },
];

export function generateMockPosts() {
  const posts = [];
  const now = new Date();

  POSTS_DATA.forEach((postData, index) => {
    // Create posts over the last 14 days
    const daysAgo = Math.floor(index * 14 / POSTS_DATA.length);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - Math.floor(Math.random() * 24));

    // Random author
    const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
    
    // Random likes (0-25)
    const likes = Math.floor(Math.random() * 26);
    
    // Random comments (0-10)
    const comments = Math.floor(Math.random() * 11);

    posts.push({
      id: `mock-${Date.now()}-${index}`,
      author: author.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.seed}`,
      title: postData.title,
      body: postData.body,
      tags: postData.tags,
      likes,
      comments,
      createdAt: date.toISOString(),
    });
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addMockPostsToCommunity(communityStore) {
  const mockPosts = generateMockPosts();
  
  // Add posts to store
  mockPosts.forEach(post => {
    communityStore.getState().posts.push(post);
  });
  
  // Trigger a state update
  communityStore.setState({ posts: [...communityStore.getState().posts] });
}
