import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Genre from '../views/Genre.vue'
import Playlist from '../views/Playlist.vue'
<<<<<<< HEAD
import Profile from '../views/Profile.vue'
=======
import Login from '../views/Login.vue'
>>>>>>> c2f85e1cb266cba6d121a5703b1f2099edcd7bca

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
<<<<<<< HEAD
    path: '/profile',
    name: 'Profile',
    component: Profile
=======
    path: '/login',
    name: 'Login',
    component: Login
>>>>>>> c2f85e1cb266cba6d121a5703b1f2099edcd7bca
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
