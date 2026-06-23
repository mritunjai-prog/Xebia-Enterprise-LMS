import { create } from 'zustand';
import { DashboardData } from '../types';
import { api } from '../services/api';

interface AppState {
  // UI State
  isSidebarCollapsed: boolean;
  activeTenant: string;
  activeSidebarItem: string;

  // Data State
  dashboardData: DashboardData | null;
  isLoading: boolean;

  // Actions
  toggleSidebar: () => void;
  setTenant: (tenant: string) => void;
  setActiveSidebarItem: (item: string) => void;
  fetchDashboardData: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarCollapsed: false,
  activeTenant: 'Global · All Tenants',
  activeSidebarItem: 'Dashboard',

  dashboardData: null,
  isLoading: false,

  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setTenant: (tenant) => set({ activeTenant: tenant }),
  setActiveSidebarItem: (item) => set({ activeSidebarItem: item }),
  
  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      const data = await api.dashboard.getOverview();
      set({ dashboardData: data, isLoading: false });
    } catch (error) {
      console.error("Failed to load dashboard data", error);
      set({ isLoading: false });
    }
  }
}));
