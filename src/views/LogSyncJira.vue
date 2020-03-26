/* eslint-disable vue/no-unused-vars */
<template>
  <v-container>
    <base-v-component heading="Log Sync" link="components/simple-tables" />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Log Sync Jira"
      class="px-5 py-3"
    >
      <v-row justify="center">
        <v-col cols="12" lg="2">
          <!-- https://vuetifyjs.com/en/components/date-pickers/#month-pickers-in-dialog-and-menu -->
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDateFormatted"
                outlined
                label="Start Date"
                persistent-hint
                append-icon="mdi-calendar"
                @blur="formData.startDate = parseDate(startDateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.startDate"
              :max="formData.endDate"
              no-title
              @input="selectStartDate()"
            ></v-date-picker>
          </v-menu>
          <!-- <p>
            Start Date: <strong>{{ formData.startDate }}</strong>
          </p> -->
        </v-col>

        <v-col cols="12" lg="2">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDateFormatted"
                outlined
                label="End Date"
                persistent-hint
                append-icon="mdi-calendar"
                @blur="formData.endDate = parseDate(endDateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.endDate"
              :min="formData.startDate"
              no-title
              @input="selectEndDate()"
            ></v-date-picker>
          </v-menu>
          <!-- <p>
            End Date: <strong>{{ formData.endDate }}</strong>
          </p> -->
        </v-col>
      </v-row>
      <template v-if="listLogSyncJira">
        <v-row>
          <v-col cols="12">
            <!-- https://vuetifyjs.com/vi-VN/components/data-tables/ -->
            <v-card>
              <v-card flat color="success" dark>
                <v-card-title>
                  <span>Reports</span>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
              </v-card>
              <v-data-table
                :headers="headers"
                :items="listLogSyncJira.invalid"
                :search="search"
                sort-by="username"
                class="elevation-1"
              >
                <template v-slot:item.dateCreated="{ item }">
                  {{ convertDate(item.dateCreated) }}
                </template>
                <template v-slot:item.started="{ item }">
                  {{ convertDate(item.started) }}
                </template>
                <!-- eslint-disable -->
                <template v-slot:item.description="{ item }">
                  <div v-html="replaceTicket(item.description)"></div>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <div>
          No data to show
        </div>
      </template>
    </base-material-card>
  </v-container>
</template>

<script>
import moment from "moment"
export default {
  name: "LogSync",
  data() {
    return {
      startDateFormatted: "",
      endDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      formData: {
        startDate: "",
        endDate: new Date().toISOString().substr(0, 10),
      },

      menu1: false,
      menu2: false,

      headers: [
        // { text: "STT", value: "stt" },
        { text: "Running Date", value: "started" },
        { text: "Logwork Date", value: "dateCreated" },
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "username",
        },
        { text: "Project Name", value: "project_name" },
        { text: "Time Spent", value: "timeSpent" },
        { text: "Ticket", value: "description" },
        { text: "Reason", value: "reason" },
      ],
      search: "",
    }
  },
  computed: {
    listLogSyncJira() {
      return this.$store.state.listLogSyncJira
    },
    computedStartDateFormatted() {
      return this.formatDate(this.formData.startDate)
    },
    computedEndDateFormatted() {
      return this.formatDate(this.formData.endDate)
    },
  },
  watch: {
    "formData.startDate"(val) {
      this.menu1 = false
      this.startDateFormatted = this.formatDate(this.formData.startDate)
    },
    "formData.endDate"(val) {
      this.menu2 = false
      this.endDateFormatted = this.formatDate(this.formData.endDate)
    },
  },
  methods: {
    replaceTicket(item) {
      const result = item.replace(/\\n/g, "<br />")
      return result
    },
    convertDate(date) {
      return moment(date).format("DD/MM/YYYY")
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split("-")
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split("/")
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    },
    selectStartDate() {
      this.menu1 = false
      this.startDateFormatted = this.formatDate(this.formData.startDate)
      this.getLogSyncJira()
    },
    selectEndDate() {
      this.menu2 = false
      this.endDateFormatted = this.formatDate(this.formData.endDate)
      this.getLogSyncJira()
    },

    async getLogSyncJira() {
      await this.$store.dispatch("getLogSyncJira", { ...this.formData })
    },
  },
}
</script>

<style></style>
