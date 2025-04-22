<script lang="ts" setup>
import { useServicesStore } from '@/entities/services'
import './CurrentServiceAndStaff.sass'
import { useStaffsStore } from '@/entities/staffs'

const servicesStore = useServicesStore()

const staffsStore = useStaffsStore()
</script>

<template>
  <div class="boocking__item__text">
    <div>
      Вы выбрали услугу
      <strong>{{ servicesStore.getCurrentServiceName }}</strong
      >,
    </div>
    <div>
      к врачу <strong>{{ staffsStore.getCurrentfStaffName }}</strong>
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
