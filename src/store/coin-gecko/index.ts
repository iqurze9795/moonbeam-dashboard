import { coinGeckoService } from "@/services/coinGeckoService"
import camelcaseKeys from "camelcase-keys"
import { get } from "lodash"
import Vue from "vue"

export default {
  namespaced: true,
  state: {
    userBalance: {}
  },
  getters: {
    trending: (state) => {
      return get(state, "trending", [])
    },
    isError: (state) => {
      return get(state, "isError", false)
    },
    errorMessage: (state) => {
      return get(state, "errorMessage", "")
    },
  },
  mutations: {
    trending(state, trending) {
      Vue.set(state, 'trending', trending)
    },
    isError(state, isError) {
      Vue.set(state, "isError", isError)
    },
    errorMessage(state, message) {
      Vue.set(state, "errorMessage", message)
    },
  },
  actions: {
    async invocation({ dispatch }, payload) {
      await dispatch("resetErrorState")
      await dispatch("service/invocation", { moduleName: payload.moduleName, action: payload.action }, { root: true })
    },
    async resetErrorState({ commit }) {
      commit("isError", false)
      commit("errorMessage", "")
    },
    async getTrending({ commit, dispatch }) {
      const action = async () => {
        try {
          const resp = await coinGeckoService.getTrending()
          console.log("resp", resp)
          commit("trending", get(resp, ["data", "coins"]))

        }
        catch (e) {
          commit("isError", true)
          commit("errorMessage", e.message)
        }
      }
      await dispatch("invocation", {
        action,
        moduleName: "classA/getUserBalance"
      })
    }
  },
}
