import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import RegisterSurvivorForm from '@/pages/RegisterSurvivorForm'
import SurvivorMenu from '@/pages/SurvivorMenu'
import GameSummary from '@/pages/GameSummary'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/survivor-menu',
      name: 'Survivor menu',
      component: SurvivorMenu
    },
    {
      path: '/game-summary',
      name: 'Game Summary',
      props: true,
      component: GameSummary
    }
  ]
})
