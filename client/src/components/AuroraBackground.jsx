import { motion } from 'framer-motion';
import usePreferencesStore from '../store/usePreferencesStore';

/**
 * Aurora Background Effect
 * Animated gradient blobs that create a mesmerizing aurora effect
 * Theme-aware with different opacity for light/dark modes
 */
export default function AuroraBackground() {
  const darkMode = usePreferencesStore((state) => state.appearance.darkMode);
  const opacity = darkMode ? 0.15 : 0.04;
  const opacity2 = darkMode ? 0.12 : 0.03;
  const opacity3 = darkMode ? 0.1 : 0.025;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Aurora Blob 1 */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(16, 185, 129, ${opacity}) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '-20%', y: '-10%' }}
      />

      {/* Aurora Blob 2 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full right-0 top-1/4 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(52, 211, 153, ${opacity2}) 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }}
        animate={{
          x: ['10%', '-10%', '10%'],
          y: ['5%', '-5%', '5%'],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '10%', y: '5%' }}
      />

      {/* Aurora Blob 3 */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bottom-0 left-1/3 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(16, 185, 129, ${opacity3}) 0%, transparent 70%)`,
          filter: 'blur(70px)',
        }}
        animate={{
          x: ['-15%', '15%', '-15%'],
          y: ['10%', '-10%', '10%'],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '-15%', y: '10%' }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: darkMode ? 0.02 : 0.005,
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
