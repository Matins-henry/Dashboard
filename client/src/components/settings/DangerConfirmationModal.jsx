import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

/**
 * Danger Confirmation Modal
 * Extra-safe confirmation for destructive actions
 * Requires typing confirmation text
 */
export default function DangerConfirmationModal({ 
  isOpen,
  title, 
  message, 
  confirmText = 'DELETE',
  actionLabel = 'Delete',
  onConfirm, 
  onClose,
  itemCount = 0,
}) {
  const [inputValue, setInputValue] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const isConfirmEnabled = inputValue === confirmText;

  const handleConfirm = async () => {
    if (!isConfirmEnabled) return;
    
    setIsDeleting(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onConfirm();
    setIsDeleting(false);
    onClose();
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isConfirmEnabled) {
      handleConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md bg-zinc-900/95 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Red glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-red-500/20">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <AlertTriangle size={24} className="text-red-400" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
                {itemCount > 0 && (
                  <p className="text-sm text-red-400 font-medium">
                    {itemCount} items will be deleted
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-400 text-sm leading-relaxed">
                {message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Type <span className="font-bold text-red-400">{confirmText}</span> to confirm
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Type "${confirmText}" here`}
                disabled={isDeleting}
                className="w-full px-4 py-3 bg-white/5 border border-red-500/30 rounded-xl text-white placeholder:text-zinc-600 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 outline-none transition-all disabled:opacity-50"
                autoFocus
              />
              {inputValue && !isConfirmEnabled && (
                <motion.p
                  className="text-orange-400 text-xs mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Text doesn't match. Please type exactly: {confirmText}
                </motion.p>
              )}
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <p className="text-orange-400 text-xs leading-relaxed">
                ⚠️ <strong>Warning:</strong> This action is permanent and cannot be undone. All data will be lost forever.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-red-500/20">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleConfirm}
              disabled={!isConfirmEnabled || isDeleting}
              className={`px-4 py-2 text-sm font-semibold text-white rounded-xl shadow-lg transition-all flex items-center gap-2 ${
                isConfirmEnabled && !isDeleting
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-red-500/25'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
              whileHover={isConfirmEnabled && !isDeleting ? { scale: 1.02 } : {}}
              whileTap={isConfirmEnabled && !isDeleting ? { scale: 0.98 } : {}}
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  {actionLabel}
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
