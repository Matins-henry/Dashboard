import { useState } from 'react';
import { Send, X } from 'lucide-react';
import useCommunityStore from '../../store/useCommunityStore';

const PRESET_TAGS = ['Work', 'Personal', 'Study', 'Fitness', 'Trading', 'Reflection', 'Achievement', 'Goal'];

export default function PostComposer() {
  const addPost = useCommunityStore((state) => state.addPost);
  
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: [],
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.body.trim()) {
      newErrors.body = 'Post content is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add post
    addPost(formData);

    // Reset form
    setFormData({ title: '', body: '', tags: [] });
    setErrors({});
  };

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">
        Share Your Thoughts
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Post title..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`
              w-full px-4 py-3 bg-white/[0.03] border rounded-xl
              text-white placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
              transition-all duration-300
              ${errors.title ? 'border-red-500/50' : 'border-white/[0.06]'}
            `}
          />
          {errors.title && (
            <p className="text-red-400 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Body */}
        <div>
          <textarea
            placeholder="What's on your mind? Share your thoughts, achievements, or reflections..."
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            rows={4}
            className={`
              w-full px-4 py-3 bg-white/[0.03] border rounded-xl
              text-white placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
              transition-all duration-300 resize-none
              ${errors.body ? 'border-red-500/50' : 'border-white/[0.06]'}
            `}
          />
          {errors.body && (
            <p className="text-red-400 text-xs mt-1">{errors.body}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm text-zinc-400 mb-2 block">
            Add Tags (Optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                  ${formData.tags.includes(tag)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05] hover:text-white'
                  }
                `}
              >
                {tag}
                {formData.tags.includes(tag) && (
                  <X size={12} className="inline ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="
              px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 
              hover:from-emerald-400 hover:to-emerald-500
              text-white font-semibold rounded-xl
              transition-all duration-300
              flex items-center gap-2
              shadow-lg shadow-emerald-500/20
            "
          >
            <Send size={18} />
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
