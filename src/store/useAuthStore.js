
// store/useAuthStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'), // persist token
  role: null,
  loading: true,
  login: ({ user, token, role }) => {
    localStorage.setItem('token', token);
    set({ user, token, role, loading: false });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, role: null, loading: false });
  },
  setLoading: (loading) => set({ loading }),
}));
