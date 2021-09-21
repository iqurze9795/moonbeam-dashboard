import axios from "axios"
import { config } from "@/config"
import camelcaseKeys from "camelcase-keys"


const covalentApi = axios.create({
  baseURL: config.covalentHost,
  params: {
    key: config.covalentApiKey
  }
})

const ethBlockScanApi = axios.create({
  baseURL: config.ethBlockScanHost,
  params: {
    apiKey: config.ethBlockScanApiKey
  }
})
const moonriverBlockScanApi = axios.create({
  baseURL: config.moonriverBlockScanHost,
})
const moonbaseBlockScanApi = axios.create({
  baseURL: config.moonbaseBlockScanHost,
})
const polygonBlockScanApi = axios.create({
  baseURL: config.polygonBlockScanHost,
  params: {
    apiKey: config.polygonBlockScanApiKey
  }
})
const bscBlockScanApi = axios.create({
  baseURL: config.bscBlockScanHost,
  params: {
    apiKey: config.bscBlockScanApiKey
  }
})

const coinGeckoApi = axios.create({
  baseURL: config.coinGeckoHost,

})

const moonfarmApi = axios.create({
  baseURL: config.moonfarmHost,
})

const services = [covalentApi, coinGeckoApi, moonfarmApi]
services.forEach((service) => {
  service.interceptors.response.use(
    (response) => ({
      ...response,
      data: camelcaseKeys(response.data, { deep: true }),
    }),
    (error) => Promise.reject(error)
  )
})

export {
  covalentApi,
  coinGeckoApi,
  moonfarmApi,
  ethBlockScanApi,
  moonriverBlockScanApi,
  moonbaseBlockScanApi,
  polygonBlockScanApi,
  bscBlockScanApi,
}
