<template>
  <v-container>
    <base-material-card
      icon="mdi-clipboard-text"
      title="List User Mapping"
      class="px-5 py-3"
    >
      <v-row justify="center">
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="listUserMap"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Update jira id</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-select
                              v-model="externalId"
                              :items="listUserConvert"
                              label="Jira Id"
                              dense
                              clearable
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
                      <v-btn color="blue darken-1" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.external_id="{ item }">
              <template v-if="item.mapped.length > 0">
                <template v-for="(map, index) in item.mapped">
                  <span :key="index"> {{ map.external_id }}</span>
                </template>
              </template>
              <template v-else>
                -
              </template>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editItem(item)">
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:no-data>
              <p>No result</p>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
import { DEFAULT_EXTERNAL } from "@/plugins/constants"
export default {
  name: "UserMap",
  data: () => ({
    dialog: false,
    listUserConvert: [],
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Jira Id", value: "external_id" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    userId: "",
    externalId: "",
  }),

  computed: {
    listUserMap() {
      return this.$store.state.listUserMap
    },
    listUserExternal() {
      return this.$store.state.listUserExternal
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  async created() {
    await this.getUserMap()
  },

  methods: {
    async editItem(item) {
      await this.getListUserExternal()
      await this.convertListExternal()
      this.userId = item ? item.id : ""
      this.externalId =
        item.mapped[0] !== undefined ? item.mapped[0].external_id : ""
      this.dialog = true
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedIndex = -1
      }, 300)
    },

    async save() {
      /* eslint-disable */
      const formData = new Object({
        user_id: this.userId,
        external_id: this.externalId,
      })
      await this.$store.dispatch("userMapping", { ...formData })
      await this.getUserMap()
      this.close()
    },
    async getUserMap() {
      await this.$store.dispatch("listUserMap")
    },
    async getListUserExternal() {
      await this.$store.dispatch("getListUserExternal")
    },

    convertListExternal() {
      this.listUserConvert = this.listUserExternal.map(item => {
        if (item.name.includes(DEFAULT_EXTERNAL.CHAR_USER_JIRA)) {
          const strJiraLength = DEFAULT_EXTERNAL.CHAR_USER_JIRA.length
          return item.name.substr(strJiraLength, item.name.length)
        }
      })
    },
  },
}
</script>

<style></style>
