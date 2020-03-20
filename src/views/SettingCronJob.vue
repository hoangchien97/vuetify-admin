<template>
  <v-container>
    <base-material-card
      icon="mdi-clipboard-text"
      title="Setting Cron Job"
      class="px-5 py-3"
    >
      <v-row justify="center">
        <v-col cols="12" lg="6" style="border: 1px solid #000">
          <div class="headline text-left">Add new cron job</div>
          <form ref="formCronJob">
            <v-row>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Second:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="second"
                  label="0-59"
                  placeholder="*"
                  dense
                  outlined
                  solo
                  @change="inforTime('second', second, 'Minute')"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtSecond" outlined dense readonly>
                </v-text-field>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Minute:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="minute"
                  label="0-59"
                  dense
                  outlined
                  solo
                  @change="inforTime('minute', minute, 'Hour')"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtMinute" outlined dense readonly>
                </v-text-field>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Hour:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="hour"
                  label="0-23"
                  dense
                  outlined
                  solo
                  @change="inforTime('hour', hour, 'Day')"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtHour" outlined dense readonly>
                </v-text-field>
              </v-col>

              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Day:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="day"
                  label="1-31"
                  dense
                  outlined
                  solo
                  @change="inforTime('day', day, 'Month')"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtDay" outlined dense readonly>
                </v-text-field>
              </v-col>

              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Month:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="month"
                  label="0-12 (or names, see below)"
                  dense
                  outlined
                  solo
                  @change="inforTime('month', month, 'Month')"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtMonth" outlined dense readonly>
                </v-text-field>
              </v-col>

              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Day Of Week:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="3" offset-md="2">
                <v-text-field
                  v-model="dayOfWeek"
                  label="0-7 (0 or 7 is Sun, or use names)"
                  dense
                  outlined
                  solo
                  @change="inforTime('dayOfWeek', dayOfWeek, 'Month')"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtDayOfWeek" outlined dense readonly>
                </v-text-field>
              </v-col>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  name: "SettingCronJob",
  data() {
    return {
      second: "",
      minute: "",
      hour: "",
      day: "",
      month: "",
      dayOfWeek: "",
      txtSecond: "",
      txtMinute: "",
      txtHour: "",
      txtDay: "",
      txtMonth: "",
      txtDayOfWeek: "",
    }
  },
  computed: {},
  methods: {
    inforTime(type, timeCurrent, nextTime) {
      switch (type) {
        case "second":
          this.txtSecond = this.convertInforText(type, timeCurrent, nextTime)
          break
        case "minute":
          this.txtMinute = this.convertInforText(type, timeCurrent, nextTime)
          break
        case "hour":
          this.txtHour = this.convertInforText(type, timeCurrent, nextTime)
          break
        case "day":
          this.txtDay = this.convertInforText(type, timeCurrent, nextTime)
          break
        case "month":
          this.txtMonth = this.convertInforText(type, timeCurrent, nextTime)
          break
        case "dayOfWeek":
          this.txtDayOfWeek = this.convertInforText(type, timeCurrent, nextTime)
          break
        default:
          break
      }
    },
    convertInforText(type, timeCurrent, nextTime) {
      let txt = ""
      if (timeCurrent === "*") {
        txt = "Once Per " + nextTime
      } else if (timeCurrent.includes("*/")) {
        const toTime = timeCurrent.substring(timeCurrent.length - 1)
        txt = "Once Every " + toTime + " " + nextTime
      } else if (timeCurrent.includes("-")) {
        const fromTime = timeCurrent.substring(0, 1)
        const toTime = timeCurrent.substring(timeCurrent.length - 1)
        txt =
          "Every 1 " +
          nextTime +
          " in the range time of " +
          fromTime +
          " to " +
          toTime
      } else if (timeCurrent.includes(",")) {
        const toTime = timeCurrent.split(",") // [1, 5 ,3 , 7]
        txt = "Every At " + toTime + " " + nextTime
      } else {
      }
      return txt
    },
  },
}
</script>

<style></style>
