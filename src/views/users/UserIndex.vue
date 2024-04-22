<script setup lang="ts">
import useIndexQuery from "@/composables/useIndexQuery"
import UsersService from "@/services/users"
import { useToast } from "vue-toastification"
import SimpleTable from "@/components/tables/SimpleTable.vue"
import type { UserDTO } from "@/services/users/types"

const { items } = useIndexQuery(UsersService.all)
const toast = useToast()
const headers: Array<{ label: string; key: keyof UserDTO }> = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Actions', key: 'id' },
]
</script>

<template>
  <SimpleTable :headers="headers" :items="items" />
</template>
