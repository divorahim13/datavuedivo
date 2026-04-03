<script setup lang="ts">
import { computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent
} from 'echarts/components';
import { DollarSign, Activity, Users } from 'lucide-vue-next';

use([
  CanvasRenderer, 
  BarChart, 
  GridComponent, 
  TooltipComponent, 
  LegendComponent
]);

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const subData = [45000, 48000, 52000, 55000, 59000, 62000, 64000, 68000, 72000, 75000, 80000, 85000];
const oneTimeData = [12000, 15000, 10000, 18000, 14000, 20000, 16000, 22000, 18000, 24000, 21000, 28000];
const refundData = [1000, 1200, 800, 1500, 1100, 900, 1400, 1600, 1200, 1800, 1500, 2000];

const tableData = computed(() => {
  return months.map((m, i) => {
    const sub = subData[i];
    const ot = oneTimeData[i];
    const ref = refundData[i];
    const net = sub + ot - ref;
    return { month: m, subscription: sub, oneTime: ot, refunds: ref, netRevenue: net };
  });
});

const totals = computed(() => {
  return tableData.value.reduce((acc, curr) => {
    acc.subscription += curr.subscription;
    acc.oneTime += curr.oneTime;
    acc.refunds += curr.refunds;
    acc.netRevenue += curr.netRevenue;
    return acc;
  }, { month: 'Total', subscription: 0, oneTime: 0, refunds: 0, netRevenue: 0 });
});

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
};

const chartOption = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    textStyle: { color: '#111827' }
  },
  legend: {
    top: 0,
    data: ['Subscription', 'One-time', 'Refunds'],
    textStyle: { color: '#6B7280' }
  },
  grid: { top: '15%', left: '3%', right: '4%', bottom: '5%', containLabel: true },
  xAxis: {
    type: 'category',
    data: months,
    axisLine: { lineStyle: { color: '#E5E7EB' } },
    axisLabel: { color: '#6B7280' }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } },
    axisLabel: { color: '#6B7280', formatter: (val: number) => `$${val/1000}k` }
  },
  series: [
    {
      name: 'Subscription',
      type: 'bar',
      stack: 'total',
      itemStyle: { color: '#3B82F6' },
      data: subData
    },
    {
      name: 'One-time',
      type: 'bar',
      stack: 'total',
      itemStyle: { color: '#10B981' },
      data: oneTimeData
    },
    {
      name: 'Refunds',
      type: 'bar',
      stack: 'total',
      itemStyle: { color: '#EF4444' },
      data: refundData
    }
  ]
}));
</script>

<template>
  <div class="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="nexadash-card p-8 flex flex-col justify-between group hover:shadow-nexadash-hover transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <Activity class="w-5 h-5 text-[#9ca3af]" />
            <h3 class="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider">Monthly R.R (MRR)</h3>
          </div>
        </div>
        <div>
          <p class="text-3xl font-bold text-[#111827] tracking-tight mb-2">$124,500</p>
        </div>
      </div>
      <div class="nexadash-card p-8 flex flex-col justify-between group hover:shadow-nexadash-hover transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <DollarSign class="w-5 h-5 text-[#9ca3af]" />
            <h3 class="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider">Annual R.R (ARR)</h3>
          </div>
        </div>
        <div>
          <p class="text-3xl font-bold text-[#111827] tracking-tight mb-2">$1,494,000</p>
        </div>
      </div>
      <div class="nexadash-card p-8 flex flex-col justify-between group hover:shadow-nexadash-hover transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <Users class="w-5 h-5 text-[#9ca3af]" />
            <h3 class="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider">Avg Rev/User</h3>
          </div>
        </div>
        <div>
          <p class="text-3xl font-bold text-[#111827] tracking-tight mb-2">$42.30</p>
        </div>
      </div>
    </div>

    <!-- Chart Row -->
    <div class="nexadash-card p-8 overflow-hidden">
      <h3 class="text-lg font-bold text-[#111827] tracking-tight mb-6">Monthly Revenue Breakdown</h3>
      <div class="w-full h-[400px]">
        <VChart :option="chartOption" autoresize />
      </div>
    </div>

    <!-- Table -->
    <div class="nexadash-card p-8 overflow-hidden h-full flex flex-col min-h-[500px]">
      <h3 class="text-lg font-bold text-[#111827] tracking-tight mb-8">Revenue Data Log</h3>
      <div class="flex-1 overflow-auto custom-scrollbar">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest border-b border-[#e5e7eb]">
              <th class="pb-4 pt-2 px-4">Month</th>
              <th class="pb-4 pt-2 px-4 text-right">Subscription</th>
              <th class="pb-4 pt-2 px-4 text-right">One-time</th>
              <th class="pb-4 pt-2 px-4 text-right">Refunds</th>
              <th class="pb-4 pt-2 px-4 text-right">Net Revenue</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e5e7eb]">
            <tr v-for="row in tableData" :key="row.month" class="transition-colors group hover:bg-[#f9fafb]">
              <td class="py-4 px-4 text-sm font-bold text-[#111827]">{{ row.month }}</td>
              <td class="py-4 px-4 text-sm text-[#4b5563] font-semibold text-right">{{ formatCurrency(row.subscription) }}</td>
              <td class="py-4 px-4 text-sm text-[#4b5563] font-semibold text-right">{{ formatCurrency(row.oneTime) }}</td>
              <td class="py-4 px-4 text-sm text-[#ef4444] font-semibold text-right">-${{ row.refunds.toLocaleString() }}</td>
              <td class="py-4 px-4 text-sm font-bold text-[#111827] text-right">{{ formatCurrency(row.netRevenue) }}</td>
            </tr>
            <tr class="bg-[#f3f4f6]">
              <td class="py-4 px-4 text-sm font-bold text-[#111827] tracking-widest uppercase">{{ totals.month }}</td>
              <td class="py-4 px-4 text-sm font-bold text-[#111827] text-right">{{ formatCurrency(totals.subscription) }}</td>
              <td class="py-4 px-4 text-sm font-bold text-[#111827] text-right">{{ formatCurrency(totals.oneTime) }}</td>
              <td class="py-4 px-4 text-sm font-bold text-[#ef4444] text-right">-${{ totals.refunds.toLocaleString() }}</td>
              <td class="py-4 px-4 text-sm font-bold text-[#3b82f6] text-right">{{ formatCurrency(totals.netRevenue) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>
