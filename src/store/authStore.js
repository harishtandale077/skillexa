import { create } from 'zustand';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const useAuthStore = create((set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);
          const { user, token } = response.data.data;
          
          localStorage.setItem('skillforge_token', token);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          toast.success('Login successful!');
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          set({ isLoading: false, error: message });
          toast.error(message);
          return { success: false, error: message };
        }
      },

      // Register action
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(userData);
          const { user, token } = response.data.data;
          
          localStorage.setItem('skillforge_token', token);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          toast.success('Registration successful!');
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed';
          set({ isLoading: false, error: message });
          toast.error(message);
          return { success: false, error: message };
        }
      },

      // Logout action
      logout: async () => {
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          localStorage.removeItem('skillforge_token');
          localStorage.removeItem('skillforge_user');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
          toast.success('Logged out successfully');
        }
      },

      // Get user profile
      getProfile: async () => {
        set({ isLoading: true });
        try {
          const response = await authAPI.getProfile();
          const { user } = response.data.data;
          
          set({
            user,
            isLoading: false,
            error: null
          });
          
          return { success: true, user };
        } catch (error) {
          const message = error.response?.data?.message || 'Failed to fetch profile';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      // Update user data
      updateUser: (userData) => {
        set(state => ({
          user: { ...state.user, ...userData }
        }));
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Initialize auth state
      initialize: async () => {
        const token = localStorage.getItem('skillforge_token');
        const userData = localStorage.getItem('skillforge_user');
        
        if (token) {
          try {
            const user = userData ? JSON.parse(userData) : null;
            set({ 
              token, 
              user,
              isAuthenticated: true 
            });
            
            // Verify token is still valid
            const result = await get().getProfile();
            if (!result.success) {
              // Token expired, clear storage
              localStorage.removeItem('skillforge_token');
              localStorage.removeItem('skillforge_user');
              set({
                user: null,
                token: null,
                isAuthenticated: false
              });
            }
          } catch (error) {
            console.error('Error initializing auth:', error);
            localStorage.removeItem('skillforge_token');
            localStorage.removeItem('skillforge_user');
            set({
              user: null,
              token: null,
              isAuthenticated: false
            });
          }
        }
      }
    }));

export default useAuthStore;