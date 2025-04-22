<script lang="ts" setup>
import { MyBtn } from '@/shared/ui'
import './MyBtnNext.sass'
import { useViewsStore } from '@/entities/views'

interface Props {
  stage: number
  isDisable?: boolean
}

withDefaults(defineProps<Props>(), {
  isDisable: false,
})

const viewsStore = useViewsStore()
</script>

<template>
  <MyBtn
    :isDisable="isDisable"
    class="boocking__item__btn_next"
    @btnClick="viewsStore.setStage(stage + 1)"
  >
    Следующий шаг
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.46484 6.5H11.5359"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.50038 1.46447L11.5359 6.5L6.50038 11.5355"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </MyBtn>
</template>

<style scoped lang="sass"></style>
