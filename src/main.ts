import Vue from "vue"
import { ToastPlugin, ModalPlugin } from "bootstrap-vue"
import VueCompositionAPI from "@vue/composition-api"

import { config } from "./config"

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

new Vue({
  router,
  store,
  // i18n,
  render: (h) => h(App),
}).$mount("#app")
