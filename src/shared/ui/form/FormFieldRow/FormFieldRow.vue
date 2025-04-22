<script lang="ts" setup>
import './FormFieldRow.sass'

interface Props {
  title?: string
}

defineProps<Props>()
</script>

<template>
  <div class="boocking__item__field">
    <div class="boocking__item__field__title" v-if="title">{{ title }}</div>
    <slot />
  </div>
</template>

<style scoped lang="sass"></style>
