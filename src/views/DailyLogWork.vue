<template>
  <v-container>
    <v-row>
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
              @blur="startDate = parseDate(startDateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            no-title
            @input="selectStartDate"
          ></v-date-picker>
        </v-menu>
        <p>
          Start Date: <strong>{{ startDate }}</strong>
        </p>
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
              @blur="endDate = parseDate(endDateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            no-title
            @input="selectEndDate()"
          ></v-date-picker>
        </v-menu>
        <p>
          End Date: <strong>{{ endDate }}</strong>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DailyLogWork",
  data() {
    return {
      startDate: new Date().toISOString().substr(0, 10),
      startDateFormatted: this.formatDate(
        new Date().toISOString().substr(0, 10)
      ),
      endDate: "",
      endDateFormatted: "",
      menu1: false,
      menu2: false,
    }
  },

  watch: {
    startDate(val) {
      this.menu1 = false
      this.startDateFormatted = this.formatDate(this.startDate)
    },
    endDate(val) {
      this.menu2 = false
      this.endDateFormatted = this.formatDate(this.endDate)
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
      this.startDateFormatted = this.formatDate(this.startDate)
    },
    selectEndDate() {
      this.menu2 = false
      this.endDateFormatted = this.formatDate(this.endDate)
    },
  },
}
</script>

<style></style>
