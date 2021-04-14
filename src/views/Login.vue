<template>
  <v-content>
    <v-parallax height="550" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>

                <v-text-field v-model="userid" prepend-icon="mdi-account" name="login" label="Login" type="text" :rules="[v => !!v || 'User ID is Required']"></v-text-field>
                <v-text-field v-model="pass" id="password" prepend-icon="mdi-lock" name="password" label="Password" type="password" :rules="[v => !!v || 'Password is Required']"></v-text-field>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit"><v-icon >mdi-account-arrow-right-outline</v-icon>&nbsp;&nbsp;Login</v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
      <v-snackbar v-model="snackbar">
        {{ snacktext }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-parallax>
  </v-content>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data:function (){
    return {
      userid: '',
      pass:'',
      isFormValid: true,
      snacktext:'',
      snackbar:false,
    }
  },
  methods:{
    submit(){
      console.log(this.isFormValid)
      this.$refs.form.validate()
      let ref=this;
      if(this.isFormValid)
      {
        axios.post('/auth/login', {
              userid: this.userid,
              pass: this.pass
            }).then(function (response) {
              if(response.data.auth)
              {
                ref.$store.commit("login/updateLogin",{id: response.data.id, userid: ref.userid, token: response.data.token, auth: response.data.auth});
                ref.$router.push({name:'Booking'});
              }
              else
              {
                ref.snacktext=response.data.message
                ref.snackbar=true
              }
        });
      }

    },
  }
}
</script>

<style scoped>

</style>