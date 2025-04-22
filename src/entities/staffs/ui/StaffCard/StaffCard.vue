<script lang="ts" setup>
import './StaffCard.sass'

import { computed } from 'vue'

import type { IEntitie, IStaff } from '@/shared/types'
import { useStaffsStore } from '../../models'

interface Props {
  data: IStaff | IEntitie
}

const props = defineProps<Props>()

const staffStore = useStaffsStore()

const activeClass = computed(() => {
  if (staffStore.getCurrent === props.data.id) {
    return 'krel_staffs__item_active'
  } else {
    return ''
  }
})
</script>

<template>
  <div
    class="boocking__item__list__item krel_staffs__item"
    :class="activeClass"
  >
    <div class="krel_staffs__item__left">
      <img :src="data.avatarSrc" alt="" />
    </div>
    <div class="krel_staffs__item__right">
      <h3>{{ data.name }}</h3>
      {{ data.specialization }}
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
