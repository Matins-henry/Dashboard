import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

/**
 * Premium Stats Card with 3D effect and glow
 */
export default function StatsCard({ label, value, icon: Icon, color, trend, link, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ 
          background: `radial-gradient(circle at center, ${color}40, transparent 70%)`
        }}
      />

      {/* Card */}
      <div className="relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/10 rounded-2xl p-6 transition-all duration-300 backdrop-blur-xl">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)`
          }}
        />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-zinc-500 text-sm font-medium">
              {label}
            </p>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Icon size={20} className={color} strokeWidth={2} />
            </motion.div>
          </div>
          
          {/* Value */}
          <div className="flex items-end justify-between">
            <motion.h3 
              className="text-4xl font-bold text-white tracking-tight"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: delay + 0.2,
                type: 'spring',
                stiffness: 200
              }}
            >
              {value}
            </motion.h3>
            
            {trend && (
              <motion.span 
                className="text-xs font-medium text-emerald-400 flex items-center gap-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.3 }}
              >
                <TrendingUp size={12} />
                {trend}
              </motion.span>
            )}
          </div>

          {/* Sparkle effect on hover */}
          <motion.div
            className="absolute top-2 right-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
