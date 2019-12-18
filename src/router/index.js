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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: () => import(/* webpackChunkName: "bookings" */ '../views/Bookings.vue')
  },
  {
    path: '/callp',
    name: 'callp',
    component: () => import(/* webpackChunkName: "callp" */ '../views/CallPatient.vue')
  },
  {
    path: '/diagnosis/:patientId',
    name: 'diagnosis',
    props: true,
    component: () => import(/* webpackChunkName: "diagnosis" */ '../views/Diagnosis.vue')
  },
  {
    path: '/medicine',
    name: 'medicine',
    component: () => import(/* webpackChunkName: "medicine" */ '../views/Medicine.vue')
  },
  {
    path: '/medhandout',
    name: 'medhandout',
    component: () => import(/* webpackChunkName: "medicine" */ '../views/MedHandout.vue')
  },
  {
    path: '/fee',
    name: 'fee',
    component: () => import(/* webpackChunkName: "fee" */ '../views/Fee.vue')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
