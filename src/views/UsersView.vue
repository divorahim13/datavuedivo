<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsersStore } from '../stores/users';
import { Search, Filter as FilterIcon, Edit2, Trash2, ChevronDown } from 'lucide-vue-next';
import { useDebounceFn } from '@vueuse/core';


const store = useUsersStore();

const localSearch = ref(store.searchQuery);
const handleSearch = useDebounceFn((val: string) => {
  store.searchQuery = val;
  store.currentPage = 1;
}, 300);

const onSearchInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  localSearch.value = val;
  handleSearch(val);
};

const filterOptions = ['All Users', 'Active', 'Inactive', 'New'] as const;

// Pagination
const rowsPerPage = 10;
const totalPages = computed(() => Math.ceil(store.filteredUsers.length / rowsPerPage) || 1);

const paginatedUsers = computed(() => {
  const start = (store.currentPage - 1) * rowsPerPage;
  return store.filteredUsers.slice(start, start + rowsPerPage);
});

const prevPage = () => {
  if (store.currentPage > 1) store.currentPage--;
};

const nextPage = () => {
  if (store.currentPage < totalPages.value) store.currentPage++;
};

const getAvatarColor = (initials: string) => {
  const colors = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-yellow-100 text-yellow-700', 'bg-red-100 text-red-700', 'bg-purple-100 text-purple-700'];
  const charCode = initials.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};
</script>

<template>
  <div class="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
    <div class="nexadash-card p-8 flex flex-col min-h-[600px]">
      
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-lg font-bold text-[#111827] tracking-tight">User Management</h3>
        
        <div class="flex items-center gap-4">
          <div class="relative w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search class="w-4 h-4 text-[#9ca3af]" />
            </div>
            <input 
              type="text" 
              :value="localSearch"
              @input="onSearchInput"
              class="block w-full h-10 pl-10 pr-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl text-sm text-[#111827] placeholder-[#9ca3af] focus:border-[#3b82f6] focus:outline-none transition-colors" 
              placeholder="Search users..."
            >
          </div>

          <div class="relative w-48">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon class="w-4 h-4 text-[#9ca3af]" />
            </div>
            <select 
              v-model="store.filterStatus"
              @change="store.currentPage = 1"
              class="block w-full h-10 pl-10 pr-8 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl text-sm text-[#111827] appearance-none focus:border-[#3b82f6] focus:outline-none transition-colors cursor-pointer"
            >
              <option v-for="opt in filterOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
               <ChevronDown class="w-4 h-4 text-[#9ca3af]" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-auto custom-scrollbar">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest border-b border-[#e5e7eb]">
              <th class="pb-4 pt-2 px-4">User</th>
              <th class="pb-4 pt-2 px-4">Status</th>
              <th class="pb-4 pt-2 px-4">Country</th>
              <th class="pb-4 pt-2 px-4">Joined Date</th>
              <th class="pb-4 pt-2 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e5e7eb]">
            <tr v-if="paginatedUsers.length === 0">
              <td colspan="5" class="py-12 text-center text-[#6b7280] text-sm">No users found.</td>
            </tr>
            <tr 
              v-for="user in paginatedUsers" 
              :key="user.id" 
              class="transition-colors group hover:bg-[#f9fafb]"
            >
              <td class="py-4 px-4 rounded-l-xl">
                <div class="flex items-center gap-4">
                  <div 
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 border border-[#e5e7eb]" 
                    :class="getAvatarColor(user.initials)"
                  >
                    {{ user.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-[#111827]">{{ user.name }}</p>
                    <p class="text-xs text-[#6b7280]">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="px-2.5 py-1 rounded-lg text-xs font-bold"
                  :class="{
                    'bg-[#dcfce7] text-[#166534]': user.status === 'Active',
                    'bg-[#f3f4f6] text-[#4b5563]': user.status === 'Inactive',
                    'bg-[#dbeafe] text-[#1e40af]': user.status === 'New',
                  }">
                  {{ user.status }}
                </span>
              </td>
              <td class="py-4 px-4 text-sm text-[#4b5563] font-semibold">{{ user.country }}</td>
              <td class="py-4 px-4 text-sm text-[#6b7280]">{{ new Date(user.joined).toLocaleDateString() }}</td>
              <td class="py-4 px-4 text-right rounded-r-xl">
                <div class="flex justify-end gap-2">
                  <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] transition-colors">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:text-[#ef4444] hover:bg-[#fee2e2] transition-colors">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex items-center justify-between text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">
        <span>{{ (store.currentPage - 1) * rowsPerPage + 1 }}-{{ Math.min(store.currentPage * rowsPerPage, store.filteredUsers.length) }} of {{ store.filteredUsers.length }}</span>
        <div class="flex gap-2">
          <button 
            @click="prevPage"
            :disabled="store.currentPage === 1"
            class="px-3 py-1.5 bg-[#ffffff] border border-[#e5e7eb] text-[#111827] rounded-md hover:bg-[#f9fafb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button 
            @click="nextPage"
            :disabled="store.currentPage === totalPages"
            class="px-3 py-1.5 bg-[#ffffff] border border-[#e5e7eb] text-[#111827] rounded-md hover:bg-[#f9fafb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
