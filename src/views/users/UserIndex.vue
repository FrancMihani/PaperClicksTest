<script setup lang="ts">
import useIndexQuery from "@/composables/useIndexQuery"
import UsersService from "@/services/users"
import { useToast } from "vue-toastification"
import SimpleTable from "@/components/tables/SimpleTable.vue"
import type { UserDTO } from "@/services/users/types"
import EditButton from "@/components/buttons/table/EditButton.vue";
import DeleteButton from "@/components/buttons/table/DeleteButton.vue";

const { items } = useIndexQuery(UsersService.all)
const toast = useToast()
const headers: Array<Header<UserDTO>> = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Actions', key: 'actions' },
]
const openEditModal = (item: UserDTO) => {}
const handleDelete = (item: UserDTO) => {}
</script>

<template>
  <simple-table :headers="headers" :items="items">
    <template v-slot:actions="{ item }">
      <div class="flex flex-row">
        <edit-button class="mr-2" @click="openEditModal(item)" />
        <delete-button @click="handleDelete(item)" />
      </div>
    </template>
  </simple-table>
</template>
