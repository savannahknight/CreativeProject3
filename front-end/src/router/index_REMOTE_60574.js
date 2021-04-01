import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Genre from '../views/Genre.vue'
import Playlist from '../views/Playlist.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/genre',
    name: 'Genre',
    component: Genre
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
