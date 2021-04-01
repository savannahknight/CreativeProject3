import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Genre from '../views/Genre.vue'
import Playlist from '../views/Playlist.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router