import { create } from "zustand";

interface AuthStore {
  token: string | null;
  email: string | null;
  role: "manager" | "employee" | "admin" | "user";
  setToken: (token: string | null) => void;
  setEmail: (email: string | null) => void;
  setRole: (role: "manager" | "employee" | "admin" | "user") => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  email: null,
  role:
    (localStorage.getItem("role")?.trim().toLowerCase() as AuthStore["role"]) ||
    "employee",
  setToken: (token) => set({ token }),
  setEmail: (email) => set({ email }),
  setRole: (role) => set({ role }),
}));
