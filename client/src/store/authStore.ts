import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../api/authApi";
import type { AuthUser } from "../types/auth";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: (token, user) => set({ token, user }),

      logout: () => set({ token: null, user: null }),

      fetchMe: async () => {
        if (!get().token) return;
        set({ isLoading: true });
        try {
          const { data } = await authApi.getMe();
          set({ user: data.data });
        } catch {
          set({ token: null, user: null });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "gigflow-auth",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
