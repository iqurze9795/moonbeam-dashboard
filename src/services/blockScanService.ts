import { mapChainClient } from "@/utils/chainInfo"
export const blockScanService = {
  getTransaction: async ({ address, chainId }) => {
    const resp = await mapChainClient[chainId].get(`/?module=account&action=txlist&address=${address}`)
    return resp
  }
}