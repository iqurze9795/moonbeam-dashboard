import { bscApi } from '@/services/httpClient'

export const blockScanService = {
  getTransaction: async ({ address }) => {
    const resp = await bscApi.get(`/?module=account&action=txlist&address=${address}`)
    return resp
  }
}