import { moonfarmApi } from '@/services/httpClient'
import { utils } from '@/services/utils'
export const moonfarmService = {
  getTokenPrice: async () => {
    const resp = await moonfarmApi.get(`prices`)
    return utils.wrapResponse(resp)
  }
}