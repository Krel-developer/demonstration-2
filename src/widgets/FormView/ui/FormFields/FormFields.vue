<script lang="ts" setup>
import { DateSelect, useDaysStore } from '@/entities/days'
import { TimeSelect, useTimestore } from '@/entities/times'
import { daySubmit } from '@/features/daySubmit'
import { timeSubmit } from '@/features/timeSubmit'
import { FormFieldRow, InputWithMask } from '@/shared/ui'
import { ref } from 'vue'
import { CurrentServiceAndStaff, MyBtnRecord } from './ui'
import { message } from '@/shared/utils'
import type { ISubmitData } from '@/features/finishRecord'
import { MyBtnBack } from '@/features/switchToPrevView'

const emits = defineEmits<{
  submitData: [data: Omit<ISubmitData, 'code'>]
}>()

const daysStore = useDaysStore()
const timesStore = useTimestore()

const fullname = ref('')
const phone = ref('')

function submit() {
  if (validate()) {
    emits('submitData', {
      fullname: fullname.value,
      phone: phone.value,
    })
  }
}

function validate() {
  let isValid = true
  if (!daysStore.getCurrent) {
    message.error('Выберите дату приема')
    isValid = false
  }
  if (!timesStore.getCurrent) {
    message.error('Выберите доступное время')
    isValid = false
  }
  if (!fullname.value) {
    message.error('Укажите ваше имя')
    isValid = false
  }
  if (!phone.value) {
    message.error('Укажите номер телефона')
    isValid = false
  }

  return isValid
}
</script>

<template>
  <CurrentServiceAndStaff></CurrentServiceAndStaff>

  <FormFieldRow title="Выберите дату приема">
    <DateSelect @daySubmit="daySubmit"></DateSelect>
  </FormFieldRow>

  <FormFieldRow title="Выберите доступное время">
    <TimeSelect @timeSubmit="timeSubmit"></TimeSelect>
  </FormFieldRow>

  <FormFieldRow title="Укажите ваше имя">
    <input type="text" placeholder="Иван Иванович Иванов" v-model="fullname" />
  </FormFieldRow>

  <FormFieldRow title="Укажите номер телефона">
    <InputWithMask
      placeholder="+7 (___) ___-__-__"
      maskRule="+7 (999) 999-99-99"
      v-model="phone"
    ></InputWithMask>
  </FormFieldRow>

  <MyBtnBack :stage="3"></MyBtnBack>

  <MyBtnRecord @click="submit"></MyBtnRecord>
</template>

<style scoped lang="sass"></style>
