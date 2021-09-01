import { coinGeckoApi } from '@/services/httpClient'
import { utils } from '@/services/utils'
export const coinGeckoService = {
  getTrending: async () => {
    const resp = await coinGeckoApi.get(`/search/trending`)
    return resp
  },
  getBitCoinPrice: async () => {
    const resp = await coinGeckoApi.get(`simple/price?ids=bitcoin&vs_currencies=usd`)
    return resp
  }
}