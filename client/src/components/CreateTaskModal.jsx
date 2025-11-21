import { useState } from 'react';
import { X, Calendar, Tag, AlertCircle, Flag } from 'lucide-react';
import useTodoStore from '../store/useTodoStore';

const PRIORITIES = [
  { value: 'low', label: 'Low', color: 'text-blue-400 bg-blue-500/10' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-400 bg-yellow-500/10' },
  { value: 'high', label: 'High', color: 'text-red-400 bg-red-500/10' },
];

const PRESET_TAGS = ['Work', 'Personal', 'Urgent', 'Meeting', 'Review', 'Planning'];

export default function CreateTaskModal({ isOpen, onClose }) {
  const addTask = useTodoStore((state) => state.addTask);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: [],
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add task
    addTask(formData);
    
    // Reset and close
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      tags: [],
    });
    setErrors({});
    onClose();
  };

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-4 border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent" />
          <div className="relative flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Create New Task
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors"
            >
              <X size={18} className="text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[calc(85vh-80px)] overflow-y-auto custom-scrollbar">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What needs to be done?"
              className={`
                w-full px-4 py-3 
                bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08]
                border ${errors.title ? 'border-red-500/50' : 'border-white/[0.06]'}
                hover:border-white/10 focus:border-emerald-500/30
                text-white text-[15px] placeholder:text-zinc-600
                rounded-xl outline-none
                transition-all duration-300
              `}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add more details..."
              rows={3}
              className="
                w-full px-4 py-3 
                bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08]
                border border-white/[0.06] hover:border-white/10 focus:border-emerald-500/30
                text-white text-[15px] placeholder:text-zinc-600
                rounded-xl outline-none resize-none
                transition-all duration-300
              "
            />
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                <Flag size={14} className="inline mr-1" />
                Priority
              </label>
              <div className="flex gap-2">
                {PRIORITIES.map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: priority.value })}
                    className={`
                      flex-1 px-3 py-2 rounded-xl text-sm font-medium
                      transition-all duration-300
                      ${
                        formData.priority === priority.value
                          ? `${priority.color} border border-current`
                          : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05]'
                      }
                    `}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                <Calendar size={14} className="inline mr-1" />
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="
                  w-full px-4 py-2 
                  bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08]
                  border border-white/[0.06] hover:border-white/10 focus:border-emerald-500/30
                  text-white text-sm
                  rounded-xl outline-none
                  transition-all duration-300
                "
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3">
              <Tag size={14} className="inline mr-1" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium
                    transition-all duration-300
                    ${
                      formData.tags.includes(tag)
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05]'
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1 px-6 py-3
                bg-white/[0.03] hover:bg-white/[0.06]
                border border-white/[0.06] hover:border-white/10
                text-zinc-300 hover:text-white font-semibold
                rounded-xl
                transition-all duration-300
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                flex-1 px-6 py-3
                bg-gradient-to-r from-emerald-500 to-emerald-600
                hover:from-emerald-400 hover:to-emerald-500
                text-white font-semibold
                rounded-xl
                shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40
                transition-all duration-300
              "
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
