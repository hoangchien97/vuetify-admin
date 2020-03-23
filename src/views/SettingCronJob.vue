<template>
  <v-container>
    <base-material-card
      icon="mdi-clipboard-text"
      title="Setting Cron Job"
      class="px-5 py-3"
    >
      <v-row justify="center">
        <v-col cols="12" lg="6" style="border: 1px solid #000">
          <div class="headline text-left">Schedule details</div>
          <v-card color="#385F73" dark>
            <v-card-title class="headline mt-0">Cron Ranges</v-card-title>
            <v-card-subtitle class="mt-0"
              >When specifying your cron values you'll need to make sure that
              your values fall within the ranges. For instance, some cron's use
              a 0-6 range for the day of week where both 0 and 7 represent
              Sunday. We do not. And that is an optimisation.</v-card-subtitle
            >
            <v-row>
              <v-col cols="12" md="6">
                <template v-for="item in inforCron">
                  <v-card-subtitle :key="item.id" class="pt-0">{{
                    item.text
                  }}</v-card-subtitle>
                </template>
              </v-col>
              <v-col cols="12" md="6">
                <template v-for="(item, index) in inforCharCron">
                  <v-card-subtitle :key="index" class="pt-0">{{
                    item
                  }}</v-card-subtitle>
                </template>
              </v-col>
            </v-row>
          </v-card>

          <form ref="formCronJob">
            <v-row>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Type:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-select
                  v-model="dataCronJob.selectCronJob"
                  :items="typeCronjobs"
                  label="Type cron job"
                  data-vv-name="select"
                  outlined
                  dense
                  required
                ></v-select>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Second:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="dataCronJob.second"
                  label="0-59"
                  placeholder="*"
                  dense
                  outlined
                  solo
                  :rules="[rules.second]"
                  @change="
                    inforTime(
                      $constants.TIME_TYPE.SECOND,
                      dataCronJob.second,
                      'Minute'
                    )
                  "
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtSecond" dense readonly>
                </v-text-field>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Minute:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="dataCronJob.minute"
                  label="0-59"
                  dense
                  outlined
                  solo
                  :rules="[rules.second]"
                  @change="
                    inforTime(
                      $constants.TIME_TYPE.MINUTE,
                      dataCronJob.minute,
                      'Hour'
                    )
                  "
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtMinute" dense readonly>
                </v-text-field>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Hour:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="dataCronJob.hour"
                  label="0-23"
                  dense
                  outlined
                  solo
                  :rules="[rules.hour]"
                  @change="
                    inforTime(
                      $constants.TIME_TYPE.HOUR,
                      dataCronJob.hour,
                      'Day'
                    )
                  "
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtHour" dense readonly> </v-text-field>
              </v-col>

              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Day:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="dataCronJob.day"
                  label="1-31"
                  dense
                  outlined
                  solo
                  :rules="[rules.dayOfMonth]"
                  @change="
                    inforTime(
                      $constants.TIME_TYPE.DAY,
                      dataCronJob.day,
                      'Month'
                    )
                  "
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtDay" dense readonly> </v-text-field>
              </v-col>

              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Month:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="dataCronJob.month"
                  label="1-12 (or names, see below)"
                  dense
                  outlined
                  solo
                  :rules="[rules.month]"
                  @change="
                    inforTime(
                      $constants.TIME_TYPE.MONTH,
                      dataCronJob.month,
                      'Year'
                    )
                  "
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtMonth" dense readonly> </v-text-field>
              </v-col>

              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Weekday:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="dataCronJob.weekday"
                  label="0-6 (0 or 6 is Sun, or use names)"
                  dense
                  outlined
                  solo
                  :rules="[rules.dayOfWeek]"
                  @change="
                    inforTime(
                      $constants.TIME_TYPE.WEEKDAY,
                      dataCronJob.weekday,
                      'Weekday'
                    )
                  "
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtWEEKDAY" dense readonly>
                </v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                Cron Expression
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="cronExp" dense readonly> </v-text-field>
              </v-col>
              <v-col class="col col-11 py-0">
                <v-btn
                  class="float-right mr-0"
                  color="success"
                  @click="submitForm()"
                  >Add New Cron Job</v-btn
                >
              </v-col>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
import { TIME_TYPE } from "@/plugins/constants"
export default {
  name: "SettingCronJob",
  data() {
    return {
      dataCronJob: {
        second: "*",
        minute: "*",
        hour: "*",
        day: "*",
        month: "*",
        weekday: "*",
        selectCronJob: null,
      },
      txtSecond: "Every Second (*)",
      txtMinute: "Every Minute (*)",
      txtHour: "Every Hour (*)",
      txtDay: "Every Day (*)",
      txtMonth: "Every Month (*)",
      txtWEEKDAY: "Every Weekday (*)",
      inforCron: [
        {
          id: "second",
          text: "Seconds: 0-59",
        },
        {
          id: "minute",
          text: "Minutes: 0-59",
        },
        {
          id: "hour",
          text: "Hours: 0-59",
        },
        {
          id: "dayOfMonth",
          text: "Day of Month: 1-31",
        },
        {
          id: "months",
          text: "Months: 1-12",
        },
        {
          id: "dayOfWeek",
          text: "Day of Week: 0-6",
        },
      ],
      inforCharCron: [
        "*	: any value,",
        " ,	: value list separator",
        "-	: range of values",
        "/	: step values",
      ],
      arrayMonth: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      daysInWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      typeCronjobs: ["user", "project", "sync"],
      cronExp: "* * * * * *",
      rules: {
        required: value => !!value || "Field is required.",
        requiredTypeCron: value => !!value || "Type Cron Job is required.",
        second: value => {
          const pattern = /((\*|[0-5]?[0-9]|\*\/[0-9]?[0-9]|[0-9]?[0-9]-[0-9]?[0-9])){1}$/
          return pattern.test(value) || "Has to be between 0-59"
        },
        hour: value => {
          const pattern = /((\*|[01]?[0-9]|2[0-3]|\*\/[0-9]?[0-9]|[0-9]?[0-9]-[0-9]?[0-9])){1}$/
          return pattern.test(value) || "Has to be between 0-23"
        },
        dayOfMonth: value => {
          const pattern = /((\*|[01]?[0-9]|3[0-1]|\*\/[0-9]?[0-9]|[0-9]?[0-9]-[0-9]?[0-9])){1}$/
          return pattern.test(value) || "Has to be between 1-31"
        },
        month: value => {
          const pattern = /((\*|[01]?[0-9]|1[0-1]|\*\/[0-9]?[0-9]|[0-9]?[0-9]-[0-9]?[0-9])){1}$/
          return pattern.test(value) || "Month must be 0-11"
        },
        dayOfWeek: value => {
          const pattern = /((\*|[0-6]|\*\/[0-9]?[0-9]|\*\/[0-9]?[0-9]|[0-9]?[0-9]-[0-9]?[0-9])){1}$/
          return pattern.test(value) || "Day of week must be 0-6"
        },
      },
    }
  },
  computed: {},
  methods: {
    inforTime(type, timeCurrent, nextTime) {
      const txtCronExp =
        this.dataCronJob.second +
        " " +
        this.dataCronJob.minute +
        " " +
        this.dataCronJob.hour +
        " " +
        this.dataCronJob.day +
        " " +
        this.dataCronJob.month +
        " " +
        this.dataCronJob.weekday
      switch (type) {
        case TIME_TYPE.SECOND:
          this.txtSecond = this.convertInforText(type, timeCurrent, nextTime)
          this.cronExp = txtCronExp
          break
        case TIME_TYPE.MINUTE:
          this.txtMinute = this.convertInforText(type, timeCurrent, nextTime)
          this.cronExp = txtCronExp
          break
        case TIME_TYPE.HOUR:
          this.txtHour = this.convertInforText(type, timeCurrent, nextTime)
          this.cronExp = txtCronExp
          break
        case TIME_TYPE.DAY:
          this.txtDay = this.convertInforText(type, timeCurrent, nextTime)
          this.cronExp = txtCronExp
          break
        case TIME_TYPE.MONTH:
          this.txtMonth = this.convertInforText(type, timeCurrent, nextTime)
          this.cronExp = txtCronExp
          break
        case TIME_TYPE.WEEKDAY:
          this.txtWEEKDAY = this.convertInforText(type, timeCurrent, nextTime)
          this.cronExp = txtCronExp
          break
        default:
          break
      }
    },
    convertInforText(type, timeCurrent, nextTime) {
      let txt = ""
      if (timeCurrent === "*") {
        // case "*"
        txt = "Once Per " + nextTime
      } else {
        if (type === TIME_TYPE.SECOND || type === TIME_TYPE.MINUTE) {
          txt = "At " + type.toLocaleLowerCase() + " " + timeCurrent
        } else if (type === TIME_TYPE.HOUR) {
          txt = "Pass hour " + timeCurrent
        } else if (type === TIME_TYPE.DAY) {
          txt = "On day of month " + timeCurrent
        } else if (type === TIME_TYPE.MONTH) {
          txt = "In " + this.arrayMonth[timeCurrent]
        } else {
          txt = "On " + this.daysInWeek[timeCurrent]
        }
      }

      if (timeCurrent.includes("*/")) {
        // case "/*"
        const toTime = timeCurrent.substring(timeCurrent.length - 1)
        txt = "Once Every " + toTime + " " + nextTime
        if (type === TIME_TYPE.MONTH) {
          console.log(111)
        }
      } else if (timeCurrent.includes("-")) {
        // case "-"
        const length = timeCurrent.indexOf("-")
        const fromTime = parseInt(timeCurrent.substring(0, length))
        const toTime = parseInt(
          timeCurrent.substring(length + 1, timeCurrent.length)
        )
        if (type === TIME_TYPE.MONTH) {
          txt =
            "Every " +
            nextTime +
            " in the range time of " +
            this.arrayMonth[fromTime] +
            " to " +
            this.arrayMonth[toTime]
        } else if (type === TIME_TYPE.WEEKDAY) {
          txt =
            "Every day-of-week from " +
            this.daysInWeek[fromTime] +
            " through " +
            this.daysInWeek[toTime]
        }
      } else if (timeCurrent.includes(",")) {
        // case ","
        const toTime = timeCurrent.split(",") // [1, 5 ,3 , 7]
        let prepositions = "At the "
        let convertData = ""
        if ((type = TIME_TYPE.MONTH)) {
          prepositions = "On the "
          convertData = toTime.map(x => this.arrayMonth[x])
        }
        if ((type = TIME_TYPE.WEEKDAY)) {
          prepositions = "On the "
          convertData = toTime.map(x => this.daysInWeek[x])
        }
        txt = prepositions + convertData + " of the " + nextTime
      }
      return txt
    },

    submitForm() {
      console.log(11, this.dataCronJob)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-card__subtitle {
  margin-top: 0;
  padding-top: 0;
}
</style>
