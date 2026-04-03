<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useDashboardStore } from '../../stores/dashboard';
import { Search, Bell, Plus, Calendar, DownloadCloud, ChevronDown, Check } from 'lucide-vue-next';

const store = useDashboardStore();
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const filterOptions = [
  { label: 'All Time', value: 'all' },
  { label: 'This Month', value: 'monthly' },
  { label: 'This Week', value: 'weekly' },
  { label: 'Today', value: 'daily' },
] as const;

const getCurrentFilterLabel = () => {
  return filterOptions.find(opt => opt.value === store.activeFilter)?.label || 'All Time';
};

const selectFilter = (value: typeof filterOptions[number]['value']) => {
  store.activeFilter = value;
  isDropdownOpen.value = false;
};

// Outside click handling
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <header class="h-[88px] bg-white border-b border-[#E5E7EB] px-8 flex items-center justify-between z-40 sticky top-0 shrink-0">
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
        <button class="w-8 h-8 rounded-full border-2 border-white relative z-[11] bg-[#111827] flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
          <Plus class="w-4 h-4" />
        </button>
      </div>
  
      <div class="w-px h-6 bg-[#e5e7eb] hidden md:block"></div>

      <!-- Filters & Toggles -->
      <div class="relative" ref="dropdownRef">
        <button 
          @click="isDropdownOpen = !isDropdownOpen"
          class="flex items-center gap-2.5 px-4 h-10 bg-[#ffffff] border border-[#e5e7eb] rounded-xl text-[#111827] hover:bg-[#f9fafb] transition-all duration-200 shadow-sm"
          :class="{ 'ring-2 ring-primary/10 border-primary': isDropdownOpen }"
        >
          <Calendar class="w-4 h-4 text-[#9ca3af]" />
          <span class="text-[13px] font-bold">{{ getCurrentFilterLabel() }}</span>
          <ChevronDown class="w-4 h-4 text-[#9ca3af] transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" />
        </button>

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0 translate-y-2"
          enter-to-class="transform scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100 translate-y-0"
          leave-to-class="transform scale-95 opacity-0 translate-y-2"
        >
          <div 
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 z-50 overflow-hidden"
          >
            <button 
              v-for="option in filterOptions" 
              :key="option.value"
              @click="selectFilter(option.value)"
              class="w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-bold transition-all hover:bg-[#f3f4f6]"
              :class="store.activeFilter === option.value ? 'text-primary' : 'text-[#6b7280]'"
            >
              {{ option.label }}
              <Check v-if="store.activeFilter === option.value" class="w-4 h-4" />
            </button>
          </div>
        </Transition>
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
