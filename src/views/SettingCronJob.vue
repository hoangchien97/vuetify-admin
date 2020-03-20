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
              <v-col class="py-0" cols="12" md="2" offset-md="2">
                <v-text-field
                  v-model="second"
                  label="0-59"
                  dense
                  outlined
                  solo
                  @change="inforTime('second')"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field v-model="txtInforTime" readonly>
                  {{ txtInforTime }}
                </v-text-field>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Minute:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="2" offset-md="2">
                <v-text-field
                  v-model="minute"
                  label="0-59"
                  dense
                  outlined
                  solo
                  @change="inforTime('minute')"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-text-field readonly>
                  {{ txtInforTime }}
                </v-text-field>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Hour:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="2" offset-md="2">
                <v-text-field
                  v-model="hour"
                  label="0-23"
                  dense
                  outlined
                  solo
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-select
                  v-model="hour"
                  item-text="name"
                  item-value="id"
                  label="Select Hour"
                  persistent-hint
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Day:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="2" offset-md="2">
                <v-text-field
                  v-model="day"
                  label="1-31"
                  dense
                  outlined
                  solo
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-select
                  v-model="day"
                  item-text="name"
                  item-value="id"
                  label="Select Day"
                  persistent-hint
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Month:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="2" offset-md="2">
                <v-text-field
                  v-model="month"
                  label="1-12"
                  dense
                  outlined
                  solo
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-select
                  v-model="month"
                  item-text="name"
                  item-value="id"
                  label="Select Month"
                  persistent-hint
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col class="pb-0" cols="12" offset-md="2">
                <div><strong>Weekday:</strong></div>
              </v-col>
              <v-col class="py-0" cols="12" md="2" offset-md="2">
                <v-text-field
                  v-model="weekday"
                  label="0-7"
                  dense
                  outlined
                  solo
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-select
                  v-model="weekday"
                  item-text="name"
                  item-value="id"
                  label="Select Weekday"
                  persistent-hint
                  dense
                  outlined
                ></v-select>
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
      weekday: "",
      txtInforTime: "",
    }
  },
  computed: {},
  methods: {
    inforTime(time) {
      switch (time) {
        case "second":
          if (this.second === "*") {
            this.txtInforTime = "Once Per Minute"
          } else if (this.second.includes("*/")) {
            const toTime = this.second.substring(this.second.length - 1)
            this.txtInforTime = "Once every " + toTime + " minutes"
          } else if (this.second.includes("-")) {
            const fromTime = this.second.substring(0, 1)
            const toTime = this.second.substring(this.second.length - 1)
            this.txtInforTime =
              "Every 1 minute in the range time of " +
              fromTime +
              " to " +
              toTime
          } else if (this.second.includes(",")) {
            const toTime = this.second.split(",").toString()
            this.txtInforTime = "At" + toTime + "minutes"
          }
          break

        default:
          break
      }
    },
  },
}
</script>

<style></style>
