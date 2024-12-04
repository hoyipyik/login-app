// src/stores/authStore.ts
import { create } from 'zustand';
import { storage } from '../services/storage';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null; 
  initialize: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setUsername: (username: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,
  username: null, 
  initialize: async () => {
    try {
      const token = await storage.getToken();
      set({
        token,
        isAuthenticated: !!token,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isLoading: false });
    }
  },

  login: async (token: string) => {
    await storage.setToken(token);
    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await storage.removeToken();
    set({
      token: null,
      isAuthenticated: false,
    });
  },
  setUsername: (username: string) => set({ username }),  
}));