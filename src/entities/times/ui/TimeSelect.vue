<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useTimestore } from '../models'

const emits = defineEmits<{
  timeSubmit: [time: string]
}>()

const timesStore = useTimestore()

const select = ref(null)

const times = computed(() => timesStore.getList)

// Каждый раз когда подгружается новый список, обнуляем select, что бы она встал в дефолтное положение
watch(
  times,
  () => {
    select.value = null
  },
  { deep: true }
)

function selectChange() {
  if (select.value) {
    emits('timeSubmit', select.value)
  }
}
</script>

<template>
  <div class="boocking__select__cont">
    <select v-if="times.length" @change="selectChange" v-model="select">
      <option disabled :value="null">Выберите доступное время</option>
      <option
        class="item"
        v-for="time in times"
        :key="time.id"
        :value="time.datetime"
      >
        {{ time.time }}
      </option>
    </select>
    <select class="select_disabled" v-else>
      <option disabled selected>Сначала выберите дату</option>
    </select>
  </div>
</template>

<style scoped lang="sass"></style>
