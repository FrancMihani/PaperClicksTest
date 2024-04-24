<script setup lang="ts">
import { computed } from 'vue'
import useQuery from '@/composables/useQuery'
import googlePlacesService from '@/services/googlePlaces'
import debounce from 'lodash/debounce'
import type { Prediction } from '@/types/googlePlaces'

const emit = defineEmits(['update:modelValue', 'selected'])
const props = defineProps({
  error: String,
  modelValue: String,
  label: String,
})

const { item, loading, fetch } = useQuery(googlePlacesService.getPlaceAutoComplete)

const syncValue = computed({
  get: () => props.modelValue,
  set: val => {
    debounce(() => fetch(val as string), 500)
    emit('update:modelValue', val)
  },
})

const handleSelect = (prediction: Prediction) => {
  syncValue.value = prediction?.structured_formatting?.main_text
  emit('selected', prediction)
}
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
    <div class="py-1 rounded-md shadow-xs absolute" v-if="!loading">
      <a
        v-for="(prediction, index) in item?.data?.predictions"
        :key="index"
        class="w-auto block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 focus:outline-none focus:bg-gray-100"
        role="menuitem"
        @click="">
        {{ prediction?.structured_formatting?.main_text }}
      </a>
    </div>
  </div>
</template>
