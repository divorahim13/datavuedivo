<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '../stores/dashboard';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, ScatterChart, HeatmapChart } from 'echarts/charts';
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent,
  VisualMapComponent
} from 'echarts/components';
import { Activity, Pointer } from 'lucide-vue-next';

use([
  CanvasRenderer, 
  LineChart, 
  ScatterChart, 
  HeatmapChart,
  GridComponent, 
  TooltipComponent, 
  LegendComponent,
  VisualMapComponent
]);

const store = useDashboardStore();

// Dynamic mock data based on activeFilter
const trafficData = computed(() => {
  const f = store.activeFilter;
  const multiplier = f === 'all' ? 1 : f === 'monthly' ? 0.3 : f === 'weekly' ? 0.1 : 0.05;
  return {
    organic: [120, 132, 101, 134, 90, 230, 210, 250, 260, 280, 290, 310].map(v => Math.round(v * multiplier)),
    paid: [220, 182, 191, 234, 290, 330, 310, 320, 330, 310, 340, 360].map(v => Math.round(v * multiplier)),
    referral: [150, 232, 201, 154, 190, 330, 410, 390, 380, 350, 310, 320].map(v => Math.round(v * multiplier)),
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
});

const pageViewsValue = computed(() => {
  const f = store.activeFilter;
  if(f === 'all') return '284,920';
  if(f === 'monthly') return '85,470';
  if(f === 'weekly') return '21,340';
  return '3,210';
});

const sessionsValue = computed(() => {
  const f = store.activeFilter;
  if(f === 'all') return '94,210';
  if(f === 'monthly') return '28,150';
  if(f === 'weekly') return '7,040';
  return '950';
});

const lineOptions = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', textStyle: { color: '#111827' } },
  legend: { top: 0, data: ['Organic', 'Paid', 'Referral'], textStyle: { color: '#6B7280' } },
  grid: { left: '3%', right: '4%', bottom: '5%', top: '15%', containLabel: true },
  xAxis: { type: 'category', boundaryGap: false, data: trafficData.value.months, axisLine: { lineStyle: { color: '#E5E7EB' } }, axisLabel: { color: '#6B7280' } },
  yAxis: { type: 'value', splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } }, axisLine: {show:false}, axisLabel: { color: '#6B7280' } },
  series: [
    { name: 'Organic', type: 'line', smooth: true, itemStyle: { color: '#10B981' }, data: trafficData.value.organic },
    { name: 'Paid', type: 'line', smooth: true, itemStyle: { color: '#3B82F6' }, data: trafficData.value.paid },
    { name: 'Referral', type: 'line', smooth: true, itemStyle: { color: '#F59E0B' }, data: trafficData.value.referral }
  ]
}));

const hours = Array.from({length: 24}, (_, i) => `${i}h`);
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const heatmapRaw = [];
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 24; j++) {
    heatmapRaw.push([j, i, Math.floor(Math.random() * 10)]);
  }
}

const heatmapOptions = {
  backgroundColor: 'transparent',
  tooltip: { position: 'top', backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', textStyle: { color: '#111827' } },
  grid: { height: '70%', top: '10%' },
  xAxis: { type: 'category', data: hours, splitArea: { show: true }, axisLabel: { color: '#6B7280' } },
  yAxis: { type: 'category', data: days, splitArea: { show: true }, axisLabel: { color: '#6B7280' } },
  visualMap: { min: 0, max: 10, calculable: true, orient: 'horizontal', left: 'center', bottom: '0%', textStyle: { color: '#6B7280' }},
  series: [{ name: 'Activity', type: 'heatmap', data: heatmapRaw, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.1)' } } }]
};

const scatterData = Array.from({length: 50}, () => [Math.floor(Math.random() * 300), Math.floor(Math.random() * 100)]);
const scatterOptions = {
  backgroundColor: 'transparent',
  tooltip: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', textStyle: { color: '#111827' }, formatter: (p: any) => `Duration: ${p.data[0]}s<br/>Bounce: ${p.data[1]}%` },
  grid: { left: '3%', right: '7%', bottom: '3%', containLabel: true },
  xAxis: { splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } }, axisLabel: { color: '#6B7280' }, name: 'Duration (s)', nameTextStyle: {color: '#6B7280'} },
  yAxis: { splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } }, axisLabel: { color: '#6B7280' }, name: 'Bounce %', nameTextStyle: {color: '#6B7280'} },
  series: [{ symbolSize: 10, data: scatterData, type: 'scatter', itemStyle: { color: '#F59E0B' } }]
};
</script>

<template>
  <div class="px-8 pb-8 space-y-8 max-w-[1600px] mx-auto pt-8">
    
    <!-- Top KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="nexadash-card p-8 flex flex-col justify-between group hover:shadow-nexadash-hover transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <Pointer class="w-5 h-5 text-[#9ca3af]" />
            <h3 class="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider">Page Views</h3>
          </div>
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold bg-[#dcfce7] text-[#166534]">
            Up +12%
          </div>
        </div>
        <div>
          <p class="text-3xl font-bold text-[#111827] tracking-tight mb-2">{{ pageViewsValue }}</p>
        </div>
      </div>
      
      <div class="nexadash-card p-8 flex flex-col justify-between group hover:shadow-nexadash-hover transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <Activity class="w-5 h-5 text-[#9ca3af]" />
            <h3 class="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider">Sessions</h3>
          </div>
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold bg-[#fee2e2] text-[#991b1b]">
            Down -3%
          </div>
        </div>
        <div>
          <p class="text-3xl font-bold text-[#111827] tracking-tight mb-2">{{ sessionsValue }}</p>
        </div>
      </div>
    </div>

    <!-- Multi-Line Chart -->
    <div class="nexadash-card p-8 overflow-hidden">
      <h3 class="text-lg font-bold text-[#111827] tracking-tight mb-6">Traffic Overview</h3>
      <div class="w-full h-[400px]">
        <VChart :option="lineOptions" autoresize />
      </div>
    </div>

    <!-- Split Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="nexadash-card p-8 overflow-hidden">
        <h3 class="text-lg font-bold text-[#111827] tracking-tight mb-6">Activity by Hour & Day</h3>
        <div class="w-full h-[320px]">
          <VChart :option="heatmapOptions" autoresize />
        </div>
      </div>
      <div class="nexadash-card p-8 overflow-hidden">
        <h3 class="text-lg font-bold text-[#111827] tracking-tight mb-6">Session Duration vs Bounce Rate</h3>
        <div class="w-full h-[320px]">
          <VChart :option="scatterOptions" autoresize />
        </div>
      </div>
    </div>

  </div>
</template>
