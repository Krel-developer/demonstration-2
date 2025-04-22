<script setup lang="ts">
import '@/shared/assets/style/main.sass'
import { setStateFromUrlParams } from '@/features/setStateFromUrlParams'
import { FormView } from '@/widgets/FormView'
import { ServiceView } from '@/widgets/ServicesView'
import { StaffsView } from '@/widgets/StaffsView'

setStateFromUrlParams()
</script>

<template>
  <div class="container">
    <div class="krel_boocking">
      <ServiceView></ServiceView>
      <StaffsView></StaffsView>
      <FormView></FormView>
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
