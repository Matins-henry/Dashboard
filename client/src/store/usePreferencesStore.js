import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Preferences Store
 * Manages app preferences with localStorage persistence
 */
const usePreferencesStore = create(
  persist(
    (set) => ({
      // Notification preferences
      notifications: {
        email: true,
        push: false,
        weeklyReports: true,
        taskReminders: true,
        communityUpdates: false,
      },

      // Appearance preferences
      appearance: {
        darkMode: true,
        compactLayout: false,
        animations: true,
        showSidebarLabels: true,
        language: 'en',
      },

      // Privacy preferences
      privacy: {
        profileVisible: true,
        activityStatus: true,
        twoFactorEnabled: false,
      },

      // Data preferences
      data: {
        autoSave: true,
        syncDevices: true,
      },

      // Actions
      updateNotifications: (key, value) => set((state) => ({
        notifications: { ...state.notifications, [key]: value }
      })),

      updateAppearance: (key, value) => set((state) => ({
        appearance: { ...state.appearance, [key]: value }
      })),

      updatePrivacy: (key, value) => set((state) => ({
        privacy: { ...state.privacy, [key]: value }
      })),

      updateData: (key, value) => set((state) => ({
        data: { ...state.data, [key]: value }
      })),

      resetPreferences: () => set({
        notifications: {
          email: true,
          push: false,
          weeklyReports: true,
          taskReminders: true,
          communityUpdates: false,
        },
        appearance: {
          darkMode: true,
          compactLayout: false,
          animations: true,
          showSidebarLabels: true,
          language: 'en',
        },
        privacy: {
          profileVisible: true,
          activityStatus: true,
          twoFactorEnabled: false,
        },
        data: {
          autoSave: true,
          syncDevices: true,
        },
      }),
    }),
    {
      name: 'lifeboard-preferences',
    }
  )
);

export default usePreferencesStore;
