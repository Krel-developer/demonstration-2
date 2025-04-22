<script lang="ts" setup>
import './ServiceCard.sass'

import { computed } from 'vue'
import type { IEntitie, IService } from '@/shared/types'
import { useServicesStore } from '../../models'

interface Props {
  data: IService | IEntitie
}

const props = defineProps<Props>()

const servicesStore = useServicesStore()

const activeClass = computed(() => {
  if (servicesStore.getCurrent === props.data.id) {
    return 'krel_services__item_active'
  } else {
    return ''
  }
})
</script>

<template>
  <div
    class="boocking__item__list__item krel_services__item"
    :class="activeClass"
  >
    {{ data.title }}
  </div>
</template>

<style scoped lang="sass"></style>
