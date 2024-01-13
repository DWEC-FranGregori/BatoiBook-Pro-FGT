<template>
  <div>
    <nav>
      <RouterLink :to="{ name: 'home' }">Inicio</RouterLink>
      <RouterLink :to="{ name: 'createBook' }">Añadir Libro</RouterLink>
      <RouterLink :to="{ name: 'books' }">Libros</RouterLink>
      <RouterLink :to="{ name: 'cart' }">Carrito</RouterLink>
      <RouterLink :to="{ name: 'about' }">Acerca de</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped lang="sass">
a
  margin-right: 2%
  padding: 1%
  text-decoration: none
  color: lch(88.82% 0 18)
  
  &:hover
    border-radius: 15px 
    background-color: lch(55% 3.87 273.18)
    color: black

nav
  margin-bottom: 10%
  
</style>
