<script lang="ts" setup>
import './SearchInput.sass'

interface Props {
  placeholder: string
}
defineProps<Props>()

const model = defineModel()
</script>

<template>
  <div class="boocking__item__serch__cont">
    <div class="boocking__item__serch">
      <input type="text" :placeholder="placeholder" v-model="model" />
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
