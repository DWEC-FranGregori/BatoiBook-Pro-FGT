<template>
  <h1>Cart</h1>
  <p v-if="items.length === 0">No hay libros en el carrito</p>
  <div v-else>
    <div class="info">
      <p>Total de Libros : {{ items.length }}</p>
      <p>Importe a pagar: {{ totalPrice.toFixed(2) }} €</p>
    </div>

    <div class="books">
      <BookCartItem v-for="book in items" :key="book.id" :book="book" />
      <button @click="clear">Vaciar Carrito</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart"
import BookCartItem from "@/components/BookCartItem.vue"

const store = useCartStore()
const { items, totalPrice, clear } = store

</script>

<style scoped lang="sass">
.info
  margin-bottom: 8%

</style>
