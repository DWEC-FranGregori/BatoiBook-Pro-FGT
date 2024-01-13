import axios from "axios"
const SERVER = import.meta.env.VITE_URL_API

export default class BooksRepository {

    async getAllBooks() {
        try {
            const response = await axios.get(`${SERVER}/books`)
            return response.data
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async addBook(book) {
        console.log(book)
        try {
            await axios.post(`${SERVER}/books`, book)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async removeBook(id) {
        try {
            await axios.delete(`${SERVER}/books/${id}`)
        } catch (error) {
            throw Error(`Error: ${error}`)
        }
    }
}