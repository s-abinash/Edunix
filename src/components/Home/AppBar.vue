<template>
  <v-app-bar color="#333545" dark dense class="mb-3">
    <v-row class="mt-3">
      <v-col cols="1" class="mt-1">
        <v-img :src="require('@/assets/logo.png')" max-height="35" max-width="35" @click="$router.push({name:'Home'})" style="cursor: pointer"></v-img>
      </v-col>
      <v-col cols="2" class="mt-1">
        <v-app-bar-title class="text-h4" @click="$router.push({name:'Home'})" style="cursor: pointer">Edunix</v-app-bar-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
          <v-text-field rounded outlined color="#e7364d" filled dark solo-inverted append-icon="mdi-magnify" dense height="5"></v-text-field>
      </v-col>
      <v-col cols="2" class="mr-5">
        <v-btn icon @click="$router.push({name:'Login'})" v-if="!auth"><v-icon>mdi-account</v-icon>Login</v-btn>
        <v-btn v-else text dark @click="logout">{{$store.state.login.name}}<v-icon>mdi-logout</v-icon> </v-btn>
<!--        <v-btn v-else icon><v-icon>mdi-logout</v-icon></v-btn>-->
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>

export default {
  name: "AppBar",
  data: () => ({
    search:'',
  }),
  computed:{
    auth(){
      return this.$store.state.login.auth;
    },
    name(){
      return this.$store.state.login.name;
    }
  },
  methods:{
    logout(){
      this.$store.commit("login/resetStore");
      this.$router.push({name:'Home'})
    }
  }

}
</script>

<style scoped>

</style>