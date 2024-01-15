import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import BooksView from "../views/BooksView.vue"
import CreateBookView from "../views/CreateBookView.vue"
import EditBookForm from "../views/EditBookForm.vue"
import CartView from "../views/CartView.vue"
import AboutView from "../views/AboutView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/books",
      name: "books",
      component: BooksView,
    },
    {
      path: "/createBook",
      name: "createBook",
      component: CreateBookView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditBookForm,
      props: true
    }
  ],
})

export default router
