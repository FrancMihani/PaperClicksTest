<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useQuery from '@/composables/useQuery'
import useMutation from '@/composables/useMutation'
import { useVuelidate } from '@vuelidate/core'
import UsersService from '@/services/users'
import Dialog from '@/components/electrons/Dialog.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import SubmitButton from '@/components/buttons/form/SubmitButton.vue'
import Checkbox from '@/components/inputs/Checkbox.vue'
import { initialItem } from '@/services/users/types'
import { FormType } from '@/types/enums'
import UserSchema from '@/schema/UserSchema'

const props = defineProps({
  id: { type: String, default: '' },
  visible: Boolean,
  type: { type: String as () => FormType, default: FormType.Create },
})
const emit = defineEmits(['update:visible'])

const isCreateMode = computed(() => props.type === FormType.Create)
const isUsingGoogleLocation = ref<boolean>(false)

const { item, fetch, loading: isFetching } = useQuery(UsersService.find, { initialItem })

const v$ = useVuelidate(UserSchema(isUsingGoogleLocation.value), item)

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

const handleSubmit = async () => {
  const res = await v$.value.$validate()
  if (!res) return

  if (isCreateMode.value) await create(item.value)
  else await update(item.value, props.id)
}
</script>

<template>
  <Dialog :title="`${isCreateMode ? 'New' : props.id} User Info`" v-model="syncVisible" @close="close">
    <template v-slot:body>
      <div class="grid grid-cols-2 gap-4">
        <text-input v-model="item.name" label="Full Name" :error="v$.name.$error ? 'Field has Errors' : ''" />
        <div>
          <checkbox class="absolute right-5" v-model="isUsingGoogleLocation" label="Use Google Location" />
          <text-input
            v-model="item.address.street"
            label="Address"
            :error="v$.address.street.$error ? 'Field has Errors' : ''" />
        </div>
        <text-input v-model="item.username" label="User Name" :error="v$.username.$error ? 'Field has Errors' : ''" />
        <text-input
          v-model="item.address.city"
          label="City"
          :error="v$.address.city.$error ? 'Field has Errors' : ''" />
        <text-input v-model="item.email" label="Email" :error="v$.email.$error ? 'Field has Errors' : ''" />
        <text-input
          v-model="item.address.zipcode"
          label="Zip Code"
          :error="v$.address.zipcode.$error ? 'Field has Errors' : ''" />
        <text-input v-model="item.phone" label="Phone Nr" :error="v$.phone.$error ? 'Field has Errors' : ''" />
        <div v-if="isUsingGoogleLocation" class="grid grid-cols-2 gap-4">
          <text-input
            v-model="item.address.geo.lat"
            label="Latitude"
            :error="v$.address.geo.lat.$error ? 'Field has Errors' : ''" />
          <text-input
            v-model="item.address.geo.lng"
            label="Longitude"
            :error="v$.address.geo.lng.$error ? 'Field has Errors' : ''" />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <submit-button class="ml-auto" @click="handleSubmit" />
    </template>
  </Dialog>
</template>
