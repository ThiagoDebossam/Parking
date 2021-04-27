import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '../components/template/Content'
import HistoryList from '../components/history/HistoryList'
import Auth from '../components/auth/Auth'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Auth',
    path: '/',
    component: Auth
  },
  {
    name: 'History',
    path: '/history',
    component: HistoryList
  },
  {
    name: 'Content',
    path: '*',
    component: Content
  },
  {
    name: 'Content',
    path: '/dashboard',
    component: Content
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
