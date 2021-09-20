import { coinGeckoService } from "@/services/coinGeckoService"
import camelcaseKeys from "camelcase-keys"
import { get } from "lodash"
import { bigNumber } from "@/utils/helpers"
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
    coinPriceHistory: (state) => (coin) => {
      return get(state, `${coin}.price_history`, [])
    },
    coinPrice: (state) => (coin) => {
      return get(state, `${coin}.price`, "-")
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
    coinPriceHistory: (state, { coin, history = [] }) => {
      const formatted = history.map(item => bigNumber(get(item, 1)))
      Vue.set(state, `${coin}.price_history`, formatted)
    },
    coinPrice: (state, { coin, price }) => {

      Vue.set(state, `${coin}.price`, price)
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
          const btcResp = await coinGeckoService.getCoinPrice({ coin: "bitcoin" })
          const formated = get(camelcaseKeys(resp, { deep: true }), ["data", "coins"], []).map(coin => {
            const { item } = coin
            const btcPrice = get(btcResp, ["data", "bitcoin", "usd"], 0)
            const price = item.priceBtc * btcPrice
            return {
              ...item,
              price
            }
          })
          commit("trending", formated)

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
    },
    async getCoinPrice({ commit, dispatch }, { coin }) {
      const action = async () => {
        try {
          const resp = await coinGeckoService.getCoinPrice({ coin })
          commit("coinPrice", { coin, price: get(resp, ["data", coin, "usd"]) })

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
    },
    async getCoinPriceHistory({ commit, dispatch }, { coin }) {
      const action = async () => {
        try {
          const resp = await coinGeckoService.getCoinPriceHistory({ coin })
          commit("coinPriceHistory", { coin, history: get(resp, ["data", "prices"]) })

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
