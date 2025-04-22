<script lang="ts" setup>
import './ThumbBlock.sass'

import { computed } from 'vue'

interface Props {
  classPostfix?: string
}

const props = defineProps<Props>()

const className = computed(() =>
  props.classPostfix ? 'boocking__item__thumb' + props.classPostfix : ''
)
</script>

<template>
  <div class="boocking__item__thumb" :class="className">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
