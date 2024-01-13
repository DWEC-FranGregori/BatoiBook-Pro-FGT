import { computed, ref } from "vue"
import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", () => {
  let cart = ref([])

  function addBook(book) {
    cart.value.push(book)
  }

  function removeBook(id) {
    const indexToRemove = cart.value.findIndex(book => book.id === id);
    cart.value.splice(indexToRemove, 1);
  }

  const totalPrice = computed(() => {
    return cart.value.reduce((accumulator, book) => {
      return accumulator + book.price
    }, 0)
  })

  function clear() {
    cart.value.splice(0, cart.value.length)
  }

  return { cart, addBook, removeBook, totalPrice, clear }
})
