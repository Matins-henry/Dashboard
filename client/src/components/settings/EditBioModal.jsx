import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Check } from 'lucide-react';

/**
 * Edit Bio Modal
 * Modal for editing user's bio
 */
export default function EditBioModal({ currentBio, onSave, onClose }) {
  const [bio, setBio] = useState(currentBio);
  const maxLength = 160;

  const handleSave = () => {
    onSave(bio.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSave();
    }
  };

  const remainingChars = maxLength - bio.length;

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
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <FileText size={20} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Edit Bio</h2>
                <p className="text-sm text-zinc-400">Tell us about yourself</p>
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
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, maxLength))}
                onKeyDown={handleKeyDown}
                placeholder="Product designer & developer..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                autoFocus
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-zinc-500">
                  Cmd+Enter to save
                </p>
                <p className={`text-xs font-medium ${
                  remainingChars < 20 ? 'text-orange-400' : 'text-zinc-500'
                }`}>
                  {remainingChars} characters remaining
                </p>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
              <p className="text-sm text-purple-400">
                💡 Your bio appears on your profile and in the sidebar
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
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Check size={16} />
              Save Bio
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
