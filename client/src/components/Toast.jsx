import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Premium Toast Notification System
 * Beautiful, animated notifications
 */

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Return a fallback instead of throwing
    console.warn('useToast must be used within ToastProvider');
    return {
      addToast: (message, type) => console.log(`Toast: ${message} (${type})`),
      removeToast: () => {},
    };
  }
  return context;
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ toast, onClose }) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      icon: 'text-emerald-400',
      glow: 'rgba(16, 185, 129, 0.3)',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      glow: 'rgba(239, 68, 68, 0.3)',
    },
    warning: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      icon: 'text-orange-400',
      glow: 'rgba(249, 115, 22, 0.3)',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: 'text-blue-400',
      glow: 'rgba(59, 130, 246, 0.3)',
    },
  };

  const Icon = icons[toast.type];
  const color = colors[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95, x: 100 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto"
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-xl blur-lg opacity-50"
          style={{ backgroundColor: color.glow }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Toast content */}
        <div className={`
          relative flex items-center gap-3 px-4 py-3 rounded-xl
          bg-zinc-900/95 backdrop-blur-xl border ${color.border}
          shadow-lg min-w-[300px] max-w-md
        `}>
          <Icon size={20} className={color.icon} />
          <p className="flex-1 text-sm text-white font-medium">
            {toast.message}
          </p>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Toast;
