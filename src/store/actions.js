// https://vuex.vuejs.org/en/actions.html
import api from "@/services/api.service"
import { RESPONSE_API } from "@/plugins/constants"

export default {
  async getLogSyncJira({ commit }, params) {
    try {
      const res = await api.getLogSyncJira(params)
      if (res.data.status === RESPONSE_API.SUCCESS) {
        commit("GET_LOG_SYNC_JIRA", res.data)
      } else {
        console.log("faild")
      }
    } catch (error) {
      console.log("error", error)
    }
  },
  async getListProjectJira({ commit }, params) {
    try {
      const res = await api.getListProjectJira()
      if (res.data.status === RESPONSE_API.SUCCESS) {
        commit("GET_LIST_PROJECT_JIRA", res.data)
      } else {
        console.log("faild")
      }
    } catch (error) {
      console.log("error", error)
    }
  },
  async getLogSync({ commit }, params) {
    try {
      const res = await api.getLogSync(params)
      if (res.data.status === RESPONSE_API.SUCCESS) {
        commit("GET_LOG_SYNC", res.data)
      } else {
        console.log("faild")
      }
    } catch (error) {
      console.log("error", error)
    }
  },

  async createCronJob({ commit }, params) {
    try {
      const res = await api.createCronJob(params)
      if (res.data.code === 200) {
        commit("SETTING_CRON_JOB", res.data)
        commit("CREATE_SUCCESS", "Create setting cron job successfully")
      }
    } catch (error) {
      commit("SETTING_CRON_JOB_FAILED", error.response.data)
    }
  },
}
