/**
 * Theme Configuration
 * Defines color palettes and design tokens for light and dark themes
 */

export const themes = {
  dark: {
    // Backgrounds
    bg: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a',
      tertiary: '#242424',
      surface: 'rgba(255, 255, 255, 0.03)',
      surfaceHover: 'rgba(255, 255, 255, 0.05)',
      surfaceActive: 'rgba(255, 255, 255, 0.08)',
    },
    
    // Text
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa',
      tertiary: '#71717a',
      muted: '#52525b',
      inverse: '#0a0a0a',
    },
    
    // Borders
    border: {
      primary: 'rgba(255, 255, 255, 0.06)',
      secondary: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.10)',
      focus: 'rgba(16, 185, 129, 0.3)',
    },
    
    // Brand colors (consistent across themes)
    brand: {
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
    },
    
    // Shadows
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
      md: '0 4px 6px rgba(0, 0, 0, 0.5)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.5)',
    },
    
    // Special effects
    glow: 'rgba(16, 185, 129, 0.3)',
    aurora: {
      from: 'rgba(16, 185, 129, 0.03)',
      to: 'rgba(16, 185, 129, 0.02)',
    },
  },
  
  light: {
    // Backgrounds - Sophisticated, easy on the eyes
    bg: {
      primary: '#f8f9fa',      // Soft neutral gray - main background
      secondary: '#ffffff',     // Pure white - elevated surfaces
      tertiary: '#e9ecef',      // Light gray - subtle accents
      surface: '#ffffff',       // White cards with depth
      surfaceHover: '#f1f3f5',  // Subtle hover state
      surfaceActive: '#e9ecef', // Clear active state
    },
    
    // Text - Professional hierarchy
    text: {
      primary: '#1a1a1a',       // Near black - excellent readability
      secondary: '#4a5568',     // Medium gray - body text
      tertiary: '#718096',      // Lighter gray - labels
      muted: '#a0aec0',         // Muted gray - placeholders
      inverse: '#ffffff',       // White text on dark
    },
    
    // Borders - Visible but refined
    border: {
      primary: 'rgba(0, 0, 0, 0.08)',    // Subtle separation
      secondary: 'rgba(0, 0, 0, 0.12)',  // Standard borders
      hover: 'rgba(0, 0, 0, 0.16)',      // Interactive borders
      focus: 'rgba(16, 185, 129, 0.4)',  // Focus ring
    },
    
    // Brand colors (consistent across themes)
    brand: {
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
    },
    
    // Shadows - Professional depth
    shadow: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    },
    
    // Special effects - Subtle and purposeful
    glow: 'rgba(16, 185, 129, 0.15)',
    aurora: {
      from: 'rgba(16, 185, 129, 0.04)',
      to: 'rgba(52, 211, 153, 0.03)',
    },
  },
};

/**
 * Get theme colors based on current theme
 */
export const getTheme = (isDark = true) => {
  return isDark ? themes.dark : themes.light;
};

/**
 * Apply theme to CSS variables
 */
export const applyTheme = (isDark = true) => {
  const theme = getTheme(isDark);
  const root = document.documentElement;
  
  // Apply CSS variables
  root.style.setProperty('--bg-primary', theme.bg.primary);
  root.style.setProperty('--bg-secondary', theme.bg.secondary);
  root.style.setProperty('--bg-tertiary', theme.bg.tertiary);
  root.style.setProperty('--bg-surface', theme.bg.surface);
  root.style.setProperty('--bg-surface-hover', theme.bg.surfaceHover);
  root.style.setProperty('--bg-surface-active', theme.bg.surfaceActive);
  
  root.style.setProperty('--text-primary', theme.text.primary);
  root.style.setProperty('--text-secondary', theme.text.secondary);
  root.style.setProperty('--text-tertiary', theme.text.tertiary);
  root.style.setProperty('--text-muted', theme.text.muted);
  root.style.setProperty('--text-inverse', theme.text.inverse);
  
  root.style.setProperty('--border-primary', theme.border.primary);
  root.style.setProperty('--border-secondary', theme.border.secondary);
  root.style.setProperty('--border-hover', theme.border.hover);
  root.style.setProperty('--border-focus', theme.border.focus);
  
  root.style.setProperty('--brand-primary', theme.brand.primary);
  root.style.setProperty('--brand-primary-light', theme.brand.primaryLight);
  root.style.setProperty('--brand-primary-dark', theme.brand.primaryDark);
  
  root.style.setProperty('--glow', theme.glow);
  root.style.setProperty('--aurora-from', theme.aurora.from);
  root.style.setProperty('--aurora-to', theme.aurora.to);
  
  // Apply theme class to body
  if (isDark) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
};
