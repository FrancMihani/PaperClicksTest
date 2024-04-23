<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useQuery from '@/composables/useQuery'
import UsersService from '@/services/users'
import Dialog from '@/components/electrons/Dialog.vue'
import { FormType } from '@/types/enums'
import useMutation from '@/composables/useMutation'
import { initialItem } from '@/services/users/types'
import TextInput from '@/components/inputs/TextInput.vue'
import SubmitButton from '@/components/buttons/form/SubmitButton.vue'
import Checkbox from '@/components/inputs/Checkbox.vue'

const props = defineProps({
  id: { type: String, default: '' },
  visible: Boolean,
  type: { type: String as () => FormType, default: FormType.Create },
})
const emit = defineEmits(['update:visible'])

const isCreateMode = computed(() => props.type === FormType.Create)
const isUsingGoogleLocation = ref<boolean>(false)

const { item, fetch, loading: isFetching } = useQuery(UsersService.find, { initialItem })

const syncVisible = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val),
})

const close = () => {
  syncVisible.value = false
  item.value = initialItem
}

watch(
  () => props.id,
  () => props.id && fetch(props.id),
  { deep: true },
)

const { mutate: create, loading: isCreating } = useMutation(UsersService.create, { onSuccess: close })
const { mutate: update, loading: isUpdating } = useMutation(UsersService.update, { onSuccess: close })
</script>

<template>
  <Dialog :title="`${isCreateMode ? 'New' : props.id} User Info`" v-model="syncVisible">
    <template v-slot:body>
      <div class="grid grid-cols-2 gap-4">
        <text-input v-model="item.name" label="Full Name" />
        <div>
          <checkbox class="absolute right-5" v-model="isUsingGoogleLocation" label="Use Google Location" />
          <text-input v-model="item.address.street" label="Address" />
        </div>
        <text-input v-model="item.username" label="User Name" />
        <text-input v-model="item.address.city" label="City" />
        <text-input v-model="item.email" label="Email" />
        <text-input v-model="item.address.zipcode" label="Zip Code" />
        <text-input v-model="item.phone" label="Phone Nr" />
        <div v-if="isUsingGoogleLocation" class="grid grid-cols-2 gap-4">
          <text-input v-model="item.address.geo.lat" label="Latitude" />
          <text-input v-model="item.address.geo.lng" label="Longitude" />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <submit-button class="ml-auto" @click="isCreateMode ? create(item) : update(item, props.id)" />
    </template>
  </Dialog>
</template>
