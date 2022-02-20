import axios from 'axios'
import { config } from '@/config'
import camelcaseKeys from 'camelcase-keys'

const debankApi = axios.create({
  baseURL: config.deBankHost,
})
const ethBlockScanApi = axios.create({
  baseURL: config.ethBlockScanHost,
  params: {
    apiKey: config.ethBlockScanApiKey,
  },
})
const moonriverBlockScanApi = axios.create({
  baseURL: config.moonriverBlockScanHost,
  params: {
    apiKey: config.moonriverBlockScanApiKey,
  },
})
const moonbeamBlockScanApi = axios.create({
  baseURL: config.moonbeamBlockScanHost,
  params: {
    apiKey: config.moonbeamBlockScanApiKey,
  },
})
const polygonBlockScanApi = axios.create({
  baseURL: config.polygonBlockScanHost,
  params: {
    apiKey: config.polygonBlockScanApiKey,
  },
})
const bscBlockScanApi = axios.create({
  baseURL: config.bscBlockScanHost,
  params: {
    apiKey: config.bscBlockScanApiKey,
  },
})

const coinGeckoApi = axios.create({
  baseURL: config.coinGeckoHost,
})

const services = [coinGeckoApi, debankApi]
services.forEach((service) => {
  service.interceptors.response.use(
    (response) => ({
      ...response,
      data: camelcaseKeys(response.data, { deep: true }),
    }),
    (error) => Promise.reject(error),
  )
})

export {
  debankApi,
  coinGeckoApi,
  ethBlockScanApi,
  moonriverBlockScanApi,
  moonbeamBlockScanApi,
  polygonBlockScanApi,
  bscBlockScanApi,
}
