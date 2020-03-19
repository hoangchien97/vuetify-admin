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
}
