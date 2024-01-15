<template>
  <div class="card">
    <img src="" alt="portada libro" />
    <div>
      <h5>
        {{ findModuleByCode(book.idModule).cliteral + " (" + book.id + ")" }}
      </h5>
      <h6>{{ book.publisher }}</h6>
      <p>Precio: {{ book.price }} €</p>
      <p>Páginas: {{ book.pages }}</p>
      <p>Estado: {{ book.status }}</p>
      <p>{{ book.soldDate ? "Vendido el " + book.soldDate : "En venta" }}</p>
      <p>Comentarios: {{ book.comments || "" }}</p>
      <div class="buttons">
        <button @click="addToCart" type="button" class="cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart"
            viewBox="0 0 16 16">
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        </button>
        <button @click="editBook" type="button" class="edit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill"
            viewBox="0 0 16 16">
            <path
              d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
          </svg>
        </button>
        <button @click="removeBook" type="button" class="remove">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
            viewBox="0 0 16 16">
            <path
              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5">
            </path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router"

import BooksRepository from "@/repositories/BooksRepository"

import { useModulesStore } from "@/stores/modules"
const moduleStore = useModulesStore()

import { useCartStore } from "@/stores/cart"
const cartStore = useCartStore()

const { findModuleByCode } = moduleStore
const { addBook } = cartStore

import { useBooksStore } from "@/stores/messages/BooksMessages";

const store = useBooksStore()

const { addSuccessMessage } = store

const props = defineProps(["book"])

const addToCart = () => {
  alert(`Libro con código ${props.book.id} añadido al carrito`)
  addBook(props.book)
  addSuccessMessage('Libro añadido al carrito')
}

const editBook = () => {
  router.push({ name: 'edit', params: { id: props.book.id } })
}

const removeBook = async () => {
  if (
    !confirm(
      `¿Quieres eliminar el libro ${props.book.id} con módulo ${props.book.idModule}?`
    )
  ) {
    return
  }

  const repository = new BooksRepository()
  try {
    await repository.removeBook(props.book.id)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped lang="sass">
.card
  background-color: lch(22.65% 4.83 278.47)
  border-radius: 15px
  margin-bottom: 15%
  div
    margin: 5%
    text-align: center

button
  margin-right: 3%
  padding: 2%
  border-radius: 5px

.cart
  background-color: lch(67.94% 78.3 129.18)
  border: none
  &:hover
    background-color: lch(63.82% 71.53 129.18)

.edit
  background-color: lch(89.71% 0 40.24)
  border: none
  &:hover
    background-color: lch(79.41% 0 129.18)

.remove
  background-color: lch(49.71% 88.93 40.24)
  border: none
  &:hover
    background-color: lch(45.88% 80.23 40.24)
</style>
