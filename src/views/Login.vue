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

                <v-text-field prepend-icon="mdi-account" name="login" label="Login" type="text" :rules="[v => !!v || 'User ID is Required']"></v-text-field>
                <v-text-field id="password" prepend-icon="mdi-lock" name="password" label="Password" type="password" :rules="[v => !!v || 'Password is Required']"></v-text-field>

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
    </v-parallax>
  </v-content>
</template>

<script>
export default {
  name: "Login",
  data:function (){
    return {
      isFormValid: true
    }
  },
  methods:{
    submit(){
      console.log(this.isFormValid)
      this.$refs.form.validate()
      if(this.isFormValid)
        alert("Name: "+this.name+" Age: "+this.age);

    },
  }
}
</script>

<style scoped>

</style>