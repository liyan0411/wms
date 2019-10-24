import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * 字段说明
 * title：页面标题
 * noPath：true不显示面包屑 false显示
 * isMenus:true 显示二级菜单 false 不显示二级菜单
 */
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
            noPath: true,
            isMenus: true,
            title: '首页'
          }
        },
        {
          path: '/chart',
          name: 'chart',
          component: resolve => {
            require(['@/pages/chart/chart'], resolve)
          },
          meta: {
            noPath: true,
            isMenus: true,
            title: '图表'
          }
        },
        {
          path: '/list',
          name: 'list',
          component: resolve => {
            require(['@/pages/list/list'], resolve)
          },
          meta: {
            title: '列表'
          }
        },
        {
          path: '/form',
          name: 'form',
          component: resolve => {
            require(['@/pages/form/form'], resolve)
          },
          meta: {
            isMenus: true,
            title: '表单'
          }
        },
        {
          path: '/index1',
          name: 'index1',
          component: resolve => {
            require(['@/pages/menuChild/index1'], resolve)
          },
          meta: {
            isMenus: true,
            title: '子菜单1'
          }
        },
        {
          path: '/index2',
          name: 'index2',
          component: resolve => {
            require(['@/pages/menuChild/index2'], resolve)
          },
          meta: {
            isMenus: true,
            title: '子菜单2'
          }
        },
        {
          path: '/index3',
          name: 'index3',
          component: resolve => {
            require(['@/pages/menuChild/index3'], resolve)
          },
          meta: {
            isMenus: true,
            title: '子菜单3'
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
