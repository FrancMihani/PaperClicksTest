<script setup lang="ts">
import TrashCanIcon from '@/components/icons/TrashCanIcon.vue'
</script>

<template>
  <button v-bind="{ ...$attrs }">
    <TrashCanIcon />
  </button>
</template>
