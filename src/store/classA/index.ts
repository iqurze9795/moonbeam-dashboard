import { classAService } from "@/services/classAService"
import camelcaseKeys from "camelcase-keys"
import { convertToHumanUnit, bigNumber, percentChange } from "@/utils/helpers"
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
    topHolds: (state) => {
      return get(state, "topHolds", [])
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
      const formatted = balances
        .filter((item) => {
          return item.quoteRate && parseInt(item.balance) > 0
        })
        .map((item) => {
          return {
            ...item,
            label: {
              name: item.contractName,
              type: item.contractTickerSymbol
            },
            logoUrl:
              item.logoUrl === ''
                ? require('@/assets/images/icons/notfound.png')
                : item.logoUrl,
            balance: `${convertToHumanUnit(item.balance, item.contractDecimals)}`,
            quoteRate: bigNumber(item.quoteRate),
            quoteRate24H: item.quoteRate24H ? bigNumber(item.quoteRate24H) : ' -',
            change: item.quoteRate24H ? percentChange(item.quoteRate24H, item.quoteRate) : '-',
            value: convertToHumanUnit(
              item.balance * item.quoteRate,
              item.contractDecimals
            )
          }
        })
      Vue.set(state, 'balances', formatted)
    },
    topHolds(state, { balances }) {
      const totalValue = balances.reduce((sum, next) => {
        return sum + next.quote
      }, 0)
      balances = balances.filter((item) => {
        return item.quoteRate && parseInt(item.balance) > 0
      })
      if (balances.length >= 6) {
        balances = balances.splice(0, 6)
      }
      const topHolds = balances.map((item) => {
        return {
          logoUrl:
            item.logoUrl === ''
              ? require('@/assets/images/icons/notfound.png')
              : item.logoUrl,
          percent: bigNumber((item.quote / totalValue) * 100),
          label: {
            name: item.contractName,
            symbol: item.contractTickerSymbol
          },
          hold: item.quote,
          change: percentChange(item.quoteRate24H, item.quoteRate),
        }
      })
      Vue.set(state, 'topHolds', topHolds)
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
    async getUserBalances({ commit, dispatch }, { address, chainId }) {
      const action = async () => {
        try {
          const resp = await classAService.getTokenBalanceForAddress({ address, chainId })
          if (!resp.isError) {
            const balances = get(resp, ["data", "items"])
            commit("userBalances", { balances })
            commit("topHolds", { balances })
          }
        }
        catch (e) {
          commit("isError", true)
          commit("errorMessage", e)
        }
      }
      await dispatch("invocation", {
        action,
        moduleName: "classA/getUserBalance"
      })
    }
  },
}
