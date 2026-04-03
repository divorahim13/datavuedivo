<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboardStore } from '../stores/dashboard';
import KpiCard from '../components/ui/KpiCard.vue';
import RevenueLineChart from '../components/charts/RevenueLineChart.vue';
import TrafficDonutChart from '../components/charts/TrafficDonutChart.vue';
import CountryBarChart from '../components/charts/CountryBarChart.vue';
import DataTable from '../components/ui/DataTable.vue';
import LoadingSkeleton from '../components/ui/LoadingSkeleton.vue';

const store = useDashboardStore();

onMounted(() => {
  store.initDashboard();
});
</script>

<template>
  <div class="p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
    
    <!-- KPI Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <template v-if="store.isLoading">
        <LoadingSkeleton v-for="i in 4" :key="i" class="h-32" />
      </template>
      <template v-else>
        <KpiCard
          v-for="kpi in store.currentKpis"
          :key="kpi.id"
          :id="kpi.id"
          :title="kpi.label"
          :value="kpi.value"
          :change="kpi.change"
          :trend="kpi.trend"
          :iconName="kpi.icon"
        />
      </template>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div>
        <LoadingSkeleton v-if="store.isLoading" class="w-full h-[400px]" />
        <TrafficDonutChart v-else :data="store.currentTraffic" />
      </div>
      <div class="lg:col-span-2">
        <LoadingSkeleton v-if="store.isLoading" class="w-full h-[400px]" />
        <RevenueLineChart v-else :data="store.currentRevenue" />
      </div>
    </div>

    <!-- Charts Row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1 h-full">
        <LoadingSkeleton v-if="store.isLoading" class="w-full h-full min-h-[500px]" />
        <DataTable v-else :pages="store.currentPages" />
      </div>
      <div class="lg:col-span-2 h-full">
        <LoadingSkeleton v-if="store.isLoading" class="w-full h-full min-h-[500px]" />
        <CountryBarChart v-else :data="store.countries" :loading="store.isLoading" />
      </div>
    </div>

  </div>
</template>
