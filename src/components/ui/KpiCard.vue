<script setup lang="ts">
import { computed } from 'vue';
import { TrendingUp, TrendingDown, Tag } from 'lucide-vue-next';
import * as icons from 'lucide-vue-next';

const props = defineProps<{
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  iconName: string;
}>();

const TrendIcon = computed(() => props.trend === 'up' ? TrendingUp : TrendingDown);
</script>

<template>
  <div class="nexadash-card p-6 flex flex-col justify-between group hover:shadow-nexadash-hover transition-all duration-300">
    <!-- Top Label -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <component :is="icons[iconName as keyof typeof icons] || Tag" class="w-4 h-4 text-[#9ca3af]" />
        <h3 class="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider">{{ title }}</h3>
      </div>
      <div class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-[#f3f4f6] cursor-pointer text-[#9ca3af] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      </div>
    </div>
    
    <!-- Value & Trend -->
    <div class="flex items-end gap-3 mb-1">
      <p class="text-3xl font-bold text-[#111827] tracking-tight">{{ value }}</p>
    </div>

    <!-- Bottom Pill -->
    <div class="flex items-center gap-2 mt-2">
      <div 
        class="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold"
        :class="trend === 'up' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'"
      >
        <TrendIcon class="w-3 h-3" />
        {{ Math.abs(change) }}%
      </div>
      <span class="text-[12px] font-medium text-[#9ca3af]">vs last month</span>
    </div>
  </div>
</template>
