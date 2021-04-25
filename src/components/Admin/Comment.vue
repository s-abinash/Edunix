<template>
<div>
  <v-container fluid>
    <v-card class="px-5 ml-auto mr-auto mt-3" max-width="900">
      <v-card-title class="text-h3">Comments</v-card-title>
      <v-card-text>
        <v-list disabled>
            <v-list-item v-for="(item, i) in comments" :key="i">
              <v-list-item-content>
                <v-row>
                  <v-col cols="1">
                    {{i+1}}
                  </v-col>
                  <v-col cols="2">
                    Course: {{item.courseid}}
                  </v-col>
                  <v-col cols="2">
                   {{item.name}}
                  </v-col>
                  <v-col cols="4">
                    <i>"{{item.comment}}"</i>
                  </v-col>
                  <v-col cols="3">
                    <v-rating
                    readonly
                    :value="item.rating"
                    background-color="orange lighten-3"
                    color="orange"
                    small
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Comment",
  data:function () {
    return {
      comments:[],
    }
  },
  mounted() {
    let ref=this
    axios.post('comment/getComment')
        .then(function (response) {
          response.data.data.forEach((e) => {
            ref.comments.push({
              courseid: e.courseid,
              name:e.username,
              comment: e.comment,
              rating: e.rating
            });
          });
        }).catch(function (error) {
      console.log(error);
    }).finally(() => this.loading = false);
    }
}
</script>

<style scoped>

</style>