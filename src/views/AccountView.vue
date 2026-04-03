<script setup lang="ts">
import { ref } from 'vue';

const firstName = ref('Divo');
const lastName = ref('');
const email = ref('divo@datavue.com');
const bio = ref('Principal UI/UX Designer at DataVue Analytics.');
</script>

<template>
  <div class="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
    <div>
      <h2 class="text-2xl font-bold text-[#111827] tracking-tight">Personal Account</h2>
      <p class="text-sm font-medium text-[#6b7280] mt-1">Manage your personal profile and preferences.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Profile Picture -->
      <div class="col-span-1 border border-[#e5e7eb] bg-[#ffffff] rounded-[2rem] p-8 flex flex-col items-center">
        <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-[#e5e7eb] mb-6">
          <img src="https://i.pravatar.cc/150?img=11" class="w-full h-full object-cover">
        </div>
        <button class="w-full h-10 bg-[#f9fafb] border border-[#e5e7eb] text-[#111827] rounded-lg text-[13px] font-bold hover:bg-[#f3f4f6] transition-all">
          Change Avatar
        </button>
        <p class="text-[11px] text-[#9ca3af] font-medium mt-4 text-center">
          JPG, GIF or PNG. Max size of 800K
        </p>
      </div>

      <!-- Account Details Form -->
      <div class="col-span-1 lg:col-span-2 border border-[#e5e7eb] bg-[#ffffff] rounded-[2rem] p-8">
        <h3 class="text-[16px] font-bold text-[#111827] mb-6">Basic Information</h3>
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-[11px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">First Name</label>
              <input v-model="firstName" type="text" class="w-full h-10 px-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm font-semibold text-[#111827] focus:border-[#3b82f6] focus:outline-none">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">Last Name</label>
              <input v-model="lastName" type="text" class="w-full h-10 px-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm font-semibold text-[#111827] focus:border-[#3b82f6] focus:outline-none">
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">Email Address</label>
            <input v-model="email" type="email" class="w-full h-10 px-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm font-semibold text-[#111827] hover:cursor-not-allowed text-[#9ca3af]" disabled>
            <p class="text-[11px] text-[#9ca3af] font-medium mt-2 flex gap-1">Contact your workspace admin to change emails.</p>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">Short Bio</label>
            <textarea v-model="bio" rows="4" class="w-full p-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#111827] focus:border-[#3b82f6] focus:outline-none resize-none"></textarea>
          </div>
        </div>

        <div class="h-px w-full bg-[#f3f4f6] my-8"></div>

        <div class="flex items-center gap-4">
          <button class="h-10 px-6 bg-[#111827] hover:bg-[#374151] text-[#ffffff] rounded-lg text-[13px] font-bold transition-all shadow-sm">
            Save Profile
          </button>
          <button class="h-10 px-6 bg-[#ffffff] border border-[#e5e7eb] text-[#6b7280] hover:text-[#111827] hover:bg-[#f9fafb] rounded-lg text-[13px] font-bold transition-all shadow-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
