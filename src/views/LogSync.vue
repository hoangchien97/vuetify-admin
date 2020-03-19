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
      <v-row>
        <v-col cols="12">
          <!-- https://vuetifyjs.com/vi-VN/components/data-tables/ -->
          <v-simple-table>
            <thead>
              <tr>
                <th class="primary--text">STT</th>
                <th class="primary--text">
                  Username
                </th>
                <th class="primary--text">
                  Project Name
                </th>
                <th class="primary--text">
                  Time Spent
                </th>
                <th class="primary--text">
                  Reason
                </th>
                <th class="primary--text">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in listLogSyncJira.invalid">
                <tr :key="index">
                  <td>{{ index }}</td>
                  <td>{{ item.error.username }}</td>
                  <td>{{ item.error.project_id }}</td>
                  <td>{{ item.error.timeSpent }}</td>
                  <td>{{ item.reason }}</td>
                  <td>{{ item.error.dateCreated }}</td>
                </tr>
              </template>
            </tbody></v-simple-table
          >
        </v-col>
      </v-row>
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
        { text: "Date", value: "dateCreated" },
      ],
      desserts: [
        {
          username: "Frozen Yogurt",
          project_id: 159,
          timeSpent: 6.0,
          reason: 24,
          dateCreated: 4.0,
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
