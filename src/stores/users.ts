import { defineStore } from 'pinia';
import type { UserRecord } from '../types/dashboard';

interface UsersState {
  userList: UserRecord[];
  searchQuery: string;
  filterStatus: 'All Users' | 'Active' | 'Inactive' | 'New';
  currentPage: number;
}

// Generate some mock users
const mockUsers: UserRecord[] = Array.from({ length: 20 }, (_, i) => {
  const statuses: ('Active' | 'Inactive' | 'New')[] = ['Active', 'Active', 'Inactive', 'New'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  
  return {
    id: `U${1000 + i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: '',
    initials: `U${i + 1}`,
    status,
    country,
    joined: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  };
});

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    userList: mockUsers,
    searchQuery: '',
    filterStatus: 'All Users',
    currentPage: 1,
  }),
  getters: {
    filteredUsers(state) {
      let filtered = state.userList;
      if (state.filterStatus !== 'All Users') {
        filtered = filtered.filter(u => u.status === state.filterStatus);
      }
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(u => 
          u.name.toLowerCase().includes(query) || 
          u.email.toLowerCase().includes(query)
        );
      }
      return filtered;
    }
  }
});
