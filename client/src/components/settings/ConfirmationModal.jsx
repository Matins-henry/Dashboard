import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Confirmation Modal
 * Reusable confirmation dialog for destructive actions
 */
export default function ConfirmationModal({ 
  isOpen,
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm, 
  onClose,
  type = 'danger' // 'danger' | 'warning' | 'info'
}) {
  if (!isOpen) return null;

  const colors = {
    danger: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      icon: 'text-red-400',
      button: 'from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-red-500/25',
    },
    warning: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      icon: 'text-orange-400',
      button: 'from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-orange-500/25',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      icon: 'text-blue-400',
      button: 'from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-blue-500/25',
    },
  };

  const color = colors[type];

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
              <div className={`w-10 h-10 rounded-xl ${color.bg} border ${color.border} flex items-center justify-center`}>
                <AlertTriangle size={20} className={color.icon} />
              </div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-zinc-300 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            >
              {cancelText}
            </button>
            <motion.button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r ${color.button} rounded-xl shadow-lg transition-all`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {confirmText}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
