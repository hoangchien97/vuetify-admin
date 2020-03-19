<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light text-center">
              Change Password
            </div>
          </template>
          <v-form ref="formData" class="mt-4">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" lg="6" offset-lg="3">
                  <v-text-field
                    v-model="email"
                    dense
                    :rules="[rules.required, rules.email]"
                    label="Email Address"
                    class="purple-input"
                    prepend-icon="mdi-email"
                  />
                </v-col>
                <v-col cols="12" lg="6" offset-lg="3">
                  <v-text-field
                    v-model="pwdOld"
                    dense
                    label="Enter your old password"
                    type="password"
                    class="purple-input"
                    prepend-icon="mdi-lock"
                    :rules="[rules.pwdConfirm]"
                  />
                </v-col>
                <v-col cols="12" lg="6" offset-lg="3">
                  <v-text-field
                    v-model="pwdNew"
                    dense
                    label="Enter your new password"
                    type="password"
                    class="purple-input"
                    prepend-icon="mdi-lock-reset"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" lg="6" offset-lg="3">
                  <v-text-field
                    v-model="pwdConfirm"
                    dense
                    label="Confirm password"
                    type="password"
                    class="purple-input"
                    prepend-icon="mdi-lock-reset"
                    :rules="[rules.required, passwordConfirmationRule]"
                  />
                </v-col>

                <v-col cols="12" lg="3" offset-lg="3" class="text-left">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dense color="red" class="mr-0" @click="clear()">
                      <v-icon>mdi-cached</v-icon>
                      Reset
                    </v-btn>
                    <v-btn
                      dense
                      color="success"
                      class="mr-0"
                      @click="validate()"
                    >
                      <v-icon>mdi-content-save</v-icon>
                      Update
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  //
  data() {
    return {
      email: "",
      pwdOld: "",
      pwdNew: "",
      pwdConfirm: "",
      isLoading: false,
      rules: {
        required: value => !!value || "Field is required.",
        min: v => v.length >= 6 || "Min 6 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || "Invalid e-mail."
        },
        pwdRules: [v => !!v || "Password required"],
        pwdConfirm: [v => !!v || "Confirm password"],
      },
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () => this.pwdNew === this.pwdConfirm || "Password do must match"
    },
  },
  methods: {
    validate() {
      this.$refs.formData.validate()
      console.log(111, this.$refs.formData.validate())
    },
    clear() {
      this.name = ""
      this.email = ""
      this.select = null
      this.checkbox = null
      this.$refs.formData.reset()
    },
  },
}
</script>
