<template>
  <div class="table-card">
    <div v-if="toolbar" class="table-toolbar">
      <slot name="toolbar" />
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data" :key="row.id">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :value="row[col.key]" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  toolbar: {
    type: Boolean,
    default: false
  }
})
</script>
