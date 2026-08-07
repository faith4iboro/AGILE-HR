import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  isSidebarCollapsed: boolean;
  isMobileNavOpen: boolean;
  toggleSidebar: () => void;
  setMobileNavOpen: (open: boolean) => void;
}

/**
 * Client-side UI preferences that should survive a page refresh but never
 * touch the server. Persisted to localStorage under "aurahr-ui".
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      isMobileNavOpen: false,
      toggleSidebar: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
    }),
    { name: "aurahr-ui" }
  )
);
