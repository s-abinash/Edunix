<template>
  <v-container fill-height>
    <v-row class="justify-center align-center">
      <v-col cols="12">
      <v-card elevation="5" max-width="450" class="mx-auto mt-16">

        <v-card-title>Train Booking</v-card-title>
        <v-card-subtitle>IRCTC</v-card-subtitle>
        <v-card-text class="px-10 mt-3">
          <Details></Details>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Details from "../components/Details";
export default {
  components:{
    Details
  },
  name: "BookingForm",

}
</script>

<style scoped>

</style>