import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Check } from 'lucide-react';

/**
 * Edit Location Modal
 * Modal for updating user's location
 */
export default function EditLocationModal({ currentLocation, onSave, onClose }) {
  const [location, setLocation] = useState(currentLocation);

  const handleSave = () => {
    onSave(location.trim());
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
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <MapPin size={20} className="text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Update Location</h2>
                <p className="text-sm text-zinc-400">Where are you based?</p>
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
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="City, State/Country"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                autoFocus
              />
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <p className="text-sm text-orange-400">
                📍 Your location helps personalize your experience
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
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Check size={16} />
              Update Location
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
