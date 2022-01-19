import { debankApi } from '@/services/httpClient'

export const deBankService = {
  getUserBalance: async ({ address, chainId, isAll = true }) => {
    const resp = await debankApi.get(`/v1/user/token_list`, {
      params: {
        id: address,
        chain_id: chainId,
        is_all: isAll,
      },
    })
    return resp
  },
}
