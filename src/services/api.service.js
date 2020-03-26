import axios from "axios"

export default {
  // eslint-disable-next-line prettier/prettier
  install: function () {
    this.axios = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}`
        ? `${process.env.VUE_APP_API_URL}`
        : "http://localhost:3000/api/v1",
    })

    // Add a request interceptor
    axios.interceptors.request.use(
      // eslint-disable-next-line prettier/prettier
      function (config) {
        // Do something before request is sent
        return config
      },
      // eslint-disable-next-line prettier/prettier
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    axios.interceptors.response.use(
      // eslint-disable-next-line prettier/prettier
      function (response) {
        // Do something with response data
        return response
      },
      // eslint-disable-next-line prettier/prettier
      function (error) {
        // Do something with response error
        return Promise.reject(error)
      }
    )
  },
  doPost(url, data) {
    const token = localStorage.getItem("token")
    return this.axios.post(url, data, {
      // eslint-disable-next-line prettier/prettier
      headers: { 'Authorization': `Basic ${token}` },
    })
  },
  doGet(url, data) {
    const token = localStorage.getItem("token")
    return this.axios.get(url, {
      // eslint-disable-next-line prettier/prettier
      headers: { 'Authorization': `Basic ${token}` },
      params: data,
    })
  },

  doLogin(data) {
    return this.doPost("/users/loginByApi", data)
  },

  getLogSyncJira(data) {
    return this.doPost("/jira/list", data)
  },

  getListProjectJira(data) {
    return this.doGet("/project/get", data)
  },

  getLogSync(data) {
    return this.doPost("/getLogSync", data)
  },

  createCronJob(data) {
    return this.doPost("/cron/setting", data)
  },

  getListUserMap() {
    return this.doGet("/user/getUser")
  },

  getListUserExternal() {
    return this.doGet("/user/getExternalUser")
  },

  userMapping(data) {
    return this.doPost("/user/mapping", data)
  },
}
