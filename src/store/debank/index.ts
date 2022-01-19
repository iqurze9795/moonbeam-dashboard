import { deBankService } from '@/services/deBankService'
import { bigNumber } from '@/utils/helpers'
import { get } from 'lodash'
import { mapDeBankChainId } from '@/utils/chainInfo'
import Vue from 'vue'
type BalanceItem = {
  amount: number
  price: number
  value: number
}

export default {
  namespaced: true,
  state: {
    userBalance: {},
  },
  getters: {
    userBalances: (state) => {
      return get(state, 'balances', [])
    },
    topHolds: (state) => {
      return get(state, 'topHolds', [])
    },
    isError: (state) => {
      return get(state, 'isError', false)
    },
    errorMessage: (state) => {
      return get(state, 'errorMessage', '')
    },
  },
  mutations: {
    userBalances(state, { balances = [] }) {
      Vue.set(state, 'balances', balances)
    },
    topHolds(state, { balances = [] }) {
      const networth = balances.reduce(
        (sum, next: BalanceItem) => sum + next.value,
        0,
      )
      let formatted: Array<BalanceItem> = balances
      if (formatted.length > 4) {
        formatted = formatted.slice(0, 4)
      }
      formatted = formatted.map((item: BalanceItem) => {
        const percent = bigNumber((item.value / networth) * 100)
        return {
          ...item,
          percent,
        }
      })
      Vue.set(state, 'topHolds', formatted)
    },
    isError(state, isError) {
      Vue.set(state, 'isError', isError)
    },
    errorMessage(state, message) {
      Vue.set(state, 'errorMessage', message)
    },
  },
  actions: {
    async invocation({ dispatch }, payload) {
      await dispatch('resetErrorState')
      await dispatch(
        'service/invocation',
        { moduleName: payload.moduleName, action: payload.action },
        { root: true },
      )
    },
    async resetErrorState({ commit }) {
      commit('isError', false)
      commit('errorMessage', '')
    },
    async getUserBalances({ commit, dispatch }, { address, chainId }) {
      const action = async () => {
        try {
          const resp = await deBankService.getUserBalance({
            address,
            chainId: mapDeBankChainId[chainId],
          })
          const balances = get(resp, ['data'], [])

          const formatted = balances
            .map((item: BalanceItem) => {
              return {
                ...item,
                value: item.amount * item.price,
              }
            })
            .sort((a, b) => b.value - a.value)
          commit('userBalances', { balances: formatted })
          commit('topHolds', { balances: formatted })
        } catch (e) {
          commit('isError', true)
          commit('errorMessage', e)
        }
      }
      await dispatch('invocation', {
        action,
        moduleName: 'debank/getUserBalance',
      })
    },
  },
}
