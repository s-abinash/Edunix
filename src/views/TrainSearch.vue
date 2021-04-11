<template>
  <v-parallax height="550" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
    <v-container fill-height>
      <v-row class="justify-center align-center">
        <v-col cols="12">
          <v-card elevation="5" max-width="600" class="mx-auto">

            <v-card-title>Book Ticket</v-card-title>
            <v-card-subtitle>IRCTC</v-card-subtitle>
            <v-card-text class="px-10 mt-3">
              <SearchIndex></SearchIndex>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
import SearchIndex from "../components/SearchIndex";
export default {
  name: "TrainSearch",
  components: {SearchIndex}
}
</script>

<style scoped>

</style>