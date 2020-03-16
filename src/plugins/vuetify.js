import Vue from "vue"
import Vuetify from "vuetify/lib"
import i18n from "@/i18n"
import "@/sass/overrides.sass"
import colors from "vuetify/lib/util/colors"

Vue.use(Vuetify)

const theme = {
  primary: "#4CAF50",
  secondary: "#9C27b0",
  accent: "#9C27b0",
  info: "#00CAE3",
}

const darkthemes = {
  primary: colors.red.darken1, // #E53935
  secondary: colors.red.lighten4, // #FFCDD2
  accent: colors.indigo.base, // #3F51B5
}

const MY_ICONS = {
  setting: "mdi-settings",
  account: "mdi-account",
  accountSetting: "mdi-account-settings-variant",
}

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: darkthemes,
      light: theme,
    },
  },
  icons: {
    iconfont: "mdiSvg", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    values: MY_ICONS,
  },
})
