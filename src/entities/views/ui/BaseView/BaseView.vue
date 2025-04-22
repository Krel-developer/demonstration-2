<script lang="ts" setup>
import { useViewsStore } from '../../models/views.store'
import './BaseView.sass'

interface Props {
  stageNumber: number
  titleText: string
  isLoading: boolean

  // Этот флаг отвечает за отключение блокировки после завершения записси
  noBlockAfterFinishRecord?: boolean

  // Этот флаг отвечает будет это отображение первым
  isFirstView?: boolean
}

defineProps<Props>()

const viewStore = useViewsStore()

viewStore.stageNum
</script>

<template>
  <div
    class="boocking__item"
    :class="{
      boocking__item_active: viewStore.stageNum === stageNumber,
      boocking__item_laoding: isLoading,
      boocking__item_completed:
        viewStore.isRecordCompleted && !noBlockAfterFinishRecord,
      boocking__item_first_view: isFirstView,
    }"
  >
    <div class="boocking__item__title">
      <span>Шаг {{ stageNumber }}.</span>

      {{ titleText }}
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="sass"></style>
