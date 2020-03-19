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
                    >System Admin sync JIRA to Timesheet</span
                  >
                  <!-- <v-divider class="my-3"></v-divider> -->
                  <!-- <div class="title mb-3">Savvycom time tracker</div> -->
                </div>
              </v-col>
              <v-col cols="12" md="6" lg="4" class="form-login">
                <div
                  class="display-2 font-weight-light mb-5 text-center text-uppercase"
                >
                  Sign in here
                </div>
                <v-form ref="form">
                  <v-text-field
                    v-model="formData.email"
                    outlined
                    label="Email"
                    name="username"
                    append-icon="mdi-account"
                    class="text-email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.password"
                    outlined
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
                  >Sign in</v-btn
                >
                <div style="clear: both">
                  <p class="display-2 pt-1 text-center">
                    or sign in with social
                  </p>
                </div>
                <div class="group pa-2">
                  <v-btn class="ma-2" color="#F24444" dark default fab>
                    <v-icon>mdi-google</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="#55acee" dark default fab>
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>

                  <v-btn class="ma-2" color="#3b5998" dark default fab>
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <v-snackbar v-model="msg.show" :color="msg.color" top right dark>
          <v-icon color="white" class="mr-3">
            mdi-bell-plus
          </v-icon>
          <div>{{ msg.message }}</div>
          <v-icon size="16" @click="msg.show = false">
            mdi-close-circle
          </v-icon>
        </v-snackbar>
      </v-content>
    </v-app>
  </div>
</template>

<script>
// import api from "@/services/api.service"

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
      msg: {
        color: "success",
        show: false,
        message: "",
      },
    }
  },

  methods: {
    login() {
      try {
        // const res = await api.doLogin({ ...this.formData })
        if (
          this.formData.email === "admin@savvycomsoftware.com" &&
          this.formData.password === "123456"
        ) {
          this.$router.push("/")
        } else {
          this.msg.message = "Invalid email or password"
          this.msg.color = "red"
          this.msg.show = true
          this.btnLoadding = false
        }
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
  /* Change autocomplete styles in WebKit */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
  }
}
</style>
