import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '@/components/LandingPage'
import login from '@/pages/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: LandingPage
    // },
    {
      path: '/',
      name: 'login',
      component: login
    },
  ]
})
