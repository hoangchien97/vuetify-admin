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
          Daily Log
        </div>
      </template>
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
      <v-row>
        <v-col cols="12">
          <!-- https://vuetifyjs.com/vi-VN/components/data-tables/ -->
          <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on"
                      >New Item</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Dessert name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.calories"
                              label="Calories"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.fat"
                              label="Fat (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.carbs"
                              label="Carbs (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.protein"
                              label="Protein (g)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              No data to show
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </base-material-card>
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
      selectProj: null,
      items: [
        { id: "1", name: "Superfanz" },
        { id: "2", name: "CY" },
        { id: "3", name: "Wanna Train" },
      ],
      txtSearch: "",

      dialog: false,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item"
    },
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
    dialog(val) {
      val || this.close()
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

    // CRUD

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style></style>
