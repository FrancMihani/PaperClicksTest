<script setup lang="ts">
import useQuery from "@/composables/useQuery"
import UsersService from "@/services/users"

const props = defineProps({ id: { type: String, default: '' } })

const { item } = useQuery(UsersService.find, { id: props.id })
</script>

<template>

</template>
