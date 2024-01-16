<template>
  <div class="card">
    <img src="" alt="portada libro" />
    <div>
      <h5>
        {{ findModuleByCode(book.idModule) + " (" + book.id + ")" }}
      </h5>
      <h6>{{ book.publisher }}</h6>
      <p>Precio: {{ book.price }} €</p>
      <p>Páginas: {{ book.pages }}</p>
      <p>Estado: {{ book.status }}</p>
      <p>{{ book.soldDate ? "Vendido el " + book.soldDate : "En venta" }}</p>
      <p>Comentarios: {{ book.comments || "" }}</p>
      <button @click="remove" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
          viewBox="0 0 16 16">
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5">
          </path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useModulesStore } from "@/stores/modules"
const moduleStore = useModulesStore()

import { useCartStore } from "@/stores/cart"
const cartStore = useCartStore();

const { findModuleByCode } = moduleStore
const { removeBook } = cartStore

const props = defineProps(["book"])

const remove = () => {
  if (
    !confirm(
      `¿Quieres eliminar el libro ${props.book.id} con módulo ${props.book.idModule}?`
    )
  ) {
    return
  }
  removeBook(props.book.id)
};
</script>

<style scoped lang="sass">
.card
  text-align: center
  
  padding-bottom: 5%
  background-color: lch(22.65% 4.83 278.47)
  border-radius: 15px
  margin-bottom: 15%
  div
    margin: 5%

button
  padding: 2%
  border-radius: 5px
  background-color: lch(49.71% 88.93 40.24)
  border: none
  &:hover
    background-color: lch(45.88% 80.23 40.24)
</style>
