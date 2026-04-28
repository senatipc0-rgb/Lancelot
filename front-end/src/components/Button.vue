<template>
  <button
    class="btn"
    :class="[
      `btn-${variant}`,
      { 'btn-sm': size === 'sm' },
      { 'btn-lg': size === 'lg' },
      { 'opacity-60 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'ghost', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: Boolean
})

defineEmits(['click'])
</script>

<style scoped>
.btn-lg {
  @apply px-6 py-3 text-base;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}
</style>
