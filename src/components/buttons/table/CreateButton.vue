<script setup lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue'
</script>

<template>
  <button
    v-bind="{ ...$attrs }"
    class="bg-[#3C81FC] flex flex-row hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    <PlusIcon class="mr-2 mt-1.5" />
    <slot>Create</slot>
  </button>
</template>
