import { classAService } from "@/services/classAService"
import { moonfarmService } from "@/services/moonfarmService"
import { convertToHumanUnit, bigNumber, percentChange } from "@/utils/helpers"
import { get } from "lodash"
import { mapMoonriverChainSymbol } from '@/store/classA/helper'
import { moonRiver } from '@/utils/chainInfo'
import camelcaseKeys from "camelcase-keys"
import CoinGecko from 'coingecko-api';
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
      console.log("balances::",balances)
      let formatted = balances
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
            balance: `${convertToHumanUnit(item.balance, item.contractDecimals, 5)}`,
            quoteRate: bigNumber(item.quoteRate),
            quoteRate24H: item.quoteRate24H ? bigNumber(item.quoteRate24H) : ' -',
            change: item.quoteRate24H ? percentChange(item.quoteRate24H, item.quoteRate) : '-',
            value: convertToHumanUnit(
              item.balance * item.quoteRate,
              item.contractDecimals,
              2
            ),
            rawValue: (item.balance * item.quoteRate) / (Math.pow(10, item.contractDecimals)),
          }
        })
      formatted = formatted.sort((a, b) => b.rawValue - a.rawValue)
      Vue.set(state, 'balances', formatted)
    },
    topHolds(state, { balances }) {
      const totalValue = balances.reduce((sum, next) => {
        return sum + next.quote
      }, 0)
      balances = balances.filter((item) => {
        return item.quoteRate && parseInt(item.balance) > 0
      })
      let topHolds = balances.map((item) => {
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
          rawValue: (item.balance * item.quoteRate) / (Math.pow(10, item.contractDecimals)),
        }
      })
      topHolds = topHolds.sort((a, b) => b.rawValue - a.rawValue)
      if (topHolds.length >= 4) {
        topHolds = topHolds.splice(0, 4)
      }
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
            let balances = get(resp, ["data", "items"], [])
            if (moonRiver.includes(chainId)) {
              const price = await moonfarmService.getTokenPrice()
              const CoinGeckoClient = new CoinGecko();
              balances = await Promise.all(await balances.map(async item => {
                if (get(price, mapMoonriverChainSymbol[item.contractTickerSymbol])) {
                  const tokenPrice = get(price, mapMoonriverChainSymbol[item.contractTickerSymbol])
                  return {
                    ...item,
                    quote: (item.balance * tokenPrice.price) / (Math.pow(10, item.contractDecimals)),
                    quoteRate: tokenPrice.price,
                    logoUrl: tokenPrice.pic
                  }
                }
                else {
                  try {
                    const id = mapMoonriverChainSymbol[item.contractTickerSymbol]
                    if (id) {
                      const data = await CoinGeckoClient.coins.fetch(id, {})
                      const { image, marketData, name, symbol } = camelcaseKeys(get(data, ["data"], {}), { deep: true })
                      return {
                        ...item,
                        quoteRate24H: get(marketData, ["high24H", "usd"]),
                        contractName: name,
                        contractTickerSymbol: symbol,
                        quote: (item.balance * get(marketData, ["currentPrice", "usd"])) / (Math.pow(10, item.contractDecimals)),
                        quoteRate: get(marketData, ["currentPrice", "usd"]),
                        logoUrl: get(image, ["thumb"])
                      }
                    }
                  } catch (e) {
                    console.log(e)
                  }
                }
                return item
              }))
            }
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
