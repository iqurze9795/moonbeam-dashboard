import { blockScanApi } from '@/services/httpClient'

export const blockScanService = {
  getTransaction: async ({ address }) => {
    const resp = await blockScanApi.get(`/?module=account&action=txlist&address=${address}`)
    return resp
  }
}