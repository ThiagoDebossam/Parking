import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuVisible: true,
    loading: false
  },
  mutations: {
    setMenu(state, value) {
      state.isMenuVisible = value
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getLoading (state) {
      return state.loading
    }
  }
})
