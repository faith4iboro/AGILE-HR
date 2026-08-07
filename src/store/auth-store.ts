import { create } from "zustand";

import type { AuthUser } from "@/types/user";

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

/**
 * Placeholder session store. Once real authentication lands, this will be
 * hydrated from a server session on load rather than set client-side.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
