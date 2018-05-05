import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import RegisterSurvivorForm from '@/components/RegisterSurvivorForm'
import SurvivorOptions from '@/components/SurvivorOptions'

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
