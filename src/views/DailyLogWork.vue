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
                v-model="startDate"
                label="Start Date"
                append-icon="mdi-calendar"
                outlined
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              @input="menu1 = false"
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
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                append-icon="mdi-calendar"
                outlined
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="menu2 = false"
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
            label="Project Jira"
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
      startDate: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      menu1: false,
      menu2: false,
      selectProj: null,
      items: [
        { id: "1", name: "Superfanz" },
        { id: "2", name: "CY" },
        { id: "3", name: "Wanna Train" },
      ],
      txtSearch: "",
    }
  },

  computed: {},

  watch: {},
}
</script>

<style></style>
