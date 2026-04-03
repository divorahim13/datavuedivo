<script setup lang="ts">
import { ref } from 'vue';
import { Shield, Mail, MoreHorizontal, UserPlus } from 'lucide-vue-next';

const members = ref([
  { id: 1, name: 'Divo', email: 'divo@datavue.com', role: 'Owner', lastActive: 'Just now', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'Alice Smith', email: 'alice@datavue.com', role: 'Admin', lastActive: '2 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 3, name: 'Bob Johnson', email: 'bob@datavue.com', role: 'Editor', lastActive: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Charlie Davis', email: 'charlie@datavue.com', role: 'Viewer', lastActive: '3 days ago', avatar: 'https://i.pravatar.cc/150?img=4' },
]);
</script>

<template>
  <div class="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-[#111827] tracking-tight">Team Members</h2>
        <p class="text-sm font-medium text-[#6b7280] mt-1">Manage who has access to this workspace.</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white rounded-lg text-[13px] font-bold hover:bg-[#1f2937] transition-all shadow-sm">
        <UserPlus class="w-4 h-4" />
        Invite Member
      </button>
    </div>

    <div class="nexadash-card p-0 overflow-hidden flex flex-col">
      <div class="p-6 border-b border-[#e5e7eb] flex items-center gap-4 bg-[#f9fafb]">
        <div class="relative w-72">
          <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
          <input type="text" placeholder="Invite by email address..." class="w-full h-10 pl-10 pr-4 bg-[#ffffff] border border-[#e5e7eb] rounded-lg text-[13px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6]">
        </div>
        <button class="h-10 px-4 bg-[#ffffff] border border-[#e5e7eb] rounded-lg text-[13px] font-bold text-[#111827] hover:bg-[#f3f4f6] transition-all">
          Send Invite
        </button>
      </div>

      <div class="flex-1 overflow-auto custom-scrollbar">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider border-b border-[#e5e7eb]">
              <th class="pb-3 pt-4 px-6">Member</th>
              <th class="pb-3 pt-4 px-6">Role</th>
              <th class="pb-3 pt-4 px-6">Last Active</th>
              <th class="pb-3 pt-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e5e7eb]">
            <tr v-for="member in members" :key="member.id" class="hover:bg-[#f9fafb] transition-colors group">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <img :src="member.avatar" class="w-9 h-9 rounded-full object-cover border border-[#e5e7eb]">
                  <div>
                    <h3 class="text-[14px] font-bold text-[#111827]">{{ member.name }}</h3>
                    <p class="text-[12px] font-medium text-[#6b7280]">{{ member.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <Shield v-if="member.role === 'Owner' || member.role === 'Admin'" class="w-3.5 h-3.5 text-[#3b82f6]" />
                  <span class="text-[13px] font-semibold text-[#4b5563]">{{ member.role }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-[13px] text-[#6b7280] font-medium">{{ member.lastActive }}</td>
              <td class="py-4 px-6 text-right">
                <button class="w-8 h-8 ml-auto flex items-center justify-center rounded-md hover:bg-[#e5e7eb] text-[#6b7280] transition-colors">
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
