<script setup lang="ts" generic="T extends Record<string, unknown>">
const props = defineProps({
  headers: {
    type: Array as () => Array<{ label: string; key: keyof T }>,
    required: true,
  },
  items: {
    type: Array as () => Array<T>,
    required: true,
  },
})
</script>

<template>
  <table>
    <thead>
    <tr>
      <th v-for="(header, index) in headers" :key="index">
        {{ header.label }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <td v-for="(header, subIndex) in headers" :key="index + subIndex">
        {{ item[header.key] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>
