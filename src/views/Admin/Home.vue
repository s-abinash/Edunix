<template>
<div>
  <AppBar/>
  <v-card>
    <v-toolbar light flat>
    <v-toolbar-title>Your Dashboard</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item><Sparkline></Sparkline></v-tab-item>
      <v-tab-item><Create></Create></v-tab-item>
      <v-tab-item><Comment></Comment></v-tab-item>
    </v-tabs-items>
  </v-card>
  <Footer/>
</div>
</template>

<script>

import AppBar from "@/components/Home/AppBar";
import Footer from "@/components/Home/Footer";
import Create from "@/components/Admin/Create";
import Comment from "@/components/Admin/Comment";
import Sparkline from "@/components/Admin/Sparkline";

export default {
  name: "Home",
  components:{
    Sparkline,
    Comment,
    Create,
    AppBar,
    Footer
  },
  data: ()=>({

        tab: null,
        items: [
          'Statistics', 'Courses', 'Comments',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
}
</script>

<style scoped>

</style>