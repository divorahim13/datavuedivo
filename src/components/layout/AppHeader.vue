<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDashboardStore } from '../../stores/dashboard';
import { Search, Bell, Filter, Plus, Calendar, Settings, DownloadCloud } from 'lucide-vue-next';
import type { FilterType } from '../../types/dashboard';

const route = useRoute();
const store = useDashboardStore();

const pageTitle = computed(() => route.meta.title as string || 'Overview');
</script>

<template>
  <header class="h-[88px] bg-white border-b border-[#E5E7EB] px-8 flex items-center justify-between z-10 sticky top-0 shrink-0">
    <!-- Left: Search Box -->
    <div class="flex-1 max-w-md">
      <div class="relative flex items-center">
        <Search class="absolute left-3.5 w-4 h-4 text-[#9ca3af]" />
        <input 
          type="text" 
          placeholder="Search" 
          class="w-full h-10 pl-10 pr-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-[14px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-5">
      
      <!-- Avatar Pile -->
      <div class="hidden md:flex items-center -space-x-2">
        <img class="w-8 h-8 rounded-full border-2 border-white relative z-10" src="https://i.pravatar.cc/150?img=32" alt="">
        <img class="w-8 h-8 rounded-full border-2 border-white relative z-20" src="https://i.pravatar.cc/150?img=47" alt="">
        <img class="w-8 h-8 rounded-full border-2 border-white relative z-30" src="https://i.pravatar.cc/150?img=12" alt="">
        <button class="w-8 h-8 rounded-full border-2 border-white relative z-40 bg-[#111827] flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
          <Plus class="w-4 h-4" />
        </button>
      </div>

      <div class="w-px h-6 bg-[#e5e7eb] hidden md:block"></div>

      <!-- Filters & Toggles -->
      <div class="flex items-center gap-3">
        <div class="relative">
          <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
          <select 
            v-model="store.activeFilter"
            class="appearance-none pl-9 pr-8 py-2 bg-transparent text-[#111827] font-semibold text-[13px] hover:bg-[#f3f4f6] rounded-md transition-colors border border-transparent focus:outline-none focus:border-[#e5e7eb] cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="monthly">This Month</option>
            <option value="weekly">This Week</option>
            <option value="daily">Today</option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg class="w-3 h-3 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 ml-2">
        <button class="relative p-2 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded-lg transition-all border border-[#e5e7eb]">
          <Bell class="w-5 h-5" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full border border-white"></span>
        </button>
        
        <button class="flex items-center gap-2 px-4 py-2.5 bg-[#111827] text-white hover:bg-[#1f2937] rounded-lg text-[13px] font-semibold transition-all">
          <DownloadCloud class="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  </header>
</template>
