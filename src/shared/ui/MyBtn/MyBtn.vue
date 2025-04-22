<script lang="ts" setup>
import './MyBtn.sass'

interface Props {
  isDisable?: boolean
}

// const { isDisable = false, withArrow = false } = defineProps<Props>()

withDefaults(defineProps<Props>(), {
  isDisable: false,
})
</script>

<template>
  <div
    class="boocking__item__btn"
    :class="{
      boocking__item__btn_disable: isDisable,
    }"
    @click.prevent="$emit('btnClick')"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="sass"></style>
