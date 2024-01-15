<template>
  <div class="messages">
    <div class="message">
      <button @click="remove">x</button>
      <p>{{ messages.error[0] }}</p>
    </div>
  </div>
  <div>
    <h1>Añadir Libro</h1>
    <form @submit.prevent.stop="submit">
      <!--Modules-->
      <label for="publisher">Módulo</label>
      <select name="module" @change="change">
        <option value="" selected>Seleccione un módulo</option>
        <option v-for=" module  in  modules " :key="module.code" :value="module.code">{{ module.cliteral }}</option>
      </select>

      <!--Publisher-->
      <label for="publisher">Editorial</label>
      <input type="text" v-model="book.publisher" />

      <!--Price-->
      <label for="price">Precio</label>
      <input type="number" v-model="book.price" />

      <!--Pages-->
      <label for="pages">Páginas</label>
      <input type="number" v-model="book.pages" />

      <!--Status-->
      <label for="status">Estado</label>
      <input type="radio" value="new" v-model="book.status">new
      <input type="radio" value="good" v-model="book.status">good
      <input type="radio" value="bad" v-model="book.status">bad

      <!--Comments-->
      <label for="comments">Comentarios</label>
      <textarea v-model="book.comments"></textarea>

      <button type="submit">Enviar</button>

    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useModulesStore } from '@/stores/modules'
const modulesStore = useModulesStore()
const { modules } = modulesStore

import { useBookFormStore } from '@/stores/messages/BookFormMessages';
const formMessages = useBookFormStore()
const { messages, addSuccessMessage, addErrorMessage, removeSuccessMesage, removeErrorMessage } = formMessages

import BooksRepository from '@/repositories/BooksRepository'


let book = ref({ id: null, idUser: "", idModule: "", publisher: null, price: null, pages: null, status: null, photo: null, comments: null, soldDate: null })

onMounted(() => {
  if (modules.length === 0) {
    addErrorMessage('Error al cargar los módulos')
  } else {
    removeErrorMessage('Error al cargar los módulos')
  }
})

const change = (e) => {
  book.value.idModule = e.target.value
}

const submit = async (e) => {
  const repository = new BooksRepository()
  try {
    await repository.addBook(book.value)
    addSuccessMessage('Libro añadido con éxito')
    console.log(messages.success)
    e.target.reset()
  } catch (error) {
    addErrorMessage('Error, no se pudo añadir el libro')
    console.error(error)
  }
}

const remove = (e) => {
  e.target.parentNode.remove(e.target.parentNode)
  removeErrorMessage(messages.error[0])
}

</script>

<style scoped lang="sass">
div
  text-align: center

label
  display: block
  margin-top: 5%
  margin-bottom: 1%

select
  padding-left: 2% 
  border: none
  height: 2em
  text-align: center

input[type="text"],input[type="number"]
  padding-left: 2% 
  border: none
  height: 2em
  width: 80%

textarea
  padding: 1%
  resize: none
  width: 100%
  height: 6em
  
button
  margin-top: 5%
  display: block

message
  padding: 3%
  width: 100%
  background-color: red
  align-items: center
  display: inline-block

</style>
