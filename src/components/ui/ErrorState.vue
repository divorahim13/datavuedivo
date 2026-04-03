<script setup lang="ts">
import { AlertTriangle, RefreshCw } from 'lucide-vue-next';

defineProps<{
  message: string;
}>();
defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-400">
    <AlertTriangle class="w-10 h-10 text-danger/80 mb-3" />
    <p class="text-sm font-medium mb-4">{{ message }}</p>
    <button 
      @click="$emit('retry')"
      class="flex items-center gap-2 px-4 py-2 bg-sidebar border border-border hover:border-primary/50 hover:text-white transition-all rounded-lg text-sm"
    >
      <RefreshCw class="w-4 h-4" />
      Retry
    </button>
  </div>
</template>
