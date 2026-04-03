<script setup lang="ts">
import { ref } from 'vue';
import { useUiStore } from '../stores/ui';
import { FileText, TrendingUp, DollarSign, Activity, Filter, Settings, RefreshCw, Download } from 'lucide-vue-next';

const uiStore = useUiStore();

interface ReportInfo {
  id: string;
  title: string;
  description: string;
  lastGenerated: string;
  icon: any;
  colorClass: string;
}

const reports: ReportInfo[] = [
  { id: '1', title: 'Weekly Summary', description: 'Comprehensive overview of KPIs from the last 7 days.', lastGenerated: '2 hours ago', icon: FileText, colorClass: 'text-blue-600 bg-blue-50 border border-blue-100' },
  { id: '2', title: 'User Growth', description: 'Detailed analysis of user acquisition and retention.', lastGenerated: '1 day ago', icon: TrendingUp, colorClass: 'text-emerald-600 bg-emerald-50 border border-emerald-100' },
  { id: '3', title: 'Revenue Report', description: 'Financial breakdown including MRR, ARR, and churn.', lastGenerated: '3 days ago', icon: DollarSign, colorClass: 'text-amber-600 bg-amber-50 border border-amber-100' },
  { id: '4', title: 'Traffic Analysis', description: 'Sources, paths, and behavior flow of all incoming traffic.', lastGenerated: '5 hours ago', icon: Activity, colorClass: 'text-rose-600 bg-rose-50 border border-rose-100' },
  { id: '5', title: 'Conversion Funnel', description: 'Drop-off rates across key stages of the user journey.', lastGenerated: '2 days ago', icon: Filter, colorClass: 'text-purple-600 bg-purple-50 border border-purple-100' },
  { id: '6', title: 'Custom Report', description: 'Generate a highly detailed report with custom parameters.', lastGenerated: 'Never', icon: Settings, colorClass: 'text-gray-500 bg-gray-50 border border-gray-200' },
];

const generatingMap = ref<Record<string, boolean>>({});

const generateReport = async (report: ReportInfo) => {
  if (generatingMap.value[report.id]) return;
  generatingMap.value[report.id] = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  generatingMap.value[report.id] = false;
  uiStore.addToast(`"${report.title}" generated successfully`, 'success');
};
</script>

<template>
  <div class="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="report in reports" 
        :key="report.id" 
        class="nexadash-card p-8 flex flex-col h-full hover:shadow-nexadash-hover hover:border-[#d1d5db] transition-all duration-300 group"
      >
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300" :class="report.colorClass">
            <component :is="report.icon" class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-[16px] font-bold text-[#111827] tracking-tight">{{ report.title }}</h3>
            <p class="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mt-1">Last: {{ report.lastGenerated }}</p>
          </div>
        </div>
        
        <p class="text-sm font-medium text-[#4b5563] mb-8 flex-1 leading-relaxed">{{ report.description }}</p>
        
        <button 
          @click="generateReport(report)"
          :disabled="generatingMap[report.id]"
          class="w-full h-10 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-300"
          :class="generatingMap[report.id] ? 'bg-[#f3f4f6] text-[#9ca3af] cursor-not-allowed border border-[#e5e7eb]' : 'bg-[#fff] text-[#111827] border border-[#e5e7eb] hover:bg-[#f9fafb]'"
        >
          <template v-if="generatingMap[report.id]">
            <RefreshCw class="w-4 h-4 animate-spin" />
            GENERATING...
          </template>
          <template v-else>
            <Download class="w-4 h-4 text-[#6b7280]" />
            GENERATE
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
