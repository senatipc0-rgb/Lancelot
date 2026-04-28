<template>
  <div
    class="alert"
    :class="`alert-${type}`"
    role="alert"
  >
    <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <template v-if="type === 'success'">
        <polyline points="20 6 9 17 4 12"/>
      </template>
      <template v-else-if="type === 'error'">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </template>
      <template v-else-if="type === 'warning'">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </template>
      <template v-else>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </template>
    </svg>
    <span class="alert-text">
      <slot />
    </span>
    <button v-if="closeable" class="alert-close" @click="close" aria-label="Cerrar alerta">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'info',
    validator: v => ['success', 'error', 'warning', 'info'].includes(v)
  },
  closeable: {
    type: Boolean,
    default: true
  }
})

const visible = ref(true)

const close = () => {
  visible.value = false
}
</script>

<style scoped>
.alert {
  @apply flex items-center gap-3 rounded-lg border p-4;
}

.alert-success {
  @apply border-green-200 bg-green-50 text-green-700;
}

.alert-error {
  @apply border-red-200 bg-red-50 text-red-700;
}

.alert-warning {
  @apply border-yellow-200 bg-yellow-50 text-yellow-700;
}

.alert-info {
  @apply border-blue-200 bg-blue-50 text-blue-700;
}

.alert-icon {
  @apply h-5 w-5 shrink-0;
}

.alert-text {
  @apply flex-1 text-sm font-medium;
}

.alert-close {
  @apply p-1 transition hover:opacity-70;
}

.alert-close svg {
  @apply h-4 w-4;
}
</style>
