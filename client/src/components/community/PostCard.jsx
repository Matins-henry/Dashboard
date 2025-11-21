import { Heart, MessageCircle, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import useCommunityStore from '../../store/useCommunityStore';

export default function PostCard({ post }) {
  const { likePost, deletePost } = useCommunityStore();
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      likePost(post.id);
      setLiked(true);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
    setShowMenu(false);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diff = now - postDate;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="group relative bg-white/[0.03] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.08] rounded-2xl p-6 transition-all duration-300">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/[0.02] group-hover:to-transparent rounded-2xl transition-all duration-500 pointer-events-none" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <img
              src={post.avatar}
              alt={post.author}
              className="w-10 h-10 rounded-full border-2 border-white/[0.06]"
            />
            
            <div>
              <h3 className="text-sm font-semibold text-white">
                {post.author}
              </h3>
              <p className="text-xs text-zinc-500">
                {formatTimestamp(post.createdAt)}
              </p>
            </div>
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
            >
              <MoreVertical size={16} className="text-zinc-400" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-10 z-20 w-40 bg-[#18181b] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Trash2 size={14} />
                    Delete Post
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-white mb-2 tracking-tight">
          {post.title}
        </h2>

        {/* Body */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-4">
          {post.body}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-lg border border-emerald-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
          <button
            onClick={handleLike}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300
              ${liked
                ? 'text-red-400 bg-red-500/10 border border-red-500/20'
                : 'text-zinc-400 hover:text-red-400 hover:bg-red-500/5'
              }
            `}
          >
            <Heart size={16} className={liked ? 'fill-current' : ''} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300">
            <MessageCircle size={16} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
