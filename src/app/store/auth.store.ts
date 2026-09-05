import { create } from 'zustand';

interface AuthStore {
    token: string | null;
  email: string | null;
  role: 'manager' | 'employee' |'admin';
  setToken: (token: string | null) => void;
  setEmail: (email: string | null) => void;
  setRole: (role: 'manager' | 'employee' |'admin') => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  email: null,
  role: 'employee',
  setToken: (token) => set({ token }),
  setEmail: (email) => set({ email }),
  setRole: (role) => set({ role }),
}));

