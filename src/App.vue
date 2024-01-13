<template>
  <Menu />
</template>

<script setup>
import Menu from "./components/Menu.vue"

import { onMounted } from "vue"

import { useModulesStore } from "./stores/modules"
const modulesStore = useModulesStore()
const { getModules } = modulesStore


onMounted(async () => {
  try {
    await getModules()
  } catch (error) {
    console.error(error)
  }
})
</script>

<style lang="sass">
</style>
