<script lang="ts" setup>
import { message } from '@/shared/utils'
import './CodeField.sass'

import { FormFieldRow, InputWithMask, MyBtn, ThumbBlock } from '@/shared/ui'
import { ref } from 'vue'

const code = ref('')

const emits = defineEmits<{
  completeRecord: [code: number]
}>()

function checkCode() {
  if (code.value) {
    console.log(code.value)

    // Убираем лишние символы из кода, приводим к числу
    const formatCode = +code.value.replace(/-/g, '').trim()

    emits('completeRecord', formatCode)
  } else {
    message.error('Вы указали неверный код')
  }
}
</script>

<template>
  <ThumbBlock class="boocking__item__thumb_success">
    <FormFieldRow class="boocking__item__field_code">
      <InputWithMask
        mask-rule=" 9-9-9-9"
        placeholder=" _-_-_-_"
        v-model="code"
      ></InputWithMask>
    </FormFieldRow>

    <MyBtn class="boocking__item__btn_code" @btnClick="checkCode"
      >Подвердить
    </MyBtn>
  </ThumbBlock>
</template>

<style scoped lang="sass"></style>
