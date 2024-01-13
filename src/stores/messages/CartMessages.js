import { ref } from "vue"
import { defineStore } from "pinia"

export const useCartStore = defineStore("CartMessages", () => {
    let messages = ref({
        "success": [],
        "error": []
    })

    function addSuccessMessage(message) {
        messages.value.success.push(message)
    }

    function addErrorMessage(message) {
        messages.value.error.push(message)
    }

    function removeSucccessMessage(message) {
        const indexToRemove = messages.value.findIndex(item => item === message)
        messages.value.success.splice(indexToRemove, 1)
    }

    function removeErrorMessage(message) {
        const indexToRemove = messages.value.findIndex(item => item === message)
        messages.value.error.splice(indexToRemove, 1)
    }

    function resetAll() {
        messages.value = {
            "success": [],
            "error": []
        }
    }

    return { messages, addSuccessMessage, addErrorMessage, removeSucccessMessage, removeErrorMessage, resetAll }
})
