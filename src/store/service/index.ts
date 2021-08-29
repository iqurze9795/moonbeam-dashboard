import get from "lodash/get"
import Vue from "vue"

export default {
  namespaced: true,
  state: {
    loadings: [],
  },
  getters: {
    isLoading: (state) => (moduleName) => {
      return get(state, "loadings", []).includes(moduleName)
    },
    loadings: (state) => {
      return get(state, "loadings", [])
    },
  },
  mutations: {
    loading(state, moduleName) {
      const loadings = [...state.loadings, moduleName]
      Vue.set(state, "loadings", loadings)
    },
    fulfilled(state, moduleName) {
      const loadings = state.loadings.filter((name) => name !== moduleName)
      Vue.set(state, "loadings", loadings)
    },
  },
  actions: {
    loading({ commit }, moduleName) {
      commit("loading", moduleName)
    },
    fulfilled({ commit }, moduleName) {
      commit("fulfilled", moduleName)
    },
    async invocation({ commit }, { moduleName, action }) {
      commit("loading", moduleName)
      await action()
      commit("fulfilled", moduleName)
    },
  },
}
