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
}
