import { createMemoryHistory, createRouter } from 'vue-router'

import UseMouse from '../components/UseMouse.vue'
import Home from '../components/Home.vue'
import Pokedex from "../components/Pokedex.vue";
import BookShop from "../components/BookShop.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/mousecheck', component: UseMouse },
    { path: '/pokedex', component: Pokedex },
    { path: '/bookshop', component: BookShop },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router