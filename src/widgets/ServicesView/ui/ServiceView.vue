<script lang="ts" setup>
import { ServicesList, useServicesStore } from '@/entities/services'
import { BaseView, ThumbBlockNoRecord, useViewsStore } from '@/entities/views'
import { serviceSubmit } from '@/features/serviceSubmit'
import { MyBtnNext } from '@/features/switchToNextView'
import { ref } from 'vue'

const servicesStore = useServicesStore()
const viewsStore = useViewsStore()

const stage = ref(1)
if (viewsStore.isStaffFirst) {
  // Если стейт "Врачи первые" true, то услуги идут вторым шагом
  stage.value = 2
}
</script>

<template>
  <BaseView
    :is-loading="servicesStore.getLoading"
    :stage-number="stage"
    title-text="Выберите услугу"
    :is-first-view="!viewsStore.isStaffFirst"
  >
    <ServicesList @service-submit="serviceSubmit"></ServicesList>

    <MyBtnNext :is-disable="!servicesStore.current" :stage="stage"></MyBtnNext>

    <ThumbBlockNoRecord v-if="!servicesStore.getList"></ThumbBlockNoRecord>
  </BaseView>
</template>

<style scoped lang="sass"></style>
