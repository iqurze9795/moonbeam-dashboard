import axios from "axios"
import { config } from "@/config"
import camelcaseKeys from "camelcase-keys"

const covalentApi = axios.create({
  baseURL: config.covalentHost,
  params: {
    key: config.covalentApiKey
  }
})

const services = [covalentApi]
services.forEach((service) => {
  service.interceptors.response.use(
    (response) => ({
      ...response,
      data: camelcaseKeys(response.data, { deep: true }),
    }),
    (error) => Promise.reject(error)
  )
})

export { covalentApi }
