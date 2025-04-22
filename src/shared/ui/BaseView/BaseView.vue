<script lang="ts" setup>
import './BaseView.sass'

interface Props {
  stageNumber: number
  titleText: string
  isCompleted?: boolean
  isActive: boolean
  isLoading: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="boocking__item"
    :class="{
      boocking__item_active: isActive,
      boocking__item_laoding: isLoading,
      boocking__item_completed: isCompleted ? isCompleted : false,
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
