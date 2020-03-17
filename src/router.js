import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  // mode: "hash",
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/Index"),
      children: [
        // Dashboard
        {
          name: "Dashboard",
          path: "",
          component: () => import("@/views/Dashboard"),
        },
        // Pages
        {
          name: "User Profile",
          path: "pages/user",
          component: () => import("@/views/users/UserProfile"),
        },
        {
          name: "Notifications",
          path: "components/notifications",
          component: () => import("@/views/component/Notifications"),
        },
        {
          name: "Icons",
          path: "components/icons",
          component: () => import("@/views/component/Icons"),
        },
        {
          name: "Typography",
          path: "components/typography",
          component: () => import("@/views/component/Typography"),
        },
        // Tables
        {
          name: "Regular Tables",
          path: "tables/regular-tables",
          component: () => import("@/views/tables/RegularTables"),
        },
        // Maps
        {
          name: "Google Maps",
          path: "maps/google-maps",
          component: () => import("@/views/maps/GoogleMaps"),
        },
        // Upgrade
        {
          name: "Upgrade",
          path: "upgrade",
          component: () => import("@/views/Upgrade"),
        },

        // VeeValidate
        {
          name: "Vee Validate",
          path: "components/vee-validate",
          component: () => import("@/views/FormVeeValidate"),
        },
      ],
    },
    {
      name: "Login",
      path: "/login",
      component: () => import("@/views/Login"),
    },
  ],
})
