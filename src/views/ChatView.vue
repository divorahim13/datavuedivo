<script setup lang="ts">
import { ref } from 'vue';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-vue-next';

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline';
  avatar: string;
}

const contacts = ref<Contact[]>([
  { id: 1, name: 'Alice Smith', lastMessage: 'Great! Thanks for the update.', time: '10:42 AM', unread: 2, status: 'online', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Marketing Team', lastMessage: 'Did we finalize the assets?', time: 'Yesterday', unread: 0, status: 'offline', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Bob Johnson', lastMessage: 'Okay, I will check it.', time: 'Yesterday', unread: 0, status: 'online', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Charlie Davis', lastMessage: 'Can you send the invoice?', time: 'Monday', unread: 0, status: 'offline', avatar: 'https://i.pravatar.cc/150?img=4' },
]);

const activeChatId = ref(1);
</script>

<template>
  <div class="p-8 max-w-[1600px] mx-auto min-h-screen">
    <div class="nexadash-card flex h-[700px] overflow-hidden">
      
      <!-- Chat List (Sidebar) -->
      <div class="w-80 border-r border-[#e5e7eb] bg-[#f9fafb] flex flex-col shrink-0">
        <div class="p-4 border-b border-[#e5e7eb]">
          <h2 class="text-lg font-bold text-[#111827] mb-4 tracking-tight">Messages</h2>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
            <input type="text" placeholder="Search chats..." class="w-full h-10 pl-9 pr-4 bg-[#ffffff] border border-[#e5e7eb] rounded-lg text-[13px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6]">
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <button 
            v-for="contact in contacts" 
            :key="contact.id"
            @click="activeChatId = contact.id"
            class="w-full text-left flex items-center gap-3 p-4 border-b border-[#e5e7eb] hover:bg-[#ffffff] transition-colors"
            :class="activeChatId === contact.id ? 'bg-[#ffffff] border-l-2 border-l-[#3b82f6]' : 'border-l-2 border-l-transparent'"
          >
            <div class="relative">
              <img :src="contact.avatar" class="w-10 h-10 rounded-full object-cover">
              <div class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" :class="contact.status === 'online' ? 'bg-[#10b981]' : 'bg-[#e5e7eb]'"></div>
            </div>
            <div class="flex-1 overflow-hidden">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[13px] font-bold text-[#111827] truncate">{{ contact.name }}</span>
                <span class="text-[11px] font-semibold text-[#9ca3af] shrink-0">{{ contact.time }}</span>
              </div>
              <p class="text-[12px] text-[#6b7280] truncate font-medium" :class="contact.unread > 0 ? 'text-[#111827] font-bold' : ''">{{ contact.lastMessage }}</p>
            </div>
            <div v-if="contact.unread > 0" class="w-5 h-5 bg-[#ef4444] rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {{ contact.unread }}
            </div>
          </button>
        </div>
      </div>

      <!-- Chat Pane -->
      <div class="flex-1 flex flex-col bg-[#ffffff] relative">
        <!-- Chat Header -->
        <div class="h-[72px] border-b border-[#e5e7eb] px-6 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <img :src="contacts.find(c => c.id === activeChatId)?.avatar" class="w-10 h-10 rounded-full object-cover border border-[#e5e7eb]">
            <div>
              <h3 class="text-[15px] font-bold text-[#111827] leading-tight">{{ contacts.find(c => c.id === activeChatId)?.name }}</h3>
              <p class="text-[12px] font-medium text-[#10b981] leading-tight">Online</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f3f4f6] text-[#6b7280] transition-colors"><Phone class="w-4 h-4" /></button>
            <button class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f3f4f6] text-[#6b7280] transition-colors"><Video class="w-4 h-4" /></button>
            <button class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f3f4f6] text-[#6b7280] transition-colors"><MoreVertical class="w-4 h-4" /></button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-6 bg-[#f9fafb] custom-scrollbar flex flex-col group">
          <div class="flex flex-col justify-end min-h-full gap-6">
            <!-- Today Divider -->
            <div class="flex justify-center my-4">
              <div class="flex items-center gap-4 w-full">
                <div class="h-[1px] flex-1 bg-[#e5e7eb]"></div>
                <span class="px-3 py-1 text-[#9ca3af] text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Today</span>
                <div class="h-[1px] flex-1 bg-[#e5e7eb]"></div>
              </div>
            </div>
            
            <!-- Message 1 (Contact) -->
            <div class="flex items-end gap-3 max-w-[85%] group/msg">
              <img :src="contacts.find(c => c.id === activeChatId)?.avatar" class="w-8 h-8 rounded-full shadow-sm mb-1 object-cover">
              <div class="relative">
                <div class="bg-[#ffffff] border border-[#e5e7eb] p-4 rounded-2xl rounded-bl-sm shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-[13px] font-medium text-[#374151] leading-relaxed">
                  Hi Divo! Just checking in on the analytics redesign. Are we ready for the review meeting this afternoon?
                  <span class="block text-[10px] font-bold text-[#9ca3af] mt-2 text-right opacity-0 group-hover/msg:opacity-100 transition-opacity">10:40 AM</span>
                </div>
                <!-- Time showing on hover or simplified -->
                <span class="absolute -right-16 bottom-4 text-[10px] font-bold text-[#9ca3af] opacity-50 group-hover/msg:opacity-100 transition-opacity hidden xl:block">10:40 AM</span>
              </div>
            </div>

            <!-- Message 2 (User) -->
            <div class="flex flex-row-reverse items-end gap-3 max-w-[85%] self-end group/msg">
              <div class="relative">
                <div class="bg-[#3b82f6] text-white p-4 rounded-2xl rounded-br-sm shadow-[0_4px_12px_rgba(59,130,246,0.15)] text-[13px] font-semibold leading-relaxed">
                  Yes, everything is deployed to the staging environment! The new Light UI is fully applied across all components.
                  <span class="block text-[10px] font-bold text-[#93c5fd] mt-2 text-right opacity-0 group-hover/msg:opacity-100 transition-opacity">10:41 AM</span>
                </div>
                <span class="absolute -left-16 bottom-4 text-[10px] font-bold text-[#9ca3af] opacity-50 group-hover/msg:opacity-100 transition-opacity hidden xl:block text-right">10:41 AM</span>
              </div>
            </div>

            <!-- Message 3 (Contact) -->
            <div class="flex items-end gap-3 max-w-[85%] group/msg">
              <img :src="contacts.find(c => c.id === activeChatId)?.avatar" class="w-8 h-8 rounded-full shadow-sm mb-1 object-cover">
              <div class="relative">
                <div class="bg-[#ffffff] border border-[#e5e7eb] p-4 rounded-2xl rounded-bl-sm shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-[13px] font-medium text-[#374151] leading-relaxed">
                  Great! Thanks for the update.
                  <span class="block text-[10px] font-bold text-[#9ca3af] mt-2 text-right opacity-0 group-hover/msg:opacity-100 transition-opacity">10:42 AM</span>
                </div>
                <span class="absolute -right-16 bottom-4 text-[10px] font-bold text-[#9ca3af] opacity-50 group-hover/msg:opacity-100 transition-opacity hidden xl:block">10:42 AM</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input Area -->
        <div class="p-6 border-t border-[#e5e7eb] bg-[#ffffff] shrink-0">
          <div class="flex items-center gap-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-1.5 focus-within:border-[#3b82f6] focus-within:ring-4 focus-within:ring-[#3b82f6]/5 transition-all">
            <button class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#f3f4f6] text-[#9ca3af] transition-colors shrink-0">
              <Paperclip class="w-5 h-5" />
            </button>
            <input 
              type="text" 
              placeholder="Type your message..." 
              class="flex-1 h-10 bg-transparent border-none text-[14px] text-[#111827] placeholder-[#9ca3af] focus:outline-none px-2"
            >
            <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[#111827] hover:bg-[#1f2937] text-white transition-all shadow-sm active:scale-95 shrink-0">
              <Send class="w-4 h-4 ml-0.5" />
            </button>
          </div>
          <p class="text-[10px] text-[#9ca3af] font-bold text-center mt-3 uppercase tracking-widest opacity-50">Press Enter to send</p>
        </div>
      </div>
    </div>
  </div>
</template>
