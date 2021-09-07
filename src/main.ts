import Vue from "vue"
import VueCompositionAPI from "@vue/composition-api"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { Network } from "./config"
import { ToastPlugin, ModalPlugin } from "bootstrap-vue"


import i18n from "@/libs/i18n"
import router from "./router"
import store from "./store"
import App from "./App.vue"
import Vuelidate from "vuelidate"

// Global Components / Filters / Directive
import "./global-components"
import "./global-filters"
import "./global-directive"

// 3rd party plugins
import "@axios"
import "@/libs/acl"
import "@/libs/portal-vue"
import "@/libs/clipboard"
import "@/libs/toastification"
import "@/libs/sweet-alerts"
import "@/libs/vue-select"
import "@/libs/tour"

// Axios Mock Adapter
import "@/@fake-db/db"
import JsonEditor from 'vue-json-edit'
// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(Vuelidate)

// Composition API
Vue.use(VueCompositionAPI)
// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require("@core/assets/fonts/feather/iconfont.css") // For form-wizard

// import core styles
require("@core/scss/core.scss")

// import assets styles
require("@/assets/scss/style.scss")

Vue.config.productionTip = false
// Json editor
Vue.use(JsonEditor)

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: atob(Network.ETHEREUM_NODE_URL).split('/').pop(),
      rpc: {
        56: "https://bsc-dataseed1.binance.org",
        108: 'https://mainnet-rpc.thundercore.com',
        128: "https://http-mainnet.hecochain.com",
        137: "https://rpc-mainnet.matic.network",
        100: "https://rpc.xdaichain.com",
        43114: "https://api.avax.network/ext/bc/C/rpc",
        250: "https://rpcapi.fantom.network",
        1666600000: "https://api.harmony.one",
        1666600001: "https://s1.api.harmony.one",
        1666600002: "https://s2.api.harmony.one",
        1666600003: "https://s3.api.harmony.one",
      }
    }
  },
};


(window as any).web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions
});

new Vue({
  router,
  store,
  // i18n,
  render: (h) => h(App),
}).$mount("#app")
