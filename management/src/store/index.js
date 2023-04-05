import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from './home/index.js'
import userStore from './user/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    homeStore,
    userStore
  }
})
