<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { krelMaskInput } from './krelMaskInput'

const phone = defineModel()

const refPhoneInput = useTemplateRef('inputWithMask')

interface Props {
  maskRule: string
  placeholder: string
}
const props = defineProps<Props>()

onMounted(() => {
  // const phoneMask = document.getElementById('phone_mask')
  const phoneMask = refPhoneInput.value

  if (phoneMask) {
    krelMaskInput(phoneMask, props.maskRule)
    phoneMask.addEventListener('input', insertValueInModel)
    phoneMask.addEventListener('blur', insertValueInModel)
  }
})

onUnmounted(() => {
  const phoneMask = refPhoneInput.value
  phoneMask?.removeEventListener('input', insertValueInModel)
  phoneMask?.removeEventListener('blur', insertValueInModel)
})

function insertValueInModel(e: Event) {
  phone.value = (e.target as HTMLInputElement).value
}
</script>

<template>
  <input
    type="text"
    :placeholder="placeholder"
    v-model="phone"
    ref="inputWithMask"
  />
</template>

<style scoped lang="sass"></style>
