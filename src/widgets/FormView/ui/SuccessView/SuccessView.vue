<script lang="ts" setup>
import { ThumbBlock } from '@/shared/ui'

import { useDaysStore } from '@/entities/days'
import { useServicesStore } from '@/entities/services'
import { useStaffsStore } from '@/entities/staffs'
import { useTimestore } from '@/entities/times'
import { useViewsStore } from '@/entities/views'

const viewsStore = useViewsStore()

const servicesStore = useServicesStore()
const staffsStore = useStaffsStore()
const daysStore = useDaysStore()
const timesStore = useTimestore()
</script>

<template>
  <ThumbBlock v-if="viewsStore.getIsRecordCompleted">
    <div class="boocking__item__field__title">
      Вы успешно записаны на прием.
    </div>
    Специалист: <strong>{{ staffsStore.getCurrentfStaffName }}</strong> <br />
    Услуга: <strong>{{ servicesStore.getCurrentServiceName }}</strong> <br />
    День:
    <strong>{{ daysStore.getFormatedCurrentDay }}</strong> <br />
    Время: <strong>{{ timesStore.getFormatedCurrentTime }}</strong>
  </ThumbBlock>
</template>

<style scoped lang="sass"></style>
