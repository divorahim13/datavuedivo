import { defineStore } from 'pinia';
import { dashboardService } from '../services/api';
import type { DashboardState, FilterType, KpiData } from '../types/dashboard';

// Mock data helpers
const createKpi = (id: string, label: string, value: string, change: number, trend: 'up'|'down', sparklineData: number[], icon: string): KpiData => ({ id, label, value, change, trend, sparklineData, icon });

const allTimeKpis: KpiData[] = [
  createKpi('users', 'TOTAL USERS', '84,291', 12.4, 'up', [30, 40, 35, 50, 49, 60, 70, 91, 125], 'users'),
  createKpi('revenue', 'MONTHLY REVENUE', '$124,500', 8.2, 'up', [10, 20, 15, 25, 22, 30, 28, 35, 45], 'dollar-sign'),
  createKpi('sessions', 'ACTIVE SESSIONS', '3,842', -2.1, 'down', [50, 40, 45, 30, 35, 25, 20, 15, 10], 'activity'),
  createKpi('conversion', 'CONVERSION RATE', '4.73%', 0.5, 'up', [2, 3, 2.5, 4, 3.8, 5, 4.5, 5.2, 6], 'shopping-cart'),
];

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    activeFilter: 'all',
    kpis: {
      all: allTimeKpis,
      monthly: [
         createKpi('users', 'TOTAL USERS', '14,320', 5.2, 'up', [20, 25, 22, 30, 28, 35], 'users'),
         createKpi('revenue', 'MONTHLY REVENUE', '$124,500', 8.2, 'up', [10, 20, 15, 25, 22, 30], 'dollar-sign'),
         createKpi('sessions', 'ACTIVE SESSIONS', '842', -1.1, 'down', [45, 30, 35, 25, 15, 10], 'activity'),
         createKpi('conversion', 'CONVERSION RATE', '3.8%', 1.2, 'up', [2, 3, 2.5, 4, 4.5, 6], 'shopping-cart'),
      ],
      weekly: [
         createKpi('users', 'TOTAL USERS', '3,120', 1.2, 'up', [5, 8, 7, 10, 12, 11, 15], 'users'),
         createKpi('revenue', 'WEEKLY REVENUE', '$28,400', 2.1, 'up', [2, 5, 4, 8, 7, 9, 12], 'dollar-sign'),
         createKpi('sessions', 'ACTIVE SESSIONS', '210', -0.5, 'down', [10, 8, 9, 7, 6, 5, 5], 'activity'),
         createKpi('conversion', 'CONVERSION RATE', '4.1%', 0.2, 'up', [1, 2, 1.5, 2.5, 2, 3, 3.5], 'shopping-cart'),
      ],
      daily: [
         createKpi('users', 'TOTAL USERS', '450', -0.4, 'down', [1, 2, 1.5, 1, 0.5], 'users'),
         createKpi('revenue', 'DAILY REVENUE', '$4,100', 4.2, 'up', [0.5, 1, 1.5, 2, 3], 'dollar-sign'),
         createKpi('sessions', 'ACTIVE SESSIONS', '45', 1.2, 'up', [2, 3, 4, 3, 5], 'activity'),
         createKpi('conversion', 'CONVERSION RATE', '5.2%', 0.8, 'up', [2, 3, 4, 4.5, 5.5], 'shopping-cart'),
      ]
    },
    revenueTrend: {
      all: [
        { month: 'Jan', revenue: 4000 }, { month: 'Feb', revenue: 4200 }, { month: 'Mar', revenue: 3800 },
        { month: 'Apr', revenue: 4400 }, { month: 'May', revenue: 3200 }, { month: 'Jun', revenue: 3600 },
        { month: 'Jul', revenue: 3800 }, { month: 'Aug', revenue: 3400 }, { month: 'Sep', revenue: 3700 },
        { month: 'Oct', revenue: 4100 }, { month: 'Nov', revenue: 4300 }, { month: 'Dec', revenue: 4900 },
      ],
      monthly: [
        { month: 'Jul', revenue: 3200 }, { month: 'Aug', revenue: 3400 }, { month: 'Sep', revenue: 3100 },
        { month: 'Oct', revenue: 3600 }, { month: 'Nov', revenue: 2900 }, { month: 'Dec', revenue: 3100 },
      ],
      weekly: [
        { month: 'W1', revenue: 820 }, { month: 'W2', revenue: 940 }, { month: 'W3', revenue: 780 },
        { month: 'W4', revenue: 1050 }, { month: 'W5', revenue: 890 }, { month: 'W6', revenue: 920 },
        { month: 'W7', revenue: 1100 }, { month: 'W8', revenue: 980 },
      ],
      daily: [
        { month: '1st', revenue: 120 }, { month: '2nd', revenue: 145 }, { month: '3rd', revenue: 98 },
        { month: '4th', revenue: 167 }, { month: '5th', revenue: 134 }, { month: '6th', revenue: 156 },
        { month: '7th', revenue: 189 }, { month: '8th', revenue: 143 }, { month: '9th', revenue: 167 },
        { month: '10th', revenue: 178 }, { month: '11th', revenue: 134 }, { month: '12th', revenue: 190 },
      ]
    },
    trafficSources: {
      all: [
        { name: 'Direct', value: 5680, percentage: 40, color: '#6366F1' },
        { name: 'Organic', value: 3550, percentage: 25, color: '#10B981' },
        { name: 'Social', value: 2840, percentage: 20, color: '#EF4444' }, 
        { name: 'Referral', value: 2130, percentage: 15, color: '#F59E0B' },
      ],
      monthly: [
        { name: 'Direct', value: 1200, percentage: 45, color: '#6366F1' },
        { name: 'Organic', value: 500, percentage: 20, color: '#10B981' },
        { name: 'Social', value: 500, percentage: 20, color: '#EF4444' }, 
        { name: 'Referral', value: 400, percentage: 15, color: '#F59E0B' },
      ],
      weekly: [
        { name: 'Direct', value: 400, percentage: 50, color: '#6366F1' },
        { name: 'Organic', value: 200, percentage: 25, color: '#10B981' },
        { name: 'Social', value: 120, percentage: 15, color: '#EF4444' }, 
        { name: 'Referral', value: 80, percentage: 10, color: '#F59E0B' },
      ],
      daily: [
        { name: 'Direct', value: 80, percentage: 60, color: '#6366F1' },
        { name: 'Organic', value: 40, percentage: 30, color: '#10B981' },
        { name: 'Social', value: 10, percentage: 5, color: '#EF4444' }, 
        { name: 'Referral', value: 5, percentage: 5, color: '#F59E0B' },
      ]
    },
    countries: [],
    topPages: {
      all: [
        { path: '/dashboard/home', visits: '45,120', time: '4m 12s', bounce: '12%', trend: 12 },
        { path: '/analytics/realtime', visits: '32,450', time: '2m 45s', bounce: '18%', trend: 18 },
        { path: '/settings/profile', visits: '12,120', time: '1m 15s', bounce: '42%', trend: -5 },
        { path: '/reports/financial', visits: '8,900', time: '8m 55s', bounce: '5%', trend: 3 },
        { path: '/auth/login', visits: '7,200', time: '0m 45s', bounce: '31%', trend: -12 },
        { path: '/help/docs', visits: '4,120', time: '3m 22s', bounce: '22%', trend: 2 },
      ],
      monthly: [
        { path: '/dashboard/home', visits: '6,100', time: '4m 10s', bounce: '15%', trend: 5 },
        { path: '/analytics/realtime', visits: '4,200', time: '2m 50s', bounce: '17%', trend: 8 },
        { path: '/settings/profile', visits: '2,100', time: '1m 20s', bounce: '40%', trend: -2 },
        { path: '/reports/financial', visits: '1,500', time: '8m 10s', bounce: '6%', trend: 1 },
        { path: '/auth/login', visits: '1,200', time: '0m 50s', bounce: '28%', trend: -5 },
        { path: '/help/docs', visits: '800', time: '3m 10s', bounce: '25%', trend: 1 },
      ],
      weekly: [
        { path: '/dashboard/home', visits: '1,500', time: '4m 05s', bounce: '14%', trend: 2 },
        { path: '/analytics/realtime', visits: '1,100', time: '2m 55s', bounce: '19%', trend: 4 },
        { path: '/settings/profile', visits: '500', time: '1m 25s', bounce: '44%', trend: -1 },
        { path: '/reports/financial', visits: '400', time: '8m 05s', bounce: '7%', trend: 0 },
        { path: '/auth/login', visits: '300', time: '0m 55s', bounce: '29%', trend: -2 },
        { path: '/help/docs', visits: '200', time: '3m 05s', bounce: '26%', trend: 0 },
      ],
      daily: [
        { path: '/dashboard/home', visits: '200', time: '4m 00s', bounce: '13%', trend: 1 },
        { path: '/analytics/realtime', visits: '150', time: '3m 00s', bounce: '20%', trend: 2 },
        { path: '/settings/profile', visits: '80', time: '1m 30s', bounce: '45%', trend: -1 },
        { path: '/reports/financial', visits: '60', time: '8m 00s', bounce: '8%', trend: 0 },
        { path: '/auth/login', visits: '50', time: '1m 00s', bounce: '30%', trend: -1 },
        { path: '/help/docs', visits: '30', time: '3m 00s', bounce: '27%', trend: 0 },
      ]
    },
    isLoading: false,
    error: null,
  }),
  getters: {
    currentKpis: (state) => state.kpis[state.activeFilter],
    currentRevenue: (state) => state.revenueTrend[state.activeFilter],
    currentTraffic: (state) => state.trafficSources[state.activeFilter],
    currentPages: (state) => state.topPages[state.activeFilter],
  },
  actions: {
    setFilter(filter: FilterType) {
      this.activeFilter = filter;
    },
    async initDashboard() {
      this.isLoading = true;
      this.error = null;
      try {
        const countryData = await dashboardService.getCountryAcquisitions();
        this.countries = countryData;
      } catch (err: any) {
        this.error = err.message || 'Failed to load dashboard data';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
