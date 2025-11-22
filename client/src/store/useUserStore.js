import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * User Store
 * Manages user profile data with localStorage persistence
 */
const useUserStore = create(
  persist(
    (set) => ({
      // User profile data
      user: {
        name: 'Matins Henry',
        email: 'matins@example.com',
        bio: 'Product designer & developer',
        location: 'San Francisco, CA',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MH',
        role: 'Premium User',
      },

      // Actions
      updateName: (name) => set((state) => ({
        user: { ...state.user, name }
      })),

      updateEmail: (email) => set((state) => ({
        user: { ...state.user, email }
      })),

      updateBio: (bio) => set((state) => ({
        user: { ...state.user, bio }
      })),

      updateLocation: (location) => set((state) => ({
        user: { ...state.user, location }
      })),

      updateAvatar: (avatar) => set((state) => ({
        user: { ...state.user, avatar }
      })),

      updateProfile: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),

      resetProfile: () => set({
        user: {
          name: 'Matins Henry',
          email: 'matins@example.com',
          bio: 'Product designer & developer',
          location: 'San Francisco, CA',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MH',
          role: 'Premium User',
        }
      }),
    }),
    {
      name: 'lifeboard-user',
    }
  )
);

export default useUserStore;
