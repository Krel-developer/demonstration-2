<script lang="ts" setup>
import { useServicesStore } from '@/entities/services'
import { StaffsList, useStaffsStore } from '@/entities/staffs'
import {
  BaseView,
  ThumbBlockNoRecord,
  ThumbBlockWithArrow,
  useViewsStore,
} from '@/entities/views'
import { staffSubmit } from '@/features/staffSubmit'
import { MyBtnNext } from '@/features/switchToNextView'
import { MyBtnBack } from '@/features/switchToPrevView'
import { ref } from 'vue'

const staffsStore = useStaffsStore()
const servicesStore = useServicesStore()
const viewsStore = useViewsStore()

const stage = ref(2)

if (viewsStore.isStaffFirst) {
  // Если стейт "Врачи первые" true, то врачи идут первым шагом
  stage.value = 1
}
</script>

<template>
  <BaseView
    :is-loading="staffsStore.loading"
    :stage-number="stage"
    title-text="Выберите специалиста"
    :is-first-view="viewsStore.isStaffFirst"
  >
    <StaffsList @staff-submit="staffSubmit"></StaffsList>

    <MyBtnBack :stage="stage"></MyBtnBack>
    <MyBtnNext :is-disable="!staffsStore.current" :stage="stage"></MyBtnNext>

    <!-- Если не выбрана услуга, будет показано это сообщение -->
    <ThumbBlockWithArrow
      v-if="!viewsStore.isStaffFirst && !servicesStore.getCurrent"
    >
      Что бы перейти к выбору <br />
      специалиста выберите <strong>услугу</strong>
    </ThumbBlockWithArrow>

    <ThumbBlockNoRecord
      v-else-if="!staffsStore.getList.length"
    ></ThumbBlockNoRecord>
  </BaseView>
</template>

<style scoped lang="sass"></style>
