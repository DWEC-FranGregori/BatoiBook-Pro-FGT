<template>
  <div>
    <BookItem v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>

<script setup>
import BookItem from "./BookItem.vue";
import BooksRepository from "@/repositories/BooksRepository.js";

import { ref, onMounted } from "vue";

let books = ref([]);
const repository = new BooksRepository();

onMounted(async () => {
  try {
    books.value = await repository.getAllBooks();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped lang="sass">
div
  display: flex
  flex-direction: column
</style>
