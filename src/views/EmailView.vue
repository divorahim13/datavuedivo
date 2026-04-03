<script setup lang="ts">
import { ref } from 'vue';
import { Inbox, Send as SendIcon, FileText, Trash2, Search, Edit3, MoreHorizontal, Star } from 'lucide-vue-next';

interface Email {
  id: number;
  sender: string;
  subject: string;
  snippet: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
}

const emails = ref<Email[]>([
  { id: 1, sender: 'Stripe', subject: 'Your weekly payout is on the way', snippet: 'A payout of $12,450.00 is on its way to your bank account and will arrive by...', time: '10:45 AM', isRead: false, isStarred: true },
  { id: 2, sender: 'GitHub', subject: '[datavue/frontend] Pull request merged', snippet: 'Divo merged PR #42: "Implement Nexadash UI Theme"...', time: '9:12 AM', isRead: false, isStarred: false },
  { id: 3, sender: 'Emily Chen', subject: 'Re: Project Kickoff', snippet: 'Thanks for sending over the assets Divo. I will review them with the team and get back...', time: 'Yesterday', isRead: true, isStarred: false },
  { id: 4, sender: 'DigitalOcean', subject: 'Invoice for September 2023', snippet: 'Your invoice for the billing period Sep 1 - Sep 30 is now available. The total amount...', time: 'Oct 1', isRead: true, isStarred: false },
  { id: 5, sender: 'Alex From Marketing', subject: 'New copy iterations', snippet: 'Hey team, I put together a few variations for the landing page hero section. Let me...', time: 'Oct 1', isRead: true, isStarred: true },
]);

const activeFolder = ref('inbox');
</script>

<template>
  <div class="p-8 max-w-[1600px] mx-auto min-h-screen">
    <div class="nexadash-card flex h-[700px] overflow-hidden">
      
      <!-- Folders Sidebar -->
      <div class="w-64 border-r border-[#e5e7eb] bg-[#f9fafb] flex flex-col shrink-0">
        <div class="p-4 border-b border-[#e5e7eb]">
          <button class="w-full h-10 flex items-center justify-center gap-2 bg-[#3b82f6] text-white rounded-lg text-[13px] font-bold hover:bg-[#2563eb] transition-all shadow-sm">
            <Edit3 class="w-4 h-4" />
            Compose
          </button>
        </div>
        
        <nav class="p-4 space-y-1">
          <button @click="activeFolder = 'inbox'" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors" :class="activeFolder === 'inbox' ? 'bg-[#e0f2fe] text-[#0284c7]' : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]'">
            <div class="flex items-center gap-3">
              <Inbox class="w-4 h-4" />
              <span>Inbox</span>
            </div>
            <span v-if="activeFolder === 'inbox'" class="bg-[#0284c7] text-white py-0.5 px-2 rounded-full text-[10px]">2</span>
          </button>
          
          <button @click="activeFolder = 'sent'" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors" :class="activeFolder === 'sent' ? 'bg-[#e0f2fe] text-[#0284c7]' : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]'">
            <div class="flex items-center gap-3">
              <SendIcon class="w-4 h-4" />
              <span>Sent</span>
            </div>
          </button>

          <button @click="activeFolder = 'drafts'" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors" :class="activeFolder === 'drafts' ? 'bg-[#e0f2fe] text-[#0284c7]' : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]'">
            <div class="flex items-center gap-3">
              <FileText class="w-4 h-4" />
              <span>Drafts</span>
            </div>
          </button>

          <button @click="activeFolder = 'trash'" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors" :class="activeFolder === 'trash' ? 'bg-[#e0f2fe] text-[#0284c7]' : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]'">
            <div class="flex items-center gap-3">
              <Trash2 class="w-4 h-4" />
              <span>Trash</span>
            </div>
          </button>
        </nav>
      </div>

      <!-- Email ListPane -->
      <div class="flex-1 flex flex-col bg-[#ffffff] relative">
        <!-- Toolbar -->
        <div class="h-14 border-b border-[#e5e7eb] px-4 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-4">
            <input type="checkbox" class="w-4 h-4 rounded text-[#3b82f6] border-[#d1d5db] focus:ring-[#3b82f6]">
            <button class="text-[#6b7280] hover:text-[#111827] transition-colors"><Trash2 class="w-4 h-4" /></button>
            <button class="text-[#6b7280] hover:text-[#111827] transition-colors"><MoreHorizontal class="w-4 h-4" /></button>
          </div>
          <div class="relative w-64">
            <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
            <input type="text" placeholder="Search emails..." class="w-full h-8 pl-3 pr-9 bg-[#f9fafb] border border-[#e5e7eb] rounded-md text-[12px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6]">
          </div>
        </div>

        <!-- Emails -->
        <div class="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#e5e7eb]">
          <div 
            v-for="email in emails" 
            :key="email.id"
            class="flex items-center gap-4 p-4 hover:bg-[#f9fafb] transition-colors cursor-pointer"
            :class="!email.isRead ? 'bg-[#f0f9ff]' : ''"
          >
            <div class="flex items-center gap-3 shrink-0">
              <input type="checkbox" class="w-4 h-4 rounded text-[#3b82f6] border-[#d1d5db] focus:ring-[#3b82f6]">
              <Star 
                class="w-4 h-4" 
                :class="email.isStarred ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-[#d1d5db]'" 
              />
            </div>
            
            <div class="w-40 shrink-0 text-[13px]" :class="!email.isRead ? 'font-bold text-[#111827]' : 'font-semibold text-[#4b5563]'">
              {{ email.sender }}
            </div>

            <div class="flex-1 flex items-center gap-2 overflow-hidden text-[13px]">
              <span :class="!email.isRead ? 'font-bold text-[#111827]' : 'font-semibold text-[#111827]'">{{ email.subject }}</span>
              <span class="text-[#9ca3af] mx-1">-</span>
              <span class="text-[#6b7280] truncate">{{ email.snippet }}</span>
            </div>

            <div class="shrink-0 text-[12px] font-semibold text-[#9ca3af] w-20 text-right">
              {{ email.time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
