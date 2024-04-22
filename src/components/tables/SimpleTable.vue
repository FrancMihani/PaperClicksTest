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
  <table class="w-[100%] text-left">
    <thead>
    <tr>
      <th
        v-for="(header, index) in headers"
        :key="index"
        class="py-4 text-[#4E5964] pl-[10px]"
      >
        {{ header.label }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="(item, index) in items"
      :key="index"
    >
      <td
        v-for="(header, subIndex) in headers"
        :key="index + subIndex"
        class="py-3 text-[#4E5964]"
      >
        {{ item[header.key] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-top: -10px;
}
td {
  border: solid 1px #E7EAF3;
  border-style: solid none;
  padding: 10px;
}
td:first-child {
  border-left-style: solid;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
td:last-child {
  border-right-style: solid;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
