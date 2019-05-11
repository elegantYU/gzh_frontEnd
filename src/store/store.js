import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      
    },
    neighbor: {
      router: ''
    }
  },
  mutations: {
    neighborRouter (state, r) {
      state.neighbor.router = r
    }
  },
  actions: {

  }
})
