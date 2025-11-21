import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnetic Cursor Effect
 * Custom cursor that follows mouse with smooth spring animation
 */
export default function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-[100] mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-emerald-400" />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed w-2 h-2 pointer-events-none z-[100] mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: 12,
          y: 12,
        }}
      >
        <div className="w-full h-full rounded-full bg-emerald-400" />
      </motion.div>
    </>
  );
}
