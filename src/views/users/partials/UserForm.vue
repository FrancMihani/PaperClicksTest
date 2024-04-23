<script setup lang="ts">
import { computed } from 'vue'
import useQuery from '@/composables/useQuery'
import UsersService from '@/services/users'
import Dialog from '@/components/electrons/Dialog.vue'
import { FormType } from '@/types/enums'

const props = defineProps({
  id: { type: String, default: '' },
  visible: Boolean,
  type: { type: String as ()=> FormType, default: FormType.Create },
})
const emit = defineEmits(['update:visible'])

const { item } = useQuery(UsersService.find, { id: props.id })

const syncVisible = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val),
})
</script>

<template>
  <Dialog title="New User Info" v-model="syncVisible">
    <template v-slot:body> </template>
    <template v-slot:footer> </template>
  </Dialog>
</template>
