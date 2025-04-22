<script lang="ts" setup>
import { ListWithSearch } from '@/shared/ui'
import { useStaffsStore } from '../models/index'
import StaffCard from './StaffCard/StaffCard.vue'

const staffsStore = useStaffsStore()

defineEmits<{
  staffSubmit: [staffId: number]
}>()
</script>

<template>
  <ListWithSearch
    :list="staffsStore.getList"
    :searchParam="'name'"
    :placeholder="'Поиск специалиста'"
    v-slot="{ list }"
  >
    <StaffCard
      v-for="staff in list"
      :key="staff.id"
      :data="staff"
      @click="$emit('staffSubmit', staff.id)"
    ></StaffCard>
  </ListWithSearch>
</template>

<style scoped lang="sass"></style>
