<script setup lang="ts">
import { computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { Package, ExternalLink } from 'lucide-vue-next';
import type { CountryData } from '../../types/dashboard';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

const props = defineProps<{
  data: CountryData[];
  loading?: boolean;
}>();



const topProducts = computed(() => {
  if (!props.data) return [];
  // Slice top 3 only to match Nexadash Top 3 Product design
  return [...props.data].sort((a, b) => b.count - a.count).slice(0, 3);
});

const todayTotal = computed(() => {
  return topProducts.value.reduce((sum, item) => sum + item.count, 0);
});

const chartOption = computed(() => ({
  backgroundColor: 'transparent',
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    top: '15%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    textStyle: { color: '#111827' }
  },
  xAxis: {
    type: 'category',
    data: topProducts.value.map(d => d.name),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { 
      color: '#6b7280',
      fontSize: 12,
      fontWeight: 'bold',
      margin: 12
    }
  },
  yAxis: {
    type: 'value',
    show: true,
    axisLine: { show: false },
    splitLine: { lineStyle: { type: 'dashed', color: '#f3f4f6' } },
    axisLabel: { color: '#9ca3af', fontSize: 11 }
  },
  series: [
    {
      name: 'Sales',
      type: 'bar',
      data: topProducts.value.map(d => d.count),
      itemStyle: { 
        color: '#111827',
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '40%',
      showBackground: true,
      backgroundStyle: {
        color: '#f3f4f6',
        borderRadius: [4, 4, 0, 0]
      },
      label: {
        show: true,
        position: 'insideBottom',
        color: '#ffffff',
        fontWeight: 'bold',
        formatter: (params: any) => params.value.toLocaleString()
      }
    }
  ]
}));
</script>

<template>
  <div class="nexadash-card p-6 flex flex-col h-full min-h-[500px]">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-bold text-[#6b7280] uppercase tracking-wider flex items-center gap-2">
        <Package class="w-4 h-4" />
        Top 3 Product (Countries)
      </h3>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1.5 text-[12px] font-bold text-[#111827] bg-[#f9fafb] border border-[#e5e7eb] rounded-md hover:bg-[#f3f4f6] transition-colors">
          Daily
        </button>
        <button class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-[#f3f4f6] cursor-pointer text-[#9ca3af] transition-colors border border-[#e5e7eb]">
          <ExternalLink class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Small stat -->
    <div class="flex items-center justify-between mb-2">
      <span class="text-[13px] font-medium text-[#6b7280]">Today's Total:</span>
      <span class="text-[13px] font-bold text-[#10b981]">{{ todayTotal }} units</span>
    </div>

    <!-- Chart -->
    <div v-if="loading" class="w-full flex-1 flex items-center justify-center">
      <div class="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
    <div v-else class="w-full flex-1 min-h-[300px]">
      <VChart :option="chartOption" autoresize />
    </div>
  </div>
</template>
