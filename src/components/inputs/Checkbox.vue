<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: Boolean,
  label: String,
})

const syncValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
</script>
<template>
  <div class="flex items-center mb-4 absolute right-5" v-bind="{ ...$attrs }">
    <input
      id="default-checkbox"
      type="checkbox"
      v-model="syncValue"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900">{{ label }}</label>
  </div>
</template>
