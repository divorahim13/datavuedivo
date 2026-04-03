<script setup lang="ts">
import { computed, ref } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart } from 'echarts/charts';
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent,
  VisualMapComponent
} from 'echarts/components';
import type { RevenueData } from '../../types/dashboard';

use([
  CanvasRenderer, 
  LineChart, 
  BarChart, 
  GridComponent, 
  TooltipComponent, 
  LegendComponent,
  VisualMapComponent
]);

const props = defineProps<{
  data: RevenueData[];
}>();

const chartRef = ref<InstanceType<typeof VChart> | null>(null);

const exportChart = () => {
  if (chartRef.value) {
    const url = chartRef.value.getDataURL({ type: 'png', backgroundColor: '#FFFFFF' });
    const link = document.createElement('a');
    link.href = url;
    link.download = 'revenue-trend.png';
    link.click();
  }
};

const chartOption = computed(() => ({
  backgroundColor: 'transparent',
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '15%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    textStyle: { color: '#111827' },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#E5E7EB',
        width: 2,
        type: 'dashed'
      }
    }
  },
  xAxis: {
    type: 'category',
    data: props.data?.map(d => d.month) || [],
    axisLine: { lineStyle: { color: '#E5E7EB' } },
    axisLabel: { color: '#6B7280' },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisLabel: { color: '#6B7280' },
    splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } }
  },
  series: [
    {
      name: 'Revenue',
      data: props.data?.map(d => d.revenue) || [],
      type: 'line',
      smooth: true,
      symbolSize: 6,
      itemStyle: { color: '#3B82F6' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(59, 130, 246, 0.2)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0)' }
          ]
        }
      },
      lineStyle: { width: 3, shadowBlur: 0 }
    }
  ]
}));
</script>

<template>
  <div class="nexadash-card p-6 h-full flex flex-col justify-between">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-bold text-[#6b7280] uppercase tracking-wider">Average Sales</h3>
      <button 
        @click="exportChart"
        class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:text-[#111827] hover:bg-[#f9fafb] transition-colors"
      >
        Export
      </button>
    </div>
    <div class="mb-4">
      <div class="flex items-end gap-3 text-3xl font-bold text-[#111827]">
        $1,389,652
        <span class="text-[12px] px-2 py-0.5 rounded-md bg-[#dcfce7] text-[#166534] mb-1 font-bold">+1.8%</span>
      </div>
    </div>
    <div class="w-full h-[300px]">
      <VChart ref="chartRef" :option="chartOption" autoresize />
    </div>
  </div>
</template>
