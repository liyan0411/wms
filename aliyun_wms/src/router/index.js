import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: resolve => require(['@/components/HelloWorld'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => {
        require(['@/pages/login'], resolve)
      }
    }
  ]
})
