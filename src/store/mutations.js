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
}
