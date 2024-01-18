<template>
  <div class="messages">
    <div class="message">
      <button @click="remove">x</button>
      <p>{{ messages.error[0] }}</p>
    </div>
  </div>
  <div>
    <h1>Añadir Libro</h1>
    <Form @submit="submit" :validation-schema="schema">
      <!--Modules-->
      <label for="publisher">Módulo</label>
      <Field as="select" name="module" @change="change">
        <option value="" selected>Seleccione un módulo</option>
        <option v-for="module  in  modules" :key="module.code" :value="module.code">{{ module.cliteral }}</option>
      </Field>
      <ErrorMessage name="module" />

      <!--Publisher-->
      <label for="publisher">Editorial</label>
      <Field type="text" v-model="book.publisher" name="publisher" />
      <ErrorMessage name="publisher" />

      <!--Price-->
      <label for="price">Precio</label>
      <Field type="number" v-model="book.price" name="price" />
      <ErrorMessage name="price" />

      <!--Pages-->
      <label for="pages">Páginas</label>
      <Field type="number" v-model="book.pages" name="pages" />
      <ErrorMessage name="pages" />

      <!--Status-->
      <label for="status">Estado</label>
      <Field type="radio" value="new" v-model="book.status" name="status" />new
      <Field type="radio" value="good" v-model="book.status" name="status" />good
      <Field type="radio" value="bad" v-model="book.status" name="status" />bad
      <ErrorMessage name="status" />

      <!--Comments-->
      <label for="comments">Comentarios</label>
      <textarea v-model="book.comments"></textarea>

      <button type="submit">Enviar</button>

    </Form>
  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import { onMounted, ref } from 'vue'

import { useModulesStore } from '@/stores/modules'
const modulesStore = useModulesStore()
const { modules } = modulesStore

import { useBookFormStore } from '@/stores/messages/BookFormMessages'
const formMessages = useBookFormStore()
const { messages, addSuccessMessage, addErrorMessage, removeSuccessMesage, removeErrorMessage } = formMessages

import BooksRepository from '@/repositories/BooksRepository'

const schema = yup.object({
  module: yup.string().required('Campo obligatorio'),
  publisher: yup.string().required('Campo obligatorio').min(2, 'Mínimo 2 caracteres').max(5, 'Máixmo 5 caracteres'),
  price: yup.number().required('Campo obligatorio').min(0, 'Números negativos no válidos').max(1000, 'No puede superar los 1000'),
  pages: yup.number().required('Campo obligatorio').min(0, 'Números negativos no válidos').max(10000, 'No puede superar los 10000'),
  status: yup.string().required('Campo obligatorio')
})

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
    e.target.reset()
  } catch (error) {
    addErrorMessage('Error, no se pudo añadir el libro')
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

span
  margin-top: 1%
  color: lch(43.24% 80.23 36.4)
  display: block

</style>
