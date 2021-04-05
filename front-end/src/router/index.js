import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Genre from '../views/Genre.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Playlist from '../views/Playlist.vue'

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
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
