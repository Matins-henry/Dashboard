/**
 * Theme Hook
 * Manages theme state and applies theme changes
 */

import { useEffect } from 'react';
import usePreferencesStore from '../store/usePreferencesStore';
import { applyTheme } from '../utils/themeConfig';

export const useTheme = () => {
  const darkMode = usePreferencesStore((state) => state.appearance.darkMode);
  const updateAppearance = usePreferencesStore((state) => state.updateAppearance);

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    updateAppearance('darkMode', !darkMode);
  };

  return {
    isDark: darkMode,
    toggleTheme,
  };
};
