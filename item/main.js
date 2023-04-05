import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 导入请求文件
import api from  './utils/api.js'
Vue.prototype.$api = api


//引入双工通信文件
import io from  './common/js/weapp.socket.io.js'
Vue.prototype.socket =io('ws://192.168.100.13:8888');


// 引入uview
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif