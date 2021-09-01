import { coinGeckoApi } from '@/services/httpClient'
import { utils } from '@/services/utils'
export const coinGeckoService = {
  getTrending: async () => {
    const resp = await coinGeckoApi.get(`/search/trending`)
    return resp
  }
}