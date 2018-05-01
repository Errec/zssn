import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddSurvivorForm from '@/components/AddSurvivorForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add-survivor-form',
      name: 'Add Survivor Form',
      component: AddSurvivorForm
    }
  ]
})
