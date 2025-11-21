import { motion } from 'framer-motion';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

/**
 * Premium Welcome Banner
 * Animated hero section with gradient and particles
 */
export default function WelcomeBanner({ userName = 'there' }) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent" />
      
      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(52, 211, 153, 0.2) 0%, transparent 50%)
          `,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glass effect */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Greeting */}
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Sparkles size={24} className="text-emerald-400" />
              </motion.div>
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">
                {greeting}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="text-5xl font-bold text-white mb-3 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome back, <span className="text-shimmer">{userName}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-zinc-400 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              You're making great progress. Keep up the momentum! 🚀
            </motion.p>

            {/* Quick stats */}
            <motion.div
              className="flex items-center gap-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-zinc-400">All systems operational</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="text-sm text-zinc-400">Productivity up 23%</span>
              </div>
            </motion.div>
          </div>

          {/* Floating icon */}
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Zap size={32} className="text-white" fill="currentColor" />
            </div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-emerald-500 blur-xl opacity-50"
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
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-20 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
