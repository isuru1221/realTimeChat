import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Message from './views/Message.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'message',
      component: Message
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import(/* webpackChunkName: "about" */ './views/SignUp.vue')
    }
  ]
})
