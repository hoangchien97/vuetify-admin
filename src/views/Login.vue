<template>
  <div id="app">
    <v-app id="inspire">
      <v-content class="wraper-login">
        <div class="overlay">
          <v-container class="container-login" fluid>
            <v-row justify="center" align="center">
              <v-col cols="12" md="6" lg="4">
                <div class="md-layout-item">
                  <h3 class="display-3">Welcome to Savvycom</h3>
                  <span class="subheading"
                    >System to manage Check-in/Check-out, requests for
                    vacations, job notes, announcements, reports, employees,
                    projects of savvycom.</span
                  >
                  <v-divider class="my-3"></v-divider>
                  <div class="title mb-3">Savvycom time tracker</div>
                </div>
              </v-col>
              <v-col cols="12" md="6" lg="4" class="form-login">
                <div
                  class="display-2 font-weight-light mb-5 text-center text-uppercase"
                >
                  login here
                </div>
                <v-form>
                  <v-text-field
                    outlined
                    label="Email"
                    name="username"
                    append-icon="mdi-account"
                    class="text-email"
                    v-model="formData.email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="formData.password"
                    label="Password"
                    name="password"
                    append-icon="mdi-lock"
                    class="text-green"
                    style="color: red"
                    type="password"
                    :rules="[rules.required, rules.min]"
                  ></v-text-field>
                </v-form>
                <v-spacer></v-spacer>
                <v-btn color="success" class="float-right" @click="login"
                  >Login</v-btn
                >
                <div style="clear: both">
                  <p class="display-2 pt-1 text-center">OR</p>
                </div>
                <div class="group pa-2">
                  <v-btn class="ma-2" color="#F24444" dark large fab>
                    <v-icon>mdi-google</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="#55acee" dark large fab>
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>

                  <v-btn class="ma-2" color="#3b5998" dark large fab>
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import api from "@/services/api.service"

export default {
  name: "Login",
  data: function() {
    return {
      formData: {
        email: "",
        password: "",
      },
      rules: {
        required: value => !!value || "Field is required.",
        min: v => v.length >= 6 || "Min 6 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || "Invalid e-mail."
        },
      },
    }
  },

  methods: {
    async login() {
      try {
        const res = await api.doLogin({ ...this.formData })
        console.log(111, res)

        this.$router.push("/")
      } catch (error) {
        console.log("error", error)
      }
    },
  },
}
</script>

<style lang="scss">
.wraper-login {
  background-image: url("~@/assets/b2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: relative;
  .container-login {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    color: #fff;
    .form-login {
      margin: 0 auto;
      background: rgba(0, 0, 0, 0.5);
      padding: 30px;
      color: #fff;
      .theme--light.v-label,
      .theme--light.v-input input {
        color: #fff !important;
      }
      .v-icon {
        color: #fff;
      }
      .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
        background-color: #fff;
        margin-right: 0px !important;
        margin-bottom: 0px !important;
      }
    }
  }
  fieldset {
    border: 1px solid #fff;
  }
  .group {
    display: flex;
    flex: 1;
    justify-content: center;
  }
}
</style>
