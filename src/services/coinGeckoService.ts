import { coinGeckoApi } from '@/services/httpClient'
import { utils } from '@/services/utils'
export const coinGeckoService = {
  getTrending: async () => {
    const resp = await coinGeckoApi.get(`/search/trending`)
    return resp
  },
  getCoinPrice: async ({ coin }) => {
    const resp = await coinGeckoApi.get(`simple/price?ids=${coin}&vs_currencies=usd`)
    return resp
  },
  getCoinPriceHistory: async ({ coin }) => {
    const resp = await coinGeckoApi.get(`coins/${coin}/market_chart?vs_currency=usd&days=1`)
    return resp
  }
}