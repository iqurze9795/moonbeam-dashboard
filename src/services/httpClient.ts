import axios from "axios"
import { config } from "@/config"
import camelcaseKeys from "camelcase-keys"

const covalentApi = axios.create({
  baseURL: config.covalentHost,
  params: {
    key: config.covalentApiKey
  }
})

const blockScanApi = axios.create({
  baseURL: config.blockScanHost,
})

const coinGeckoApi = axios.create({
  baseURL: config.coinGeckoHost,

})

const services = [covalentApi, coinGeckoApi]
services.forEach((service) => {
  service.interceptors.response.use(
    (response) => ({
      ...response,
      data: camelcaseKeys(response.data, { deep: true }),
    }),
    (error) => Promise.reject(error)
  )
})

export { covalentApi, coinGeckoApi, blockScanApi }
