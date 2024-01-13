<template>
  <h1>Cart</h1>
  <p v-if="cart.length === 0">No hay libros en el carrito</p>
  <div v-else>
    <div class="info">
      <p>Total de Libros : {{ cart.length }}</p>
      <p>Importe a pagar: {{ totalPrice.toFixed(2) }} €</p>
    </div>

    <div class="books">
      <BookCartItem v-for="book in cart" :key="book.id" :book="book" />
      <button @click="clear">Vaciar Carrito</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart"
const store = useCartStore()
const { cart, totalPrice, clear } = store

import BookCartItem from "@/components/BookCartItem.vue"
</script>

<style scoped lang="sass">
.info
  margin-bottom: 8%

</style>
