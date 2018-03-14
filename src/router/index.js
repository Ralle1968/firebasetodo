import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shopdashboard from '@/components/Shopdashboard'
import NewTodo from '@/components/NewTodo'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest:true
      }
    }, 
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest:true
      }
    }, 
    {
      path: '/new',
      name: 'new-todo',
      component: NewTodo,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/einkauf',
      name: 'shopdashboard',
      component: Shopdashboard
    }
  ]
});

// Nav Guards
router.beforeEach((to, from, next) => {
  //Check requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      //Go to login
      next({
        path:'/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
     // Check if logged in
     if (firebase.auth().currentUser) {
      //Go to login
      next({
        path:'/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
