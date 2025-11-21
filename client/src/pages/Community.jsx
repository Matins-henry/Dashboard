import { Users, MessageSquare, TrendingUp, Sparkles, Heart, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import useCommunityStore from '../store/useCommunityStore';
import PostComposer from '../components/community/PostComposer';
import PostCard from '../components/community/PostCard';
import PostFilters from '../components/community/PostFilters';
import { mockPosts } from '../services/mockData';

export default function Community() {
  // Get raw data from store
  const { posts, filter, tagFilter, sortBy } = useCommunityStore();
  const [localPosts, setLocalPosts] = useState([]);
  
  // Use mock data if store is empty and transform it to match expected format
  useEffect(() => {
    if (posts.length === 0) {
      // Transform mockPosts to match the expected format
      const transformedPosts = mockPosts.map(post => ({
        id: post.id,
        author: post.author?.name || 'Unknown',
        avatar: post.author?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
        title: post.content?.substring(0, 50) + (post.content?.length > 50 ? '...' : '') || 'Untitled',
        body: post.content || '',
        tags: post.tags || [],
        likes: post.likes || 0,
        comments: post.comments || 0,
        createdAt: post.timestamp || new Date().toISOString(),
      }));
      setLocalPosts(transformedPosts);
    } else {
      setLocalPosts(posts);
    }
  }, [posts]);
  
  // Load mock data function
  const loadMockData = () => {
    const store = useCommunityStore.getState();
    store.posts = [...mockPosts];
    useCommunityStore.setState({ posts: [...mockPosts] });
    setLocalPosts(mockPosts);
  };
  
  // Compute filtered posts locally
  let filteredPosts = [...localPosts];
  
  // Apply main filter
  if (filter === 'my-posts') {
    filteredPosts = filteredPosts.filter(post => post.author?.name === 'Alex Johnson');
  } else if (filter === 'popular') {
    filteredPosts = filteredPosts.filter(post => post.likes > 20);
  }
  
  // Apply tag filter
  if (tagFilter !== 'all') {
    filteredPosts = filteredPosts.filter(post => 
      post.tags?.some(tag => tag.toLowerCase() === tagFilter.toLowerCase())
    );
  }
  
  // Apply sorting
  filteredPosts.sort((a, b) => {
    if (sortBy === 'newest') {
      return b.id - a.id;
    } else if (sortBy === 'oldest') {
      return a.id - b.id;
    } else if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return 0;
  });
  
  // Compute stats locally
  const stats = {
    total: localPosts.length,
    myPosts: localPosts.filter(p => p.author?.name === 'Alex Johnson').length,
    totalLikes: localPosts.reduce((sum, p) => sum + p.likes, 0),
    totalComments: localPosts.reduce((sum, p) => sum + p.comments, 0),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <Users size={36} className="text-emerald-400" />
            Community
          </h1>
          <p className="text-zinc-400 mt-2 text-[15px]">
            Share your thoughts, mini-updates, or daily insights
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-xs text-zinc-500 font-medium">Posts</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-emerald-400 flex items-center gap-1">
              <Heart size={20} fill="currentColor" />
              {stats.totalLikes}
            </p>
            <p className="text-xs text-zinc-500 font-medium">Likes</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-400 flex items-center gap-1">
              <MessageSquare size={20} />
              {stats.totalComments}
            </p>
            <p className="text-xs text-zinc-500 font-medium">Comments</p>
          </div>
        </div>
      </div>

      {/* Post Composer */}
      <PostComposer />

      {/* Filters */}
      <PostFilters />

      {/* Posts Feed */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            <MessageSquare size={20} className="text-emerald-400" />
            Feed
            <span className="text-sm font-medium text-zinc-500">
              ({filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'})
            </span>
          </h2>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <Sparkles size={24} className="text-zinc-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No posts yet
              </h3>
              <p className="text-zinc-400 text-sm">
                Be the first to share your thoughts with the community!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
