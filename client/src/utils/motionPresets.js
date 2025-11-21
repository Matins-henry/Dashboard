// Centralized Framer Motion presets for LifeBoard
// Keep animations cohesive across pages and components

export const transitions = {
  fast: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  default: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  slow: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

// Page-level route transitions (used in MainLayout)
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      ...transitions.slow,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(4px)',
    transition: {
      ...transitions.default,
    },
  },
};

// Generic containers with staggered children
export const createStaggerContainer = (stagger = 0.06, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren,
      staggerChildren: stagger,
    },
  },
});

// Common element variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: transitions.default,
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: transitions.default,
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: transitions.default,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: transitions.default,
  },
};

// Hover/tap interaction helpers (to keep values consistent)
export const hoverLift = {
  whileHover: {
    y: -4,
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
};

export const hoverScale = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 18px 45px rgba(16, 185, 129, 0.28)',
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

// Slide animations with blur
export const slideInWithBlur = {
  hidden: { opacity: 0, x: -40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: transitions.default,
  },
};

// Pop-in animation
export const popIn = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      ...transitions.default,
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

// Reveal from bottom with blur
export const revealFromBottom = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      ...transitions.slow,
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};
