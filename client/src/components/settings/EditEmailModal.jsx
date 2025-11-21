import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, AlertCircle } from 'lucide-react';

/**
 * Edit Email Modal
 * Modal for changing user's email address
 */
export default function EditEmailModal({ currentEmail, onSave, onClose }) {
  const [email, setEmail] = useState(currentEmail);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = () => {
    if (!email.trim()) {
      setError('Email cannot be empty');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (email === currentEmail) {
      setError('This is your current email');
      return;
    }

    onSave(email.trim().toLowerCase());
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
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Mail size={20} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Change Email</h2>
                <p className="text-sm text-zinc-400">Update your email address</p>
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
                Current Email
              </label>
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400">
                {currentEmail}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                New Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter new email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                autoFocus
              />
              {error && (
                <motion.p
                  className="text-red-400 text-sm mt-2 flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.p>
              )}
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <p className="text-sm text-orange-400">
                ⚠️ In a real app, you would receive a verification email
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
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Check size={16} />
              Update Email
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
