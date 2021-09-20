import {
  ethBlockScanApi,
  moonriverBlockScanApi,
  moonbaseBlockScanApi,
  polygonBlockScanApi,
  bscBlockScanApi,
} from '@/services/httpClient'
const mapChainClient = {
  1: ethBlockScanApi,
  56: bscBlockScanApi,
  137: polygonBlockScanApi,
  1285: moonriverBlockScanApi,
  1287: moonbaseBlockScanApi
}
export const blockScanService = {
  getTransaction: async ({ address, chainId }) => {
    const resp = await mapChainClient[chainId].get(`/?module=account&action=txlist&address=${address}`)
    return resp
  }
}