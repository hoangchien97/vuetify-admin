<template>
  <v-container>
    <base-v-component
      heading="Setting Cronjob"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Setting Cronjob"
      class="px-5 py-3"
    >
      <v-row justify="center">
        <v-col cols="12" lg="6">
          <div class="headline text-left">Add new cron job</div>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  name: "SettingCronJob",
  data() {
    return {}
  },
}
</script>

<style></style>
