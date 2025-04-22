<script lang="ts" setup>
import './ListWithSearch.sass'

import { computed, ref, watch } from 'vue'
import SearchInput from './SearchInput/SearchInput.vue'
import type { IEntitie } from '../../types'

const searchValue = ref<string>('')

interface Props {
  list: IEntitie[]
  searchParam: string
  placeholder: string
}

const props = defineProps<Props>()

const listFormated = ref<typeof props.list>([])

const list = computed(() => props.list)

watch(
  list,
  () => {
    listFormated.value = list.value
  },
  { deep: true }
)

watch(searchValue, () => {
  listFormated.value = props.list.filter((el) =>
    el[props.searchParam].toLowerCase().includes(searchValue.value)
  )
})
</script>

<template>
  <SearchInput v-model="searchValue" :placeholder="props.placeholder">
  </SearchInput>

  <div class="boocking__item__list">
    <slot :list="listFormated"></slot>
  </div>
</template>

<style scoped lang="sass"></style>
