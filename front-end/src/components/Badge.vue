<template>
  <span class="badge" :class="`badge-${variant}`">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'gray',
    validator: v => ['blue', 'green', 'red', 'yellow', 'purple', 'gray'].includes(v)
  }
})
</script>

<style scoped>
.badge {
  @apply inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold;
}

.badge-blue {
  @apply bg-blue-100 text-blue-700;
}

.badge-green {
  @apply bg-green-100 text-green-700;
}

.badge-red {
  @apply bg-red-100 text-red-700;
}

.badge-yellow {
  @apply bg-yellow-100 text-yellow-700;
}

.badge-purple {
  @apply bg-purple-100 text-purple-700;
}

.badge-gray {
  @apply border border-slate-200 bg-slate-100 text-slate-500;
}
</style>
