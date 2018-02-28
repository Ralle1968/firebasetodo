import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Shopdashboard from '@/components/Shopdashboard'
import NewTodo from '@/components/NewTodo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-todo',
      component: NewTodo
    }, 
    {
      path: '/einkauf',
      name: 'shopdashboard',
      component: Shopdashboard
    }
  ]
})
