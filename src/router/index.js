import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import RegisterSurvivorForm from '@/pages/RegisterSurvivorForm'
import SurvivorOptions from '@/pages/SurvivorOptions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register-survivor-form',
      name: 'Register Survivor Form',
      component: RegisterSurvivorForm
    },
    {
      path: '/survivor-options',
      name: 'Survivor Options',
      component: SurvivorOptions
    }
  ]
})
