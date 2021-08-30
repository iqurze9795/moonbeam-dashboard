import { covalentApi } from '@/services/httpClient'
import { config } from "@/config"
import { utils } from '@/services/utils'
export const classAService = {
  getTokenBalanceForAddress: async ({ address }) => {
    const resp = await covalentApi.get(`/${config.networkId}/address/${address}/balances_v2/`)
    return utils.wrapResponse(resp)
  }
}