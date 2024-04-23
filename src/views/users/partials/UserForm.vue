<script setup lang="ts">
import { computed } from 'vue'
import useQuery from '@/composables/useQuery'
import UsersService from '@/services/users'
import Dialog from '@/components/electrons/Dialog.vue'
import { FormType } from '@/types/enums'
import useMutation from '@/composables/useMutation'
import { initialItem, type UserDTO } from '@/services/users/types'
import TextInput from '@/components/inputs/TextInput.vue'
import SubmitButton from '@/components/buttons/form/SubmitButton.vue'

const props = defineProps({
  id: { type: String, default: '' },
  visible: Boolean,
  type: { type: String as () => FormType, default: FormType.Create },
})
const emit = defineEmits(['update:visible'])

const isCreateMode = computed(() => props.type === FormType.Create)

const { item, fetch, loading: isFetching } = useQuery(UsersService.find, { id: props.id, initialItem })

const syncVisible = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val),
})

const close = () => {
  syncVisible.value = true
  item.value = {} as UserDTO
}

const { mutate: create, loading: isCreating } = useMutation(UsersService.create, { onSuccess: close })
const { mutate: update, loading: isUpdating } = useMutation(UsersService.update, { onSuccess: close })
</script>

<template>
  <Dialog :title="`${isCreateMode ? 'New' : props.id} User Info`" v-model="syncVisible">
    <template v-slot:body>
      <div class="grid grid-cols-2 gap-4">
        <TextInput v-model="item.name" label="Full Name" />
        <TextInput v-model="item.address.street" label="Address" />
        <TextInput v-model="item.username" label="User Name" />
        <TextInput v-model="item.address.city" label="City" />
        <TextInput v-model="item.email" label="Email" />
        <TextInput v-model="item.address.zipcode" label="Zip Code" />
        <TextInput v-model="item.phone" label="Phone Nr" />
        <div class="grid grid-cols-2 gap-4">
          <TextInput v-model="item.address.geo.lat" label="Latitude" />
          <TextInput v-model="item.address.geo.lng" label="Longitude" />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <SubmitButton class="ml-auto" />
    </template>
  </Dialog>
</template>
