import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/bookings',
    name: 'bookings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "bookings" */ '../views/Bookings.vue')
  },
  {
    path: '/diagnosis',
    name: 'diagnosis',
    component: () => import(/* webpackChunkName: "diagnosis" */ '../views/Diagnosis.vue')
  },
  {
    path: '/medicine',
    name: 'medicine',
    component: () => import(/* webpackChunkName: "medicine" */ '../views/Medicine.vue')
  },
  {
    path: '/fee',
    name: 'fee',
    component: () => import(/* webpackChunkName: "fee" */ '../views/Fee.vue')
  },
  {
    path: '/me',
    name: 'me',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
