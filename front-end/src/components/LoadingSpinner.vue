<template>
  <div class="loading-container">
    <div class="spinner-large"></div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: String
})
</script>

<style scoped>
.loading-container {
  @apply flex flex-col items-center justify-center py-12;
}

.spinner-large {
  @apply h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600;
}

.loading-text {
  @apply mt-4 text-sm text-slate-600;
}
</style>
