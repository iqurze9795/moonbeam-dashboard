import Vue from "vue"
import Vuex from "vuex"

// Modules
import app from "./app"
import appConfig from "./app-config"
import verticalMenu from "./vertical-menu"
import service from "./service"
import classA from "./classA"
import coinGecko from './coin-gecko'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    service,
    classA,
    coinGecko
  },
  strict: !!process.env.DEV,
})
