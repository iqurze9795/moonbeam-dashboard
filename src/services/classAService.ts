import { covalentApi } from '@/services/httpClient'
import { utils } from '@/services/utils'
export const classAService = {
  getTokenBalanceForAddress: async ({ address, chainId }) => {
    const resp = await covalentApi.get(`/${chainId}/address/${address}/balances_v2/`)
    return utils.wrapResponse(resp)
  }
}