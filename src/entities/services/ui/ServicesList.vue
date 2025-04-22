<script lang="ts" setup>
import { ListWithSearch } from '@/shared/ui'
import ServiceCard from './ServiceCard/ServiceCard.vue'
import { useServicesStore } from '../models'

const servicesStore = useServicesStore()

defineEmits<{
  serviceSubmit: [serviceId: number]
}>()
</script>

<template>
  <ListWithSearch
    :list="servicesStore.getList"
    :searchParam="'title'"
    :placeholder="'Поиск услуги'"
    v-slot="{ list }"
  >
    <ServiceCard
      v-for="service in list"
      :key="service.id"
      :data="service"
      @click="$emit('serviceSubmit', service.id)"
    ></ServiceCard>
  </ListWithSearch>
</template>

<style scoped lang="sass"></style>
