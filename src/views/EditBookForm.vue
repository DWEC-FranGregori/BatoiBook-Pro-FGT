<template>
    <div>
        <h1>Editar Libro</h1>
        <form @submit.prevent.stop="submit">
            <!--Modules-->
            <label for="publisher">Módulo</label>
            <select name="module" @change="change" v-model="book.idModule">
                <option :value="book.idModule" selected>{{ moduleCliteral }}</option>
                <option v-for="module  in  modules" :key="module.code" :value="module.code">{{ module.cliteral }}</option>
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

            <button type="submit">Guardar</button>

        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import BooksRepository from '@/repositories/BooksRepository'
import { useRoute } from 'vue-router'
import { useModulesStore } from '@/stores/modules'


const repository = new BooksRepository()
const router = useRoute()
const modulesStore = useModulesStore()
const { modules, findModuleByCode } = modulesStore

let book = ref({})
let moduleCliteral = ref("")

onMounted(async () => {
    book.value = await repository.findBookById(router.params.id)

    moduleCliteral.value = findModuleByCode(book.value.idModule).cliteral
})

const change = (e) => {
    book.value.idModule = e.target.value
}

const submit = async () => {
    try {
        await axios.patch(`http://localhost:3000/books/${book.value.id}`, book.value)
    } catch (error) {
        console.error(error)
    }
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

