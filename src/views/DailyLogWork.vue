<template>
  <v-container>
    <base-material-card color="success" class="px-5 py-3">
      <template v-slot:heading>
        <!-- <base-material-card
          icon="mdi-clipboard-text"
          title="Daily Log"
          class="px-5 py-3"
        > -->
        <div class="display-2 font-weight-light text-center">
          Daily Log Work
        </div>
      </template>
      <v-row justify="center">
        <v-col cols="12" lg="2">
          <v-menu
            v-model="menu3"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dayLogWork"
                label="Day Working Log"
                append-icon="mdi-calendar"
                outlined
                readonly
                @blur="formData.startDateCreated = parseDate(dayLogWork)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.startDateCreated"
              @input="menu3 = false"
            ></v-date-picker>
          </v-menu>
          <p>
            Day Working Log: <strong>{{ formData.startDateCreated }}</strong>
          </p>
        </v-col>

        <v-col cols="12" lg="2">
          <v-menu
            v-model="menu4"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDayLogWork"
                label="Day Working Log"
                append-icon="mdi-calendar"
                outlined
                readonly
                @blur="formData.endDateCreated = parseDate(endDayLogWork)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.endDateCreated"
              @input="menu4 = false"
            ></v-date-picker>
          </v-menu>
          <p>
            End day Working Log: <strong>{{ formData.endDateCreated }}</strong>
          </p>
        </v-col>

        <v-col cols="12" lg="2">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDateFormatted"
                label="Start Date"
                append-icon="mdi-calendar"
                outlined
                readonly
                @blur="formData.startDate = parseDate(startDateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.startDate"
              :max="formData.endDate"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
          <p>
            Start Date: <strong>{{ formData.startDate }}</strong>
          </p>
        </v-col>
        <v-col cols="12" lg="2">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDateFormatted"
                label="End Date"
                append-icon="mdi-calendar"
                outlined
                readonly
                @blur="formData.endDate = parseDate(endDateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.endDate"
              :min="formData.startDate"
              :max="dayNow"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <p>
            End Date: <strong>{{ formData.endDate }}</strong>
          </p>
        </v-col>
        <v-col cols="12" lg="2">
          <!-- https://vuetifyjs.com/en/components/selects/ -->
          <v-select
            v-model="formData.jira_project"
            outlined
            :items="listProjectJira"
            item-text="JIRA_ProjectKey"
            item-value="JIRA_ProjectID"
            label="Project Jira"
            persistent-hint
            single-line
          ></v-select>
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            v-model="formData.txtSearch"
            name="Search"
            :label="$t('search')"
            hide-details
            append-icon="mid-search"
            @input="search()"
          >
            <template v-slot:append-outer>
              <v-btn class="mt-n2" elevation="1" fab small @click="search()">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row> </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
// import debounce from "lodash/debounce"
import moment from "moment"
export default {
  name: "DailyLogWork",
  data() {
    return {
      formData: {
        // startDate: "2020-03-20" - ngay lam viec // working-day
        // startDateCreated: "2020-03-28" - ngay log work ( log muon ) // day-working-log
        // endDate : get data tu ngay lam viec den hom nay
        // endDateCreated: ngay log work tu ngay nao den ngay nao
        startDate: moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        startDateCreated: "",
        endDateCreated: "",
        txtSearch: "",
        jira_project: "",
      },
      dayNow: moment().format("YYYY-MM-DD"),
      startDateFormatted: this.formatDate(
        moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD")
      ),
      endDateFormatted: moment().format("DD/MM/YYYY"),
      dayLogWork: "",
      endDayLogWork: "",
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
    }
  },

  computed: {
    computedStartDateFormatted() {
      return this.formatDate(this.formData.startDate)
    },
    computedEndDateFormatted() {
      return this.formatDate(this.formData.endDate)
    },
    dayLogWorkFormatted() {
      return this.formatDate(this.formData.startDateCreated)
    },
    endDayLogWorkFormatted() {
      return this.formatDate(this.formData.endDateCreated)
    },
    listProjectJira() {
      return this.$store.state.listProjectJira
    },
    listLogSync() {
      return this.$store.state.listLogSync
    },
  },
  watch: {
    "formData.startDate"(val) {
      this.startDateFormatted = this.formatDate(this.formData.startDate)
    },
    "formData.endDate"(val) {
      this.endDateFormatted = this.formatDate(this.formData.endDate)
    },
    "formData.startDateCreated"(val) {
      this.dayLogWork = this.formatDate(this.formData.startDateCreated)
    },
    "formData.endDateCreated"(val) {
      this.endDayLogWork = this.formatDate(this.formData.endDateCreated)
    },
  },

  async created() {
    await this.getProjectJira()
    await this.getLogSync()
  },

  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split("-")
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [day, month, year] = date.split("/")
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    },
    async getProjectJira() {
      await this.$store.dispatch("getListProjectJira")
    },
    async getLogSync(data) {
      await this.$store.dispatch("getLogSync", data)
    },
  },
}
</script>

<style></style>
