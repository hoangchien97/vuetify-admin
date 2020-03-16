<template>
  <v-container id="grid" fluid tag="section">
    <base-v-component heading="Vee Validate" link="components/vee-validate" />
    <validation-observer ref="observer" v-slot="{}">
      <form>
        <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:10"
        >
          <v-text-field
            v-model="name"
            :counter="10"
            :error-messages="errors"
            label="Name"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model="email"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="select" rules="required">
          <v-select
            v-model="select"
            :items="items"
            :error-messages="errors"
            label="Select"
            data-vv-name="select"
            required
          ></v-select>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          rules="required"
          name="checkbox"
        >
          <v-checkbox
            v-model="checkbox"
            :error-messages="errors"
            value="1"
            label="Option"
            type="checkbox"
            required
          ></v-checkbox>
        </validation-provider>

        <v-btn class="mr-4" @click="submit()">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </validation-observer>
  </v-container>
</template>

<script>
import { extend } from "vee-validate"

extend("required", {
  message: "{_field_} can not be empty",
})

extend("max", {
  message: "{_field_} may not be greater than {length} characters",
})

extend("email", {
  message: "Email must be valid",
})

export default {
  name: "VeeValidate",
  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate().then(valid => {
        if (!valid) {
          // false
          console.log(11, valid)
        } else {
          // true
          console.log(22, valid)
        }
      })
    },
    clear() {
      this.name = ""
      this.email = ""
      this.select = null
      this.checkbox = null
      this.$refs.observer.reset()
    },
  },
}
</script>

<style></style>
