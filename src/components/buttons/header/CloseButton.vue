<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue'
</script>

<template>
  <button v-bind="{ ...$attrs }">
    <CloseIcon />
  </button>
</template>
