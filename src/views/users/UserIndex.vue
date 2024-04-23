<script setup lang="ts">
import { ref } from 'vue'
import useIndexQuery from '@/composables/useIndexQuery'
import useWithoutPayloadMutation from '@/composables/useWithoutPayloadMutation'
import UsersService from '@/services/users'
import SimpleTable from '@/components/tables/SimpleTable.vue'
import EditButton from '@/components/buttons/table/EditButton.vue'
import DeleteButton from '@/components/buttons/table/DeleteButton.vue'
import CreateButton from '@/components/buttons/table/CreateButton.vue'
import type { UserDTO } from '@/services/users/types'
import UserForm from '@/views/users/partials/UserForm.vue'
import { FormType } from '@/types/enums'

const { items, fetch } = useIndexQuery(UsersService.all)
const { mutate: deleteUser } = useWithoutPayloadMutation(UsersService.delete, { onSuccess: fetch })

const headers: Array<Header<UserDTO>> = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Actions', key: 'actions' },
]

const isCreateFormVisible = ref(false)
const isEditFormVisible = ref(false)
const selectedId = ref('')
const openEditModal = (id: string) => {
  selectedId.value = id
  isEditFormVisible.value = true
}
</script>

<template>
  <CreateButton class="ml-auto" @click="isCreateFormVisible = true"> Create New User </CreateButton>
  <simple-table :headers="headers" :items="items">
    <template v-slot:actions="{ item }">
      <div class="flex flex-row">
        <edit-button class="mr-4" @click="openEditModal(`${item.id}`)" />
        <delete-button @click="deleteUser(`${item.id}`)" />
      </div>
    </template>
  </simple-table>
  <UserForm v-model:visible="isCreateFormVisible" />
  <UserForm v-model:visible="isEditFormVisible" :type="FormType.Edit" :id="selectedId" />
</template>
