<script lang="ts" setup>
import { MyBtn } from '@/shared/ui'
import './MyBtnBack.sass'
import { useViewsStore } from '@/entities/views'

interface Props {
  stage: number
}

defineProps<Props>()

const viewsStore = useViewsStore()
</script>

<template>
  <MyBtn
    class="boocking__item__btn_back"
    @btnClick="viewsStore.setStage(stage - 1)"
  >
    Назад
  </MyBtn>
</template>

<style scoped lang="sass"></style>
