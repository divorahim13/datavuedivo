<script setup lang="ts">
import { computed, ref } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { 
  LegendComponent, 
  TooltipComponent,
  GraphicComponent
} from 'echarts/components';
import { ExternalLink } from 'lucide-vue-next';
import type { TrafficSource } from '../../types/dashboard';

use([
  CanvasRenderer, 
  PieChart, 
  LegendComponent, 
  TooltipComponent,
  GraphicComponent
]);

const props = defineProps<{
  data: TrafficSource[];
}>();

const chartRef = ref<InstanceType<typeof VChart> | null>(null);

const totalValue = computed(() => {
  if (!props.data) return '0';
  const sum = props.data.reduce((acc, curr) => acc + curr.value, 0);
  return sum.toLocaleString();
});

const chartOption = computed(() => {
  // Use a half-donut pie chart logic (startAngle 180 to 0)
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E7EB',
      textStyle: { color: '#111827', fontWeight: 600 }
    },
    series: [
      {
        name: 'Channel Performance',
        type: 'pie',
        radius: ['60%', '90%'],
        center: ['50%', '65%'],
        startAngle: 180,
        endAngle: 0,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#FFFFFF',
          borderWidth: 4
        },
        label: { show: false, position: 'center' },
        emphasis: {
          label: { show: false }
        },
        labelLine: { show: false },
        data: props.data?.map((d, index) => ({
          name: d.name,
          value: d.value,
          // Re-map colors roughly to nexadash scheme if we want, or use original colors
          itemStyle: { color: index === 0 ? '#111827' : index === 1 ? '#9CA3AF' : '#E5E7EB' }
        })) || []
      }
    ],
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: '45%',
        bounding: 'raw',
        children: [
          {
            type: 'text',
            left: 'center',
            top: 0,
            style: {
              text: totalValue.value,
              textAlign: 'center',
              fill: '#111827',
              fontSize: 24,
              fontWeight: 800,
              fontFamily: 'Inter, sans-serif'
            }
          },
          {
            type: 'text',
            left: 'center',
            top: 28,
            style: {
              text: 'Product Sales',
              textAlign: 'center',
              fill: '#9CA3AF',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif'
            }
          }
        ]
      }
    ]
  };
});
</script>

<template>
  <div class="nexadash-card p-6 h-full flex flex-col justify-between">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-bold text-[#6b7280] uppercase tracking-wider flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
        Channel Performance
      </h3>
      <div class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-[#f3f4f6] cursor-pointer text-[#9ca3af] transition-colors border border-[#e5e7eb]">
        <ExternalLink class="w-3.5 h-3.5" />
      </div>
    </div>
    
    <div class="w-full h-[220px]">
      <VChart ref="chartRef" :option="chartOption" autoresize />
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <div v-for="(item, index) in data" :key="item.name" class="flex items-center justify-between">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 text-[14px] font-bold text-[#111827]">
            <div class="w-1.5 h-1.5 rounded-full" :class="index === 0 ? 'bg-[#111827]' : index === 1 ? 'bg-[#9CA3AF]' : 'bg-[#E5E7EB]'"></div>
            {{ item.name }}
          </div>
          <span class="text-[12px] text-[#6b7280] font-medium pl-3.5">{{ item.value.toLocaleString() }} Product Sold</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-[12px] font-bold" :class="item.percentage > 30 ? 'text-[#10B981]' : 'text-[#EF4444]'">
            {{ item.percentage > 30 ? '+' : '-' }}{{ item.percentage > 30 ? '1.8' : '2.8' }}%
          </span>
          <span class="text-[14px] font-bold text-[#111827] w-20 text-right">
            ${{ (item.value * 123).toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
