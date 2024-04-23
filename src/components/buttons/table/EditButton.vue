<script setup lang="ts">
import PencilIcon from '@/components/icons/PencilIcon.vue'
</script>

<template>
  <button v-bind="{ ...$attrs }">
    <PencilIcon class="pointer-events-auto" />
  </button>
</template>
