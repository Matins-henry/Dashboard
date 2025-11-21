import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Community Store with Zustand
 * Manages posts, filtering, and sorting for the community feed
 */
const useCommunityStore = create(
  persist(
    (set, get) => ({
      // State
      posts: [],
      filter: 'all', // all, my-posts, popular
      tagFilter: 'all', // all, work, personal, study, fitness, trading
      sortBy: 'newest', // newest, oldest, popular

      // Actions
      addPost: (post) => {
        const newPost = {
          id: Date.now().toString(),
          author: 'Matins Henry', // TODO: Get from user context
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MH',
          title: post.title,
          body: post.body,
          tags: post.tags || [],
          likes: 0,
          comments: 0,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ posts: [newPost, ...state.posts] }));
      },

      updatePost: (id, updates) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updates } : post
          ),
        }));
      },

      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },

      likePost: (id) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
          ),
        }));
      },

      setFilter: (filter) => set({ filter }),
      setTagFilter: (tagFilter) => set({ tagFilter }),
      setSortBy: (sortBy) => set({ sortBy }),

      // Computed
      getFilteredPosts: () => {
        const { posts, filter, tagFilter, sortBy } = get();
        let filtered = [...posts];

        // Apply main filter
        if (filter === 'my-posts') {
          filtered = filtered.filter(post => post.author === 'Matins Henry');
        } else if (filter === 'popular') {
          filtered = filtered.filter(post => post.likes > 0);
        }

        // Apply tag filter
        if (tagFilter !== 'all') {
          filtered = filtered.filter(post => 
            post.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase())
          );
        }

        // Apply sorting
        filtered.sort((a, b) => {
          if (sortBy === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (sortBy === 'oldest') {
            return new Date(a.createdAt) - new Date(b.createdAt);
          } else if (sortBy === 'popular') {
            return b.likes - a.likes;
          }
          return 0;
        });

        return filtered;
      },

      getStats: () => {
        const { posts } = get();
        return {
          total: posts.length,
          myPosts: posts.filter(p => p.author === 'Matins Henry').length,
          totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
          totalComments: posts.reduce((sum, p) => sum + p.comments, 0),
        };
      },
    }),
    {
      name: 'lifeboard-community',
    }
  )
);

export default useCommunityStore;
