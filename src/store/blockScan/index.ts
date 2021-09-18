import { blockScanService } from "@/services/blockScanService"
import { get } from "lodash"
import { getApproveTransaction, getConntractInfo } from './utils'
import Vue from "vue"

export default {
  namespaced: true,
  state: {
    userBalance: {}
  },
  getters: {
    rawTx: (state) => {
      return get(state, "rawTx", [])
    },
    allowances: (state) => {
      return get(state, "allowances", [])
    },
    isError: (state) => {
      return get(state, "isError", false)
    },
    errorMessage: (state) => {
      return get(state, "errorMessage", "")
    },
  },
  mutations: {
    rawTx(state, tx = []) {
      Vue.set(state, "rawTx", tx)
    },
    allowances(state, tx = []) {
      Vue.set(state, "allowances", tx)
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
    async getTransactions({ commit, dispatch }, { address, provider }) {
      const action = async () => {
        try {
          const resp = await blockScanService.getTransaction({ address })
          let allowance = await getApproveTransaction(get(resp, ["data", "result"]))
          allowance = await Promise.all(allowance.map(async (item) => {
            const symbol = await getConntractInfo({ address: item.tokenApproved, provider })
            return { ...item, symbol }
          }))
          commit("rawTx", get(resp, ["data", "result"]))
          commit("allowances", allowance)
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
    },
  },
}
