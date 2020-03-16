// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/index"
import "./plugins/base"
import "./plugins/chartist"
import "./plugins/vee-validate"
import vuetify from "./plugins/vuetify"
import i18n from "./i18n"

import { extend, ValidationObserver, ValidationProvider } from "vee-validate"

import * as rules from "vee-validate/dist/rules"
import { messages } from "vee-validate/dist/locale/en.json"

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  })
})

Vue.component("validation-provider", ValidationProvider)
Vue.component("validation-observer", ValidationObserver)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount("#app")
