<template>
  <v-container>
    <base-v-component heading="Log Sync" link="components/simple-tables" />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Log Sync Jira"
      class="px-5 py-3"
    >
      <v-app id="inspire">
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.device_id"
                            :items="items"
                            label="Device Id"
                            dense
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <!-- <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon> -->
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-app>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  name: "UserMap",
  data: () => ({
    dialog: false,
    items: [1, 2, 4, 10],
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Device Id", value: "device_id" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 1,
      name: "Chiến Hoàng",
      email: "chien.hoang@savvycomsoftware.com",
      device_id: 4,
    },
    defaultItem: {
      id: "",
      name: "",
      email: "",
      device_id: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item"
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          id: 1,
          name: "Chiến Hoàng",
          email: "chien.hoang@savvycomsoftware.com",
          device_id: 4,
        },
        {
          id: 2,
          name: "Nam Nguyen",
          email: "nam.nguyenphuong@savvycomsoftware.com",
          device_id: 3,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    // deleteItem(item) {
    //   const index = this.desserts.indexOf(item)
    //   confirm("Are you sure you want to delete this item?") &&
    //     this.desserts.splice(index, 1)
    // },

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
