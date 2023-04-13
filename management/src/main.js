import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入iconfont
import './assets/iconfont/iconfont.css'
//引入elementUI模块
require('./element-ui/index')
//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
