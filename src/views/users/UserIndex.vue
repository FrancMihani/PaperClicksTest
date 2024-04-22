<script setup lang="ts">
import useIndexQuery from "@/composables/useIndexQuery"
import UsersService from "@/services/users"
import { useToast } from "vue-toastification"

const { items } = useIndexQuery(UsersService.all)
const toast = useToast()
</script>

<template>
</template>
