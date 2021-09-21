import { moonfarmApi } from '@/services/httpClient'
import { get } from 'lodash'
export const moonfarmService = {
  getTokenPrice: async () => {
    const resp = await moonfarmApi.get(`prices`)
    return get(resp, ["data"])
  }
}