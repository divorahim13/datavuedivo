<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '../stores/ui';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Bell, 
  Users, 
  AlertTriangle,
} from 'lucide-vue-next';

const router = useRouter();
const uiStore = useUiStore();

const tabs = [
  { id: 'general', name: 'General', icon: SettingsIcon },
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'team', name: 'Team Members', icon: Users },
  { id: 'danger', name: 'Danger Zone', icon: AlertTriangle },
];

const activeTab = ref('general');

// General Form state
const workspaceName = ref('DataVue Intelligence');
const contactEmail = ref('admin@datavue.io');

const saveChanges = () => {
  uiStore.addToast('Settings saved successfully.', 'success');
};

// Danger Zone state
const showDeleteModal = ref(false);
const deleteConfirmText = ref('');
const isDeleteMatched = computed(() => deleteConfirmText.value === workspaceName.value);

const confirmDelete = () => {
  if (isDeleteMatched.value) {
    showDeleteModal.value = false;
    uiStore.addToast('Workspace deleted permanently.', 'error');
    router.push('/');
  }
};
</script>

<template>
  <div class="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen relative">
    
    <div class="nexadash-card flex flex-col lg:flex-row min-h-[700px] overflow-hidden">
      <!-- Settings Sidebar -->
      <aside class="w-full lg:w-72 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#e5e7eb] bg-[#f9fafb]">
        <div class="p-8 pb-4">
          <h3 class="text-xl font-bold text-[#111827] tracking-tight">Settings</h3>
        </div>
        <nav class="flex flex-row lg:flex-col lg:py-2 px-4">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex items-center gap-3 h-10 px-4 rounded-lg transition-all duration-300 text-left w-full font-semibold text-[13px] mb-1"
            :class="activeTab === tab.id 
              ? 'bg-[#ffffff] text-[#111827] border border-[#e5e7eb] shadow-sm' 
              : 'border border-transparent text-[#6b7280] hover:text-[#111827] hover:bg-[#ffffff]'"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            <span>{{ tab.name }}</span>
          </button>
        </nav>
      </aside>

      <!-- Content Area -->
      <div class="flex-1 p-8 lg:p-12 max-w-3xl bg-[#ffffff]">
        
        <!-- General Tab -->
        <div v-if="activeTab === 'general'" class="space-y-8">
          <div>
            <h3 class="text-2xl font-bold text-[#111827]">General Settings</h3>
            <p class="text-sm font-medium text-[#6b7280] mt-2">Manage your workspace identity and contact details.</p>
          </div>
          
          <div class="h-[1px] w-full bg-[#f3f4f6]"></div>
          
          <div class="space-y-6 max-w-md">
            <div>
              <label class="block text-[11px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">Workspace Name</label>
              <input 
                v-model="workspaceName"
                type="text" 
                class="w-full h-10 px-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm font-semibold text-[#111827] focus:border-[#3b82f6] focus:outline-none transition-colors"
              >
            </div>
            <div>
              <label class="block text-[11px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">Contact Email</label>
              <input 
                v-model="contactEmail"
                type="email" 
                class="w-full h-10 px-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm font-semibold text-[#111827] focus:border-[#3b82f6] focus:outline-none transition-colors"
              >
            </div>
          </div>

          <div class="mt-8 pt-8 flex">
            <button @click="saveChanges" class="h-10 px-6 bg-[#111827] hover:bg-[#374151] text-[#ffffff] rounded-lg text-[13px] font-bold transition-all shadow-sm">
              Save Changes
            </button>
          </div>
        </div>

        <!-- Appearance Tab -->
        <div v-if="activeTab === 'appearance'" class="space-y-8">
          <div>
            <h3 class="text-2xl font-bold text-[#111827]">Appearance</h3>
            <p class="text-sm font-medium text-[#6b7280] mt-2">Manage the application's overall interface theme.</p>
          </div>
          
          <div class="h-[1px] w-full bg-[#f3f4f6]"></div>
          
          <div class="flex items-center justify-between max-w-md bg-[#f9fafb] p-6 rounded-xl border border-[#e5e7eb]">
            <div>
              <h4 class="text-sm font-bold text-[#111827] mb-1">Interface Theme</h4>
              <p class="text-xs font-medium text-[#6b7280]">Toggle between light and dark mode.</p>
            </div>
            <button 
              @click="uiStore.toggleDarkMode"
              class="relative w-12 h-6 rounded-full transition-colors flex items-center px-1"
              :class="uiStore.isDarkMode ? 'bg-[#3b82f6]' : 'bg-[#d1d5db]'"
            >
              <div 
                class="w-4 h-4 bg-[#ffffff] rounded-full transition-transform transform shadow-sm"
                :class="uiStore.isDarkMode ? 'translate-x-6' : 'translate-x-0'"
              >
              </div>
            </button>
          </div>
        </div>

        <!-- Placeholder Tabs -->
        <div v-if="activeTab === 'notifications' || activeTab === 'team'" class="space-y-8">
          <div>
            <h3 class="text-2xl font-bold text-[#111827] capitalize">{{ activeTab }} Settings</h3>
            <p class="text-sm font-medium text-[#6b7280] mt-2">Work in progress...</p>
          </div>
        </div>

        <!-- Danger Zone Tab -->
        <div v-if="activeTab === 'danger'" class="space-y-8">
          <div>
            <h3 class="text-2xl font-bold text-[#111827]">Danger Zone</h3>
            <p class="text-sm font-medium text-[#6b7280] mt-2">Permanent actions relating to your workspace.</p>
          </div>
          
          <div class="h-[1px] w-full bg-[#f3f4f6]"></div>
          
          <div class="p-6 border border-[#fca5a5] bg-[#fef2f2] rounded-xl max-w-md">
            <h4 class="text-sm font-bold text-[#dc2626] mb-2">Delete Workspace</h4>
            <p class="text-xs font-medium text-[#7f1d1d] mb-6 leading-relaxed">Once you delete your workspace, there is no going back. Please be certain.</p>
            <button 
              @click="showDeleteModal = true"
              class="h-10 px-6 border border-[#ef4444] text-[#dc2626] bg-[#ffffff] hover:bg-[#ef4444] hover:text-[#ffffff] rounded-lg text-[13px] font-bold transition-all shadow-sm"
            >
              Delete Workspace
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal Backdrop & Dialog -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-sm">
      <div class="relative w-full max-w-[420px] bg-[#ffffff] border border-[#e5e7eb] rounded-2xl p-8 shadow-xl">
        <h3 class="text-xl font-bold text-[#111827] mb-2">Delete Workspace</h3>
        <p class="text-sm font-medium text-[#6b7280] leading-relaxed mb-8">
          Are you sure? This action is <span class="text-[#dc2626] font-bold">irreversible</span>.
        </p>
        
        <div class="mb-8">
          <label class="block text-[11px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">
            Type "{{ workspaceName }}" to confirm
          </label>
          <input 
            v-model="deleteConfirmText"
            type="text" 
            class="w-full h-10 px-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm font-semibold text-[#111827] focus:border-[#ef4444] focus:outline-none transition-colors"
          >
        </div>

        <div class="flex items-center justify-end gap-3">
          <button 
            @click="showDeleteModal = false; deleteConfirmText = ''"
            class="h-10 px-6 rounded-lg text-[13px] font-bold text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] transition-all"
          >
            Cancel
          </button>
          <button 
            @click="confirmDelete"
            :disabled="!isDeleteMatched"
            class="h-10 px-6 rounded-lg text-[13px] font-bold text-[#ffffff] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed bg-[#ef4444] hover:bg-[#dc2626] shadow-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
