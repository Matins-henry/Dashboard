import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Check } from 'lucide-react';

/**
 * Edit Name Modal
 * Modal for editing user's display name
 */
export default function EditNameModal({ currentName, onSave, onClose }) {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    onSave(name.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <User size={20} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Edit Display Name</h2>
                <p className="text-sm text-zinc-400">Update your display name</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                autoFocus
              />
              {error && (
                <motion.p
                  className="text-red-400 text-sm mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-sm text-blue-400">
                💡 This name will be displayed across the dashboard
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Check size={16} />
              Save Changes
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
