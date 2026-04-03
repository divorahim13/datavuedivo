<script setup lang="ts">
import { useUiStore } from '../../stores/ui';
import { CheckCircle2, AlertCircle, Info } from 'lucide-vue-next';

const uiStore = useUiStore();
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
    <transition-group 
      name="toast"
      enter-active-class="transform transition-all duration-300 ease-out-back"
      enter-from-class="translate-y-10 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transform transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="-translate-y-2 opacity-0 scale-95"
    >
      <div 
        v-for="toast in uiStore.activeToasts" 
        :key="toast.id"
        class="bg-card border border-border shadow-2xl rounded-2xl p-4 min-w-[320px] pointer-events-auto flex items-center gap-3"
      >
        <CheckCircle2 v-if="toast.type === 'success'" class="w-5 h-5 text-success shrink-0" />
        <AlertCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-danger shrink-0" />
        <Info v-else class="w-5 h-5 text-primary shrink-0" />
        
        <p class="text-sm font-semibold text-gray-200 m-0">{{ toast.message }}</p>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.ease-out-back {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
