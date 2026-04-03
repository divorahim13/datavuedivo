export type FilterType = 'all' | 'monthly' | 'weekly' | 'daily';

export interface KpiData {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  sparklineData: number[];
  icon: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface CountryData {
  name: string;
  count: number;
  code: string;
}

export interface PageData {
  path: string;
  visits: string;
  time: string;
  bounce: string;
  trend: number;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  status: 'Active' | 'Inactive' | 'New';
  country: string;
  joined: string;
}

export interface RevenueRecord {
  month: string;
  subscription: number;
  oneTime: number;
  refunds: number;
  netRevenue: number;
}

export interface ReportRecord {
  id: string;
  title: string;
  description: string;
  lastGenerated: string;
  icon: string;
}

export interface ChartData {
  name: string;
  data: number[];
}

export interface DashboardState {
  activeFilter: FilterType;
  kpis: Record<FilterType, KpiData[]>;
  revenueTrend: Record<FilterType, RevenueData[]>;
  trafficSources: Record<FilterType, TrafficSource[]>;
  countries: CountryData[];
  topPages: Record<FilterType, PageData[]>;
  isLoading: boolean;
  error: string | null;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
