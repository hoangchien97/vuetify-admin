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
              @input="selectStartDate()"
            ></v-date-picker>
          </v-menu>
          <p>
            <!-- Start Date: <strong>{{ formData.startDate }}</strong> -->
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
                :ref="'end-day-log-work'"
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
              @input="selectEndDate()"
            ></v-date-picker>
          </v-menu>
          <p>
            <!-- End Date: <strong>{{ formData.endDate }}</strong> -->
          </p>
        </v-col>

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
                v-model="startDateSync"
                label="Start Sync Date"
                append-icon="mdi-calendar"
                outlined
                readonly
                @blur="formData.startDateCreated = parseDate(startDateSync)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.startDateCreated"
              @input="selectStartSyncDate()"
            ></v-date-picker>
          </v-menu>
          <p>
            <!-- Start Sync Date: <strong>{{ formData.startDateCreated }}</strong> -->
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
                v-model="endDateSync"
                label="End Sync Date"
                append-icon="mdi-calendar"
                outlined
                readonly
                @blur="formData.endDateCreated = parseDate(endDateSync)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.endDateCreated"
              @input="selectEndSyncDate()"
            ></v-date-picker>
          </v-menu>
          <p>
            <!-- End Sync Date: <strong>{{ formData.endDateCreated }}</strong> -->
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
            clearable
          ></v-select>
          <!-- @input="search()" -->
        </v-col>
        <v-col cols="12" lg="2">
          <v-text-field
            v-model="txtSearch"
            name="Search"
            :label="$t('search')"
            hide-details
            append-icon="mid-search"
          >
            <template v-slot:append-outer>
              <v-btn class="mt-n2" elevation="1" fab small @click="search()">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <template v-if="listLogSync">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="filteredItems"
              :search="txtSearch"
              no-results-text="No results"
              no-data-text="No results"
              sort-by="id"
              class="elevation-1"
            >
              <!-- <template v-slot:item.stt="">
                {{ ++stt }}
              </template> -->
              <template v-slot:item.date="{ item }">
                {{ convertDate(item.date) }}
              </template>
              <template v-slot:item.createdAt="{ item }">
                {{ convertDate(item.createdAt) }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <div class="text-center">
          No data to show
        </div>
      </template>
    </base-material-card>
  </v-container>
</template>

<script>
import debounce from "lodash/debounce"
import moment from "moment"
export default {
  name: "DailyLogWork",
  data() {
    return {
      formData: {
        // startDate: "2020-03-20" - ngay lam viec // working-day
        // endDate : get data tu ngay lam viec den hom nay
        // startDateCreated: "2020-03-28" - ngay sync
        // endDateCreated: ngay ket thuc sync
        startDate: moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        startDateCreated: "",
        endDateCreated: "",
        jira_project: null,
      },
      txtSearch: "",
      dayNow: moment().format("YYYY-MM-DD"),
      startDateFormatted: this.formatDate(
        moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD")
      ),
      endDateFormatted: moment().format("DD/MM/YYYY"),
      startDateSync: "",
      endDateSync: "",
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      stt: 0,
      headers: [
        { text: "Work Date", value: "date" },
        { text: "Sync Date", value: "createdAt" },
        { text: "Username Jira", value: "jira_username" },
        { text: "Project Jira", value: "jira_project" },
        {
          text: "Username Timesheet",
          sortable: true,
          align: "start",
          filterable: true,
          value: "svc_userid",
        },
        { text: "Project Timesheet", value: "svc_project" },
        { text: "Working Time", value: "workingtime" },
        { text: "Status", value: "description" },
      ],
    }
  },

  computed: {
    computedStartDateFormatted() {
      return this.formatDate(this.formData.startDate)
    },
    computedEndDateFormatted() {
      return this.formatDate(this.formData.endDate)
    },
    startSyncDate() {
      return this.formatDate(this.formData.startDateCreated)
    },
    endSyncDate() {
      return this.formatDate(this.formData.endDateCreated)
    },
    listProjectJira() {
      return this.$store.state.listProjectJira
    },
    listLogSync() {
      return this.$store.state.listLogSync
    },
    filteredItems() {
      return this.listLogSync.filter(i => {
        return (
          !this.formData.jira_project ||
          i.jira_project === this.formData.jira_project
        )
      })
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
      this.startDateSync = this.formatDate(this.formData.startDateCreated)
    },
    "formData.endDateCreated"(val) {
      this.endDateSync = this.formatDate(this.formData.endDateCreated)
    },
    "formData.jira_project": {
      handler(val) {
        console.log(val)
      },
      deep: true,
    },
  },

  async created() {
    await this.getProjectJira()
    await this.getLogSync()
  },

  methods: {
    convertDate(date) {
      return moment(date).format("DD-MM-YYYY")
    },

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
    async getLogSync() {
      await this.$store.dispatch("getLogSync", { ...this.formData })
    },

    selectStartDate() {
      this.menu1 = false
      this.focusInput("end-day-log-work")
      this.startDateFormatted = this.formatDate(this.formData.startDate)
      this.getLogSync({ ...this.formData })
    },

    selectEndDate() {
      this.menu2 = false
      this.endDateFormatted = this.formatDate(this.formData.endDate)
      this.getLogSync({ ...this.formData })
    },

    selectStartSyncDate() {
      this.menu3 = false
      this.endDateFormatted = this.formatDate(this.formData.endDate)
      if (this.formData.endDateCreated) {
        this.getLogSync({ ...this.formData })
      }
    },

    selectEndSyncDate() {
      this.menu4 = false
      this.endDateFormatted = this.formatDate(this.formData.endDate)
      if (this.formData.startDateCreated) {
        this.getLogSync({ ...this.formData })
      }
    },

    focusInput(nameRef) {
      this.$nextTick(() => {
        console.log(11)
        this.$refs[nameRef].focus()
      })
    },
    search: debounce(async function() {
      console.log({ ...this.formData })
      await this.getLogSync()
    }, 1000),
  },
}
</script>

<style lang="scss"></style>
