import Vue from "vue"

export const RESPONSE_API = {
  SUCCESS: "success",
  ERROR: "error",
}

export const VALID_LENGTH = {
  MAX: 255,
  MIN: 8,
  EMAIL: 50,
  PASSWORD: 6,
  NAME: 100,
}

export const TIME_TYPE = {
  SECOND: "SECOND",
  MINUTE: "MINUTE",
  HOUR: "HOUR",
  DAY: "DAY",
  MONTH: "MONTH",
  DAYOFWEEK: "DAYOFWEEK",
}

Vue.prototype.$constants = {
  VALID_LENGTH,
  RESPONSE_API,
  TIME_TYPE,
}
