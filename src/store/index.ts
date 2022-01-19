import Vue from "vue"
import Vuex from "vuex"

// Modules
import app from "./app"
import appConfig from "./app-config"
import verticalMenu from "./vertical-menu"
import service from "./service"
import debank from "./debank"
import coinGecko from './coin-gecko'
import preference from './preference'
import blockScan from './blockScan'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    service,
    debank,
    coinGecko,
    preference,
    blockScan
  },
  strict: !!process.env.DEV,
})
