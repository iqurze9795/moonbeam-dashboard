import { classAService } from "@/services/classAService"
import camelcaseKeys from "camelcase-keys"
import { get } from "lodash"
import Vue from "vue"

export default {
  namespaced: true,
  state: {
    userBalance: {}
  },
  getters: {
    userBalances: (state) => {
      return get(state, "balances", [])
    },
    isError: (state) => {
      return get(state, "isError", false)
    },
    errorMessage: (state) => {
      return get(state, "errorMessage", "")
    },
  },
  mutations: {
    userBalances(state, { balances }) {
      Vue.set(state, 'balances', balances)
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
    async getUserBalances({ commit, dispatch }, { address }) {
      const action = async () => {
        try {
          const resp = await classAService.getTokenBalanceForAddress({ address })
          if (!resp.isError) {
            commit("userBalances", { balances: get(resp, ["data"]) })
          }
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
