import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Confetti Effect
 * Celebration animation for task completion
 */
export default function Confetti({ trigger, onComplete }) {
  const colors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];
  const confettiCount = 50;

  useEffect(() => {
    if (trigger && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!trigger) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: confettiCount }).map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 2 + Math.random() * 1;
        const randomRotation = Math.random() * 360;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${randomX}%`,
              top: '-20px',
              backgroundColor: randomColor,
            }}
            initial={{
              y: -20,
              x: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 20,
              x: (Math.random() - 0.5) * 200,
              rotate: randomRotation + 720,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: 'easeIn',
            }}
          />
        );
      })}
    </div>
  );
}
