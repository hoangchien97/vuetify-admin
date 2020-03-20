/* eslint-disable vue/no-unused-vars */
<template>
  <v-container>
    <base-v-component heading="Log Sync" link="components/simple-tables" />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Log Sync"
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
                :length="pages"
                :search="search"
                sort-by="username"
                :pagination.sync="pagination"
                :total-items="totalItemCount"
                class="elevation-1"
              >
                <template v-slot:item="{ item }">
                  <tr v-for="(i, i_index) in item" :key="i_index">
                    <template v-if="i_index === `error`">
                      <td v-for="(header, h_index) in headers" :key="h_index">
                        {{ item[i_index][header.value] || item[header.value] }}
                      </td>
                    </template>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </base-material-card>
  </v-container>
</template>

<script>
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
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "username",
        },
        { text: "Project Name", value: "project_id" },
        { text: "Time Spent", value: "timeSpent" },
        { text: "Reason", value: "reason" },
        { text: "Ticket", value: "description" },
        { text: "Date", value: "dateCreated" },
      ],
      search: "",
      // totalItems: 0,
      items: [],
      pagination: {
        sortBy: "Date",
      },
      invalid: [
        {
          error: {
            username: "nhung.vu",
            project_id: "WannaTrain",
            started: "2020-02-20",
            timeSpent: 8,
            description: "WT2-76: Teambase - Test sprint 1",
            dateCreated: "2020-02-20 11:35:30.000",
          },
          reason: "USER NOT FOUND",
        },
        {
          error: {
            username: "hoang.chien",
            project_id: "SuperFanz",
            started: "2020-02-20",
            timeSpent: 8,
            description: "SPZ-14: UI - Login",
            dateCreated: "2020-02-20 11:35:30.000",
          },
          reason: "USER NOT LOGWORK",
        },
        {
          error: {
            username: "hoang.chien",
            project_id: "SuperFanz",
            started: "2022-02-20",
            timeSpent: 8,
            description: "SPZ-14: UI - Following/Follower",
            dateCreated: "2020-02-20 11:35:30.000",
          },
          reason: "USER NOT EXIST",
        },
      ],
    }
  },
  computed: {
    listLogSyncJira() {
      return this.$store.state.listLogSyncJira
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
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split("-")
      return `${month}/${day}/${year}`
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
