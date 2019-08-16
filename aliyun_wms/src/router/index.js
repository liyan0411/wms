import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => {
        require(['@/pages/login'], resolve)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => {
        require(['@/pages/login'], resolve)
      },
      meta: {
        title: '登录'
      }
    },
    {
      path: '/view',
      name: 'view',
      component: resolve => {
        require(['@/layout/index'], resolve)
      },
      meta: {
        title: '主页'
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: resolve => {
            require(['@/pages/home'], resolve)
          },
          meta: {
            title: '首页'
          }
        }
      ]
    },
    //404页面
    {
      path: '*',
      component: resolve => require(['@/pages/error-page/404.vue'], resolve),
      meta: {
        title: '404未找到'
      }
    },
    //401页面
    {
      path: '/401',
      component: resolve => require(['@/pages/error-page/401.vue'], resolve),
      meta: {
        title: '401无权限'
      }
    }
  ]
})
export default router;
