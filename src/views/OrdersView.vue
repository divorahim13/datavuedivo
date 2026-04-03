<script setup lang="ts">
import { ref } from 'vue';
import { Search, Filter, MoreHorizontal, Download } from 'lucide-vue-next';

const orders = ref([
  { id: '#ORD-7001', customer: 'Alice Smith', date: '2023-10-15', total: '$1,249.00', status: 'Completed' },
  { id: '#ORD-7002', customer: 'Bob Johnson', date: '2023-10-14', total: '$899.00', status: 'Pending' },
  { id: '#ORD-7003', customer: 'Charlie Davis', date: '2023-10-14', total: '$3,400.50', status: 'Processing' },
  { id: '#ORD-7004', customer: 'Diana Ross', date: '2023-10-12', total: '$150.00', status: 'Completed' },
  { id: '#ORD-7005', customer: 'Edward King', date: '2023-10-11', total: '$65.00', status: 'Failed' },
]);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-[#dcfce7] text-[#166534]';
    case 'Pending': return 'bg-[#fef9c3] text-[#854d0e]';
    case 'Processing': return 'bg-[#dbeafe] text-[#1e40af]';
    case 'Failed': return 'bg-[#fee2e2] text-[#991b1b]';
    default: return 'bg-[#f3f4f6] text-[#4b5563]';
  }
};
</script>

<template>
  <div class="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-[#111827] tracking-tight">Order Management</h2>
      <button class="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white rounded-lg text-[13px] font-bold hover:bg-[#1f2937] transition-all shadow-sm">
        <Download class="w-4 h-4" />
        Export CSV
      </button>
    </div>

    <div class="nexadash-card p-6 min-h-[600px] flex flex-col">
      <div class="flex items-center gap-4 mb-6">
        <div class="relative w-72">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
          <input type="text" placeholder="Search orders..." class="w-full h-10 pl-10 pr-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-[13px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6]">
        </div>
        <button class="flex items-center gap-2 h-10 px-4 border border-[#e5e7eb] rounded-lg text-[13px] font-bold text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#111827] transition-all">
          <Filter class="w-4 h-4" />
          More Filters
        </button>
      </div>

      <div class="flex-1 overflow-auto custom-scrollbar">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider border-b border-[#e5e7eb]">
              <th class="pb-3 px-4">Order ID</th>
              <th class="pb-3 px-4">Customer</th>
              <th class="pb-3 px-4">Date</th>
              <th class="pb-3 px-4">Status</th>
              <th class="pb-3 px-4 text-right">Total</th>
              <th class="pb-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e5e7eb]">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-[#f9fafb] transition-colors group">
              <td class="py-4 px-4 text-[13px] font-bold text-[#3b82f6]">{{ order.id }}</td>
              <td class="py-4 px-4 text-[14px] font-bold text-[#111827]">{{ order.customer }}</td>
              <td class="py-4 px-4 text-[13px] text-[#6b7280] font-medium">{{ order.date }}</td>
              <td class="py-4 px-4">
                <span class="px-2.5 py-1 rounded-md text-[11px] font-bold" :class="getStatusColor(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="py-4 px-4 text-[14px] font-bold text-[#111827] text-right">{{ order.total }}</td>
              <td class="py-4 px-4 text-center">
                <button class="w-8 h-8 mx-auto flex items-center justify-center rounded-md hover:bg-[#e5e7eb] text-[#6b7280] transition-colors border border-transparent">
                  <MoreHorizontal class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
