import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import articleManagement from '@/page/articleManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    }, {
      path: '/article/md',
      component: articleManagement
    }
  ]
})
