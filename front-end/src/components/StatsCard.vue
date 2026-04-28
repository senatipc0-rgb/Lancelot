<template>
  <div class="stats-card">
    <div class="stats-header">
      <span class="stats-label">{{ label }}</span>
      <div class="stats-icon" :class="`icon-${color}`">
        <slot name="icon">📊</slot>
      </div>
    </div>
    <div class="stats-value">{{ value }}</div>
    <div class="stats-footer">
      <span :class="`text-${color}-600`">{{ change }}</span>
      <span class="text-slate-500">vs mes anterior</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  change: String,
  color: {
    type: String,
    default: 'blue'
  }
})
</script>

<style scoped>
.stats-card {
  @apply rounded-2xl border border-slate-200 bg-white p-5 shadow-sm;
}

.stats-header {
  @apply mb-4 flex items-center justify-between;
}

.stats-label {
  @apply text-sm font-semibold text-slate-600;
}

.stats-icon {
  @apply flex items-center justify-center h-10 w-10 rounded-lg text-lg;
}

.icon-blue {
  @apply bg-blue-100 text-blue-600;
}

.icon-green {
  @apply bg-green-100 text-green-600;
}

.icon-red {
  @apply bg-red-100 text-red-600;
}

.icon-yellow {
  @apply bg-yellow-100 text-yellow-600;
}

.stats-value {
  @apply mb-2 text-3xl font-bold text-slate-900;
}

.stats-footer {
  @apply flex items-center gap-2 text-sm;
}

.text-blue-600 {
  @apply text-blue-600;
}

.text-green-600 {
  @apply text-green-600;
}

.text-red-600 {
  @apply text-red-600;
}

.text-yellow-600 {
  @apply text-yellow-600;
}

.text-slate-500 {
  @apply text-slate-500;
}
</style>
