// https://vuex.vuejs.org/en/mutations.html

export default {
  SET_BAR_IMAGE(state, payload) {
    state.barImage = payload
  },
  SET_DRAWER(state, payload) {
    state.drawer = payload
  },
  GET_LOG_SYNC_JIRA(state, payload) {
    state.listLogSyncJira = payload.data
  },
  GET_LIST_PROJECT_JIRA(state, payload) {
    state.listProjectJira = payload.data
  },
  GET_LOG_SYNC(state, payload) {
    state.listLogSync = payload.data
  },
  SETTING_CRON_JOB(state, payload) {
    state.cronJobSetting = payload.data
  },
  SETTING_CRON_JOB_FAILED(state, payload) {
    state.msg.message = payload.message
    state.msg.isShow = true
    state.msg.color = "red"
  },
  // when create success
  CREATE_SUCCESS(state, payload) {
    state.msg.message = payload
    state.msg.isShow = true
    state.msg.color = "success"
  },
}
