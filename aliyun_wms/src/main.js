// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.css'
import App from './App'
import router from './router'
import store from './store'
import './router/permission' // permission control
import 'babel-polyfill'
import api from '@/utils/common.js'
import '@/styles/common.css'

// 常用公共方法封装 添加到prototype
Vue.prototype.$api = api
// elementUI 配置
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
