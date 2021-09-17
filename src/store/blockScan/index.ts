import { blockScanService } from "@/services/blockScanService"
import { get } from "lodash"
import camelcaseKeys from "camelcase-keys"
import Vue from "vue"
const approvalHash = "0x095ea7b3";

export default {
  namespaced: true,
  state: {
    userBalance: {}
  },
  getters: {
    tx: (state) => {
      return get(state, "tx", [])
    },
    isError: (state) => {
      return get(state, "isError", false)
    },
    errorMessage: (state) => {
      return get(state, "errorMessage", "")
    },
  },
  mutations: {
    tx(state, tx = []) {
      Vue.set(state, "tx", tx)
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
    async getTransactions({ commit, dispatch }, { address }) {
      const action = async () => {
        try {
          const resp = await blockScanService.getTransaction({ address })
          commit("tx", get(resp, ["data", "result"]))
        }
        catch (e) {
          commit("isError", true)
          commit("errorMessage", e)
        }
      }
      await dispatch("invocation", {
        action,
        moduleName: "blockScan/getTransactions"
      })
    }
  },
}
