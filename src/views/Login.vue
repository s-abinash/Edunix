<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500" min-width="380">
          <v-tabs v-model="tab" show-arrows background-color="#e7364d " icons-and-text dark grow>
            <v-tabs-slider color="#e7364d accent-4"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i.name">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-form ref="form1" v-model="isFormValid1" lazy-validation>
                <v-card class="elevation-12">
                  <v-card-text class="px-5">
                      <v-text-field v-model="login.userid" prepend-icon="mdi-account" name="login" label="Login" type="text" :rules="[v => !!v || 'User ID is Required']"></v-text-field>
                      <v-text-field v-model="login.pass" id="password" prepend-icon="mdi-lock" name="password" label="Password" type="password" :rules="[v => !!v || 'Password is Required']"></v-text-field>
                    <v-switch v-model="login.creator" inset label="Creator" class="ml-4"></v-switch>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="submit1"><v-icon >mdi-account-arrow-right-outline</v-icon>&nbsp;&nbsp;Login</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-tab-item>
            <v-tab-item>
              <v-form ref="form2" v-model="isFormValid2" lazy-validation>
                <v-card class="elevation-12 px-5" >
                  <v-card-text>
                    <v-text-field v-model="register.name" prepend-icon="mdi-account" name="Name" label="Name" type="text" :rules="[v => !!v || 'Name is Required']"></v-text-field>
                    <v-text-field v-model="register.phone" prepend-icon="mdi-phone" name="Phone" label="Phone" type="text" :rules="[v => !!v || 'Phone is Required', v=> !isNaN(v) || 'Phone must be a number']"></v-text-field>
                    <v-text-field v-model="register.email" prepend-icon="mdi-email" name="Email" label="Email" type="email" :rules="[v => !!v || 'Email is Required']"></v-text-field>
                    <v-text-field v-model="register.userid" prepend-icon="mdi-account-circle" name="User ID" label="User ID" type="text" counter="12" :rules="[v => !!v || 'User ID is Required']"></v-text-field>
                    <v-row justify="center">
                     <v-col cols="6">
                       <v-text-field v-model="register.pass" id="password" prepend-icon="mdi-form-textbox-lock" name="password" label="Password" type="password" :rules="[v => !!v || 'Password is Required']"></v-text-field>
                     </v-col>
                      <v-col cols="6">
                        <v-text-field  prepend-icon="mdi-form-textbox-password" name="repassword" label="Re-Type Password" type="password" :rules="[v => !!v || 'Password is Required', v=> (v===register.pass) || 'Re-Type pass must be same']"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="submit2"><v-icon >mdi-account-arrow-right-outline</v-icon>&nbsp;&nbsp;Register</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-tab-item>
          </v-tabs>
      <v-snackbar v-model="snackbar">
        {{ snacktext }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data:function (){
    return {
      login: {
        userid: '',
        pass:'',
        creator:false
      },
      register:{
        name:'',
        phone:'',
        email:'',
        userid: '',
        pass:'',
      },
      dialog: true,
      isFormValid1: true,
      isFormValid2: true,
      snacktext:'',
      snackbar:false,
      tab: 0,
      tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-plus"}
      ],
    }
  },
  methods:{
    submit1(){
      console.log(this.isFormValid1)
      this.$refs.form1.validate()
      let ref=this;
      if(this.isFormValid1)
      {
        axios.post('/auth/login', {
              userid: this.login.userid,
              pass: this.login.pass,
              creator: this.login.creator
            }).then(function (response) {
              if(response.data.auth)
              {
                ref.$store.commit("login/updateLogin",{id: response.data.id, userid: ref.login.userid, token: response.data.token, auth: response.data.auth, admin:ref.login.creator, name:response.data.name});
                if(ref.login.creator)
                  ref.$router.push({name:'Admin'});
                else
                  ref.$router.push({name:'Home'});
              }
              else
              {
                ref.snacktext=response.data.message
                ref.snackbar=true
              }
        });
      }

    },
    async submit2(){
      console.log(this.isFormValid2)
      this.$refs.form2.validate()
      let ref=this;
      if(this.isFormValid2)
      {
        await axios.post('/auth/signup', {
          name:this.register.name,
          phone:this.register.phone,
          email:this.register.email,
          userid: this.register.userid,
          pass:this.register.pass,
        }).then(function (response) {
            ref.snacktext=response.data.message
            ref.snackbar=true
        });
        await axios.post('/mail/sendMail', {
          name:this.register.name,
          to:this.register.email,
          // eslint-disable-next-line no-unused-vars
        }).then(function (response) {
          ref.tab=0;
        });
      }

    },
  }
}
</script>

<style scoped>

</style>