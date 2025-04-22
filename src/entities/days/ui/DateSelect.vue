<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useDaysStore } from '../models'

const emits = defineEmits<{
  daySubmit: [day: string]
}>()

const daysStore = useDaysStore()

const select = ref(daysStore.getCurrent)

const days = computed(() => daysStore.getList)

// Каждый раз когда подгружается новый список, обнуляем select, что бы она встал в дефолтное положение
watch(
  days,
  () => {
    select.value = null
  },
  { deep: true }
)

function selectChange() {
  if (select.value) {
    emits('daySubmit', select.value)
  }
}
</script>

<template>
  <div class="boocking__select__cont">
    <select @change="selectChange" v-model="select">
      <option :value="null" default disabled selected>
        Выберите дату приема
      </option>
      <option v-for="day in daysStore.getList" :key="day.id" :value="day.day">
        {{ day.formatedDay }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="sass"></style>
