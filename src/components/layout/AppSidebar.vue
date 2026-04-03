<script setup lang="ts">
import { 
  LayoutDashboard, Box, ShoppingCart, Users, MessageSquare, 
  Mail, BarChart3, Link, Activity, Shield, UserCircle, Settings
} from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute();

const menuSections = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/overview' },
      { name: 'Product', icon: Box, path: '/revenue' },
      { name: 'Order', icon: ShoppingCart, path: '/orders' },
      { name: 'Customer', icon: Users, path: '/users' },
      { name: 'Chat', icon: MessageSquare, path: '/chat', badge: '2' },
    ]
  },
  {
    title: 'OTHER',
    items: [
      { name: 'Email', icon: Mail, path: '/email', badge: '3' },
      { name: 'Analytics', icon: BarChart3, path: '/analytics' },
      { name: 'Integration', icon: Link, path: '/integrations' },
      { name: 'Performance', icon: Activity, path: '/reports' },
    ]
  },
  {
    title: 'ACCOUNT',
    items: [
      { name: 'Members', icon: Shield, path: '/members' },
      { name: 'Account', icon: UserCircle, path: '/account' },
      { name: 'Setting', icon: Settings, path: '/settings' },
    ]
  }
];

const isActive = (path: string) => path !== '#' && route.path === path;
</script>

<template>
  <aside class="w-[260px] bg-white border-r border-[#E5E7EB] hidden lg:flex flex-col flex-shrink-0 z-50 h-screen overflow-y-auto custom-scrollbar">
    <!-- Logo Section -->
    <div class="h-[88px] flex items-center px-6 shrink-0 mt-2">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#1e293b] rounded-[12px] flex items-center justify-center shadow-sm">
          <div class="w-5 h-5 bg-gradient-to-tr from-[#38bdf8] to-[#10b981] rounded-[6px] transform rotate-12"></div>
        </div>
        <div class="flex flex-col">
          <h1 class="text-[17px] font-bold text-[#111827] leading-tight">DataVue</h1>
          <p class="text-[12px] text-[#6b7280] font-medium leading-tight">Analytics</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-4 space-y-8">
      <div v-for="section in menuSections" :key="section.title">
        <h3 class="px-2 text-[11px] font-bold text-[#9ca3af] tracking-wider mb-3">{{ section.title }}</h3>
        <ul class="space-y-1">
          <li v-for="item in section.items" :key="item.name">
            <router-link
              :to="item.path"
              class="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group font-semibold text-[14px]"
              :class="isActive(item.path) 
                ? 'bg-transparent text-[#111827]' 
                : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]'"
            >
              <div class="flex items-center gap-3">
                <div class="relative flex items-center">
                  <!-- Active Indicator -->
                  <div v-if="isActive(item.path)" class="absolute -left-3 w-1 h-5 bg-[#111827] rounded-r-md"></div>
                  <component 
                    :is="item.icon" 
                    class="w-[18px] h-[18px]"
                    :class="isActive(item.path) ? 'text-[#111827]' : 'text-[#9ca3af] group-hover:text-[#6b7280]'"
                  />
                </div>
                <span>{{ item.name }}</span>
              </div>
              <div v-if="item.badge" class="w-5 h-5 bg-[#ef4444] text-white text-[11px] font-bold flex items-center justify-center rounded-full">
                {{ item.badge }}
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Bottom Profile -->
    <div class="p-4 mb-4">
      <div class="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] bg-[#f9fafb]">
        <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" class="w-9 h-9 rounded-full object-cover">
        <div class="overflow-hidden">
          <p class="text-[14px] font-bold text-[#111827] truncate">Divo</p>
          <p class="text-[12px] font-medium text-[#6b7280] truncate">divo@datavue.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>
