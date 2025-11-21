import { motion } from 'framer-motion';

/**
 * Premium Loading Skeleton Component
 * Animated placeholder for loading states
 */

export function SkeletonCard({ className = '' }) {
  return (
    <motion.div
      className={`bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Content skeleton */}
        <div className="p-6 space-y-4">
          <div className="h-4 bg-white/[0.06] rounded-lg w-3/4" />
          <div className="h-3 bg-white/[0.04] rounded-lg w-1/2" />
          <div className="h-8 bg-white/[0.06] rounded-lg w-1/3" />
        </div>
      </div>
    </motion.div>
  );
}

export function SkeletonStat() {
  return (
    <motion.div
      className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <div className="space-y-2">
          <div className="h-3 bg-white/[0.06] rounded w-16" />
          <div className="h-8 bg-white/[0.08] rounded w-20" />
        </div>
      </div>
    </motion.div>
  );
}

export function SkeletonList({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <div className="relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
            />
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/[0.06] rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/[0.06] rounded w-3/4" />
                <div className="h-3 bg-white/[0.04] rounded w-1/2" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default SkeletonCard;
