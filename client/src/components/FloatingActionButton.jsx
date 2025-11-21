import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckSquare, Activity, MessageSquare, Sparkles } from 'lucide-react';

/**
 * Floating Action Button (FAB)
 * Quick access to common actions
 */
export default function FloatingActionButton({ onNewTask, onNewActivity }) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: CheckSquare, label: 'New Task', color: 'emerald', action: onNewTask },
    { icon: Activity, label: 'Log Activity', color: 'blue', action: onNewActivity },
    { icon: MessageSquare, label: 'New Message', color: 'purple', action: () => console.log('Message') },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl
                    bg-zinc-900/95 backdrop-blur-xl border border-white/10
                    hover:border-${action.color}-500/30 transition-all
                    shadow-lg hover:shadow-xl
                  `}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {action.label}
                  </span>
                  <div className={`w-10 h-10 rounded-lg bg-${action.color}-500/10 border border-${action.color}-500/20 flex items-center justify-center group-hover:bg-${action.color}-500/20 transition-colors`}>
                    <Icon size={18} className={`text-${action.color}-400`} />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center group overflow-hidden"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur-xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Icon */}
        <Plus size={28} className="text-white relative z-10" strokeWidth={2.5} />
        
        {/* Sparkle effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Sparkles size={12} className="text-white/50 absolute top-2 right-2" />
        </motion.div>
      </motion.button>
    </div>
  );
}
