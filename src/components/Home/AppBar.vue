<template>
  <v-app-bar color="#333545" dark dense>
    <v-row class="mt-4">
      <v-col cols="1">
        <v-img :src="require('@/assets/logo.png')" max-height="35" max-width="35" @click="$router.push({name:'Home'})" style="cursor: pointer"></v-img>
      </v-col>
      <v-col cols="2">
        <v-app-bar-title class="ml-3" @click="$router.push({name:'Home'})" style="cursor: pointer">Book My Show</v-app-bar-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-text-field v-model="search" solo light background-color="white" rounded single-line append-icon="mdi-magnify" dense placeholder="Search for movies"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select v-model="loc" filled dense flat single-line solo background-color="#333545" :items="['Chennai', 'Madurai', 'Coimbatore', 'Erode', 'Tirunelveli', 'Trichy']" prepend-inner-icon="mdi-google-maps"></v-select>
      </v-col>
      <v-col cols="1">
        <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({
    loc:'Chennai',
    search:''
  }),
}
</script>

<style scoped>

</style>