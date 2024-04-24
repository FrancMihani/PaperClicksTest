<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  error: String,
  modelValue: String,
  label: String,
})

const syncValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
</script>
<template>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <input
      v-model="syncValue"
      v-bind="{ ...$attrs }"
      aria-describedby="helper-text-explanation"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :class="{ 'border-red-600': !!error }" />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
