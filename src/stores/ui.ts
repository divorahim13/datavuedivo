import { defineStore } from 'pinia';
import type { ToastMessage } from '../types/dashboard';

interface UiState {
  isSidebarOpen: boolean;
  activeToasts: ToastMessage[];
  isDarkMode: boolean;
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    isSidebarOpen: false,
    activeToasts: [],
    isDarkMode: true, // Default to dark mode given the exact requirements
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    setSidebar(state: boolean) {
      this.isSidebarOpen = state;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    addToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
      const id = Date.now().toString();
      this.activeToasts.push({ id, message, type });
      setTimeout(() => {
        this.removeToast(id);
      }, 3000);
    },
    removeToast(id: string) {
      this.activeToasts = this.activeToasts.filter(t => t.id !== id);
    }
  }
});
