<script setup lang="ts">
import { onMounted } from 'vue';
import AppSidebar from './components/layout/AppSidebar.vue';
import AppHeader from './components/layout/AppHeader.vue';
import ToastContainer from './components/ui/ToastContainer.vue';
import { useUiStore } from './stores/ui';

const uiStore = useUiStore();

onMounted(() => {
  if (uiStore.isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>

<template>
  <div class="h-screen overflow-hidden flex bg-[#f3f4f6] font-sans text-[#111827] selection:bg-primary/30 antialiased relative">
    <!-- Sidebar -->
    <AppSidebar />

    <div class="flex-1 flex flex-col overflow-hidden min-w-0">
      <!-- Header -->
      <AppHeader />

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <router-view v-slot="{ Component }">
          <transition 
            name="fade" 
            mode="out-in"
            enter-active-class="transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
    
    <ToastContainer />
  </div>
</template>
