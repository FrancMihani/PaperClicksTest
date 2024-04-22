<script setup lang="ts">
import useIndexQuery from "@/composables/useIndexQuery"
import UsersService from "@/services/users"
import { useToast } from "vue-toastification"
import SimpleTable from "@/components/tables/SimpleTable.vue"
import type { UserDTO } from "@/services/users/types"

const { items } = useIndexQuery(UsersService.all)
const toast = useToast()
const headers: Array<Header<UserDTO>> = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Actions', key: 'actions' },
]
</script>

<template>
  <simple-table :headers="headers" :items="items">
    <template v-slot:actions="{ item }">
      {{ item }}
    </template>
  </simple-table>
</template>
