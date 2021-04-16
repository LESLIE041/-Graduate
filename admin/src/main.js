import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/index'

import './style.css'

Vue.config.productionTip = false

// 将http加载到vue的实例上，可以在任意页面利用this.$http访问http这个数据请求接口
import http from './http'
Vue.prototype.$http = http

// 全局设定。利用mixin
Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
