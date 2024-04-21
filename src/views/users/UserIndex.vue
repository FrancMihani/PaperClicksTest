<script setup lang="ts">
import useIndexQuery from "@/composables/useIndexQuery"
import UsersService from "@/services/users"

const { items } = useIndexQuery(UsersService.all)
</script>

<template>
</template>
