<template>
  <div>
    <h1>Books</h1>
    <div class="messages">
      <div v-for="(message, index) in messages.succes" :key="index">
        <button @click="removeSuccesMessage">
          X
        </button>
        {{ message }}
      </div>
    </div>
    <BooksList />
  </div>
</template>

<script setup>
import BooksList from "@/components/BooksList.vue"
import { useBooksStore } from "@/stores/messages/BooksMessages"
const store = useBooksStore()

const { messages, removeSuccesMessage } = store

if (messages.value) {
  console.log(messages.value.success)
}
</script>

<style scoped lang="sass"></style>
