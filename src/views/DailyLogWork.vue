<template>
  <v-container>
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
            :min="startDate"
            no-title
            @input="selectEndDate()"
          ></v-date-picker>
        </v-menu>
        <p>
          End Date: <strong>{{ endDate }}</strong>
        </p>
      </v-col>
      <v-col cols="12" lg="2">
        <!-- https://vuetifyjs.com/en/components/selects/ -->
        <!-- // required -->
        <v-select
          v-model="selectProj"
          outlined
          :items="items"
          item-text="name"
          item-value="id"
          label="Select Project Jira"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
      <v-col cols="12" lg="4">
        <v-text-field
          v-model="txtSearch"
          name="Search"
          :label="$t('search')"
          hide-details
          @input="search()"
        >
          <template v-slot:append-outer>
            <v-btn class="mt-n2" elevation="1" fab small @click="search()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <!-- <v-text-field @click:append-outer="sendMessage"> </v-text-field> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import debounce from "lodash/debounce"
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
      selectProj: { id: "1", name: "Superfanz" },
      items: [
        { id: "1", name: "Superfanz" },
        { id: "2", name: "CY" },
        { id: "3", name: "Wanna Train" },
      ],
      txtSearch: "",
    }
  },

  watch: {
    startDate(val) {
      this.menu1 = false
      this.startDateFormatted = this.formatDate(this.startDate)
      this.search()
    },
    endDate(val) {
      this.menu2 = false
      this.endDateFormatted = this.formatDate(this.endDate)
      this.search()
    },
    selectProj(val) {
      console.log(val.id)
      this.search()
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
    search: debounce(function() {
      console.log("start date", this.startDate)
      console.log("end date", this.endDate)
      console.log("value selected", this.selectProj.id)
      console.log("text search", this.txtSearch)
    }, 1000),
  },
}
</script>

<style></style>
