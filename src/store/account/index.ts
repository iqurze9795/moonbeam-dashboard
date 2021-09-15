import Vue from "vue"
import { get } from "lodash"


export default {
  namespaced: true,
  state: {
    address: "",
    chainId: "",
    isConnectProvider: false
  },
  getters: {
    address: (state) => {
      return get(state, "address", "")
    },
    chainId: (state) => {
      return get(state, "chainId", "")
    },
    isConnectProvider: (state) => {
      return get(state, "isConnectProvider", false)
    },
    isSupportChain: (state) => {
      return get(state, "isSupportChain", false)
    }
  },
  mutations: {
    address(state, address) {
      Vue.set(state, "address", address)
    },
    chainId(state, chainId) {
      Vue.set(state, "chainId", chainId)
    },
    isConnectProvider(state, isConnectProvider) {
      Vue.set(state, "isConnectProvider", isConnectProvider)
    },
    isSupportChain(state, isSupportChain) {
      Vue.set(state, "isSupportChain", isSupportChain)
    },
  },
  actions: {
    async setAddress({ commit }, address) {
      commit("address", address)
    },
    async setChainId({ commit }, chainId) {
      commit("chainId", chainId)
    },
    async setConnectProviderStatus({ commit }, isConnectProvider) {
      commit("isConnectProvider", isConnectProvider)
    },
    async isSupportChain({ commit }, isSupportChain) {
      commit("isSupportChain", isSupportChain)
    }
  },
}
