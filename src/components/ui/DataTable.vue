<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { 
  ExternalLink, 
  TrendingUp, 
  TrendingDown,
  Navigation
} from 'lucide-vue-next';
import type { PageData } from '../../types/dashboard';

const props = defineProps<{
  pages: PageData[];
}>();

const currentPage = ref(1);
const rowsPerPage = 6;

// Reset page when data changes
watch(() => props.pages, () => {
  currentPage.value = 1;
});

const totalPages = computed(() => Math.ceil((props.pages?.length || 0) / rowsPerPage));

const paginatedPages = computed(() => {
  if (!props.pages) return [];
  const start = (currentPage.value - 1) * rowsPerPage;
  return props.pages.slice(start, start + rowsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const getBounceColor = (bounceStr: string) => {
  const val = parseFloat(bounceStr);
  if (val < 20) return 'text-success';
  if (val > 30) return 'text-danger';
  return 'text-[#F59E0B]'; // Yellow for middle
};

const exportCSV = () => {
  if (!props.pages || props.pages.length === 0) return;
  const headers = ['Page Path', 'Visits', 'Time', 'Bounce Rate', 'Trend %'];
  const rows = props.pages.map(p => [
    p.path,
    p.visits.replace(/,/g, ''),
    p.time,
    p.bounce,
    p.trend.toString()
  ]);
  const csvContent = [
    headers.join(','),
    ...rows.map(e => e.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'top_pages.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
  <div class="nexadash-card p-6 flex flex-col h-full min-h-[500px]">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-sm font-bold text-[#6b7280] uppercase tracking-wider flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        Recent Activity
      </h3>
      <button 
        @click="exportCSV"
        class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-[#f3f4f6] cursor-pointer text-[#9ca3af] transition-colors border border-[#e5e7eb]"
      >
        <ExternalLink class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Subcategory -->
    <div class="mb-3">
      <h4 class="text-[13px] font-bold text-[#111827]">Top Visited Pages</h4>
    </div>

    <div class="flex-1 overflow-x-auto custom-scrollbar">
      <div class="space-y-3">
        <div 
          v-for="(page, index) in paginatedPages" 
          :key="index"
          class="flex items-center justify-between p-3 rounded-lg border border-[#f3f4f6] hover:border-[#e5e7eb] transition-colors bg-white group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#f9fafb] rounded-lg border border-[#e5e7eb] flex items-center justify-center">
              <Navigation class="w-4 h-4 text-[#9ca3af] group-hover:text-[#3b82f6] transition-colors" />
            </div>
            <div class="flex flex-col">
              <span class="text-[14px] font-bold text-[#111827]">{{ page.path }}</span>
              <span class="text-[11px] font-medium text-[#6b7280]">
                {{ page.time }} <span class="mx-1">•</span> <span :class="getBounceColor(page.bounce)">Bounce {{ page.bounce }}</span>
              </span>
            </div>
          </div>
          
          <div class="flex flex-col items-end">
            <div class="text-[14px] leading-none font-bold text-[#111827] mb-1.5">{{ page.visits }}</div>
            <div 
              class="flex items-center gap-1 text-[11px] font-bold"
              :class="page.trend >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'"
            >
              <component :is="page.trend >= 0 ? TrendingUp : TrendingDown" class="w-3 h-3" />
              {{ Math.abs(page.trend) }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Footer -->
    <div class="mt-4 pt-4 border-t border-[#e5e7eb] flex items-center justify-between">
      <span class="text-[11px] font-medium text-[#6b7280]">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <div class="flex gap-2">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="w-6 h-6 flex items-center justify-center rounded-md border border-[#e5e7eb] text-[#6b7280] hover:text-[#111827] hover:bg-[#f9fafb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="w-6 h-6 flex items-center justify-center rounded-md border border-[#e5e7eb] text-[#6b7280] hover:text-[#111827] hover:bg-[#f9fafb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>
