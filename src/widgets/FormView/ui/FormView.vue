<script lang="ts" setup>
import { useDaysStore } from '@/entities/days'

import { useTimestore } from '@/entities/times'
import {
  BaseView,
  ThumbBlockNoRecord,
  ThumbBlockWithArrow,
} from '@/entities/views'
import { finishRecord, type ISubmitData } from '@/features/finishRecord'
import { ref } from 'vue'
import CodeField from './CodeField/CodeField.vue'
import FormFields from './FormFields/FormFields.vue'
import SuccessView from './SuccessView/SuccessView.vue'
import { useServicesStore } from '@/entities/services'
import { useStaffsStore } from '@/entities/staffs'

const daysStore = useDaysStore()
const timesStore = useTimestore()
const servicesStore = useServicesStore()
const staffsStore = useStaffsStore()

let submitData: ISubmitData = {
  fullname: '',
  phone: '',
  code: NaN,
}

const bookCodeIsOpen = ref(false)

function startRecord(data: Omit<ISubmitData, 'code'>) {
  submitData = { ...submitData, ...data }
  bookCodeIsOpen.value = true
}

function completeRecord(code: number) {
  submitData = { ...submitData, code }

  if (submitData) {
    finishRecord(submitData)
  }
}
</script>

<template>
  <BaseView
    :is-loading="daysStore.getLoading || timesStore.getLoading"
    :stage-number="3"
    :noBlockAfterFinishRecord="true"
    title-text="Заключительный шаг"
  >
    <FormFields @submitData="startRecord"></FormFields>

    <!-- Если не выбрана услуга и врач, будет показано это сообщение -->
    <ThumbBlockWithArrow
      v-if="!servicesStore.getCurrent && !staffsStore.getCurrent"
    >
      Что бы записаться на прием <br />
      выберите <strong>услугу</strong> и <strong>специалиста</strong>
    </ThumbBlockWithArrow>

    <ThumbBlockNoRecord
      v-else-if="!daysStore.getList.length"
    ></ThumbBlockNoRecord>

    <CodeField
      v-if="bookCodeIsOpen"
      @completeRecord="completeRecord"
    ></CodeField>

    <SuccessView></SuccessView>
  </BaseView>
</template>

<style scoped lang="sass"></style>
