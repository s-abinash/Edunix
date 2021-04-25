<template>
<div>
  <v-container fluid class="px-10">
  <v-row justify="space-around" class="mb-5">
    <v-col cols="4">
      <v-card>
        <v-card-title>Course</v-card-title>
        <v-card-text class="text-h2 purple--text">{{course}}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Videos</v-card-title>
        <v-card-text class="text-h2 green--text">{{video}}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="space-around" class="mb-5">
    <v-col cols="4">
      <v-card>
        <v-card-title>Users</v-card-title>
        <v-card-text class="text-h2 red--text">{{user}}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Comments</v-card-title>
        <v-card-text class="text-h2 blue--text">{{comment}}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Sparkline",
  data:function () {
    return {
      comments:[],
      comment:0,
      user:0,
      course:0,
      video:0
    }
  },
  mounted() {
    let ref=this
    axios.get('comment/getStatistics')
        .then(function (response) {
            ref.comment=response.data.comment;
            ref.user=response.data.user;
            ref.course=response.data.course;
            ref.video=response.data.video;
        }).catch(function (error) {
      console.log(error);
    }).finally(() => this.loading = false);
  }

}
</script>

<style scoped>

</style>