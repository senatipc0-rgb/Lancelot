<template>
  <div class="form-card">
    <div class="form-card-header">
      <h2>{{ title }}</h2>
      <button v-if="closeable" class="btn-close" @click="close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="form-card-body">
      <slot />
    </div>
    <slot name="footer">
      <div class="form-card-footer">
        <button class="btn btn-ghost" @click="close">Cancelar</button>
        <button class="btn btn-primary" @click="save">Guardar</button>
      </div>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  closeable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'save'])

const close = () => emit('close')
const save = () => emit('save')
</script>

<style scoped>
.form-card-body {
  @apply p-5;
}

.form-card-footer {
  @apply flex justify-end gap-2 border-t border-slate-100 px-5 py-3.5;
}
</style>
