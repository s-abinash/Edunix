<template>
<div>
  <AppBar></AppBar>
  <v-container fluid>
    <v-card class="px-5 ml-auto mr-auto mt-3" max-width="1000">
      <v-card-title class="justify-start">
        <v-btn text color="primary" @click="$router.push({'name': 'Home'})"><v-icon>mdi-arrow-left</v-icon>Back</v-btn>
      </v-card-title>
      <v-card-title class="text-h3">{{ coursename }}</v-card-title>
      <v-card-subtitle>Course Content</v-card-subtitle>
      <v-card-text>
        <template>
          <v-row align="center">
            <v-item-group v-model="window" class="shrink mr-6" mandatory>
              <v-item v-for="i in contents" :key="i.id" v-slot="{ active, toggle }" class="mb-2">
                <div>
                  <v-btn :input-value="active" text @click="toggle" color="dark">
                    {{i.name}}
                  </v-btn>
                </div>
              </v-item>
            </v-item-group>
            <v-col>
              <v-window v-model="window" class="elevation-1" vertical>
                <v-window-item v-for="i in contents" :key="i.id">
                  <v-card flat rounded="3" class="px-3">
                    <v-card-text>
                      <v-row class="mb-4" align="center">
                        <strong class="title">{{i.name}}</strong>
                        <v-spacer></v-spacer>
                      </v-row>
                      <v-row class="mb-4" justify="center">
                        <video width="590" height="300" controls id="myVideo" >
                          <source :src="i.link" type="video/mp4">
                        </video>
                      </v-row>
                      <v-row>
                        <v-expansion-panels flat >
                        <v-expansion-panel>
                          <v-expansion-panel-header class="text-subtitle-1 blue-grey--text">
                            Description
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            {{i.description}}
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        </v-expansion-panels>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#e7364d" text v-if="window!=0" @click="previousSection">Previous Section</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#e7364d" dark v-if="window!=contents.length-1" @click="nextSection">Next Section</v-btn>
        <v-btn color="#e7364d" dark v-else @click="dialog=true">Rate</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" class="black--text" elevation="4" rounded="pill">
      <b class="white--text align-center"> {{ snacktext }} </b>
      <template v-slot:action="{ attrs }"><v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn></template>
    </v-snackbar>
  </v-container>
  <v-dialog v-model="dialog" max-width="590">
    <v-card flat height="450" align="center">
      <v-card-title></v-card-title>
      <v-card-text class="align-center">
        <v-row justify="center" >
          <p class="text-h5">Course Completed</p>
        </v-row>
        <v-row class="mt-4" justify="center">
          <v-icon color="green" size="100">mdi-check-decagram</v-icon>
        </v-row>
        <v-row justify="center" class="mb-4" v-show="!commentGiven">
          <v-rating v-model="rating" color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull" half-increments hover large></v-rating>
        </v-row>
        <v-row class="pl-6 pr-6" justify="center" v-show="!commentGiven">
          <v-text-field v-model="comment" dense rounded outlined color="purple" placeholder="Tell us what to improve" prepend-inner-icon="mdi-comment-edit-outline"></v-text-field>
        </v-row>
        <v-row class="mb-4 pl-6 pr-6" justify="center" v-show="!commentGiven">
          <v-btn rounded color="purple" dark :disabled="(comment==''||rating==0.0)" @click="giveComment">Submit</v-btn>
        </v-row>
        <v-row class="mb-4 pl-6 pr-6" justify="center" v-show="commentGiven">
          <p>Thanks for Giving your valuable feedback</p>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-overlay :value="loading">
    <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
  </v-overlay>
</div>
</template>

<script>
import AppBar from "@/components/Home/AppBar";
import axios from "axios";

export default {
  name: "course",
  components: {AppBar},
  props:['courseid','coursename'],
  data:function () {
    return {
      contents:[],
      window: 0,
      rating: 0.0,
      comment:'',
      snackbar:false,
      snacktext:'',
      commentGiven:false,
      dialog:false,
      loading:false
    }
  },
  methods:{
    nextSection(){
      this.window++;
    },
    previousSection(){
        this.window--;
    },
    showSnackbar(txt) {
      this.snacktext = txt;
      this.snackbar = true;
    },
    async giveComment(){
      let error=false;
      let ref=this;

      await axios.post('comment/giveComment', {
        userid:this.$store.state.login.id,
        courseid:this.courseid,
        comment:this.comment,
        rating:this.rating,
        name:this.$store.state.login.name
      }).then(function (response) {
        error = response.data.error;
        (!error) ? ref.showSnackbar("Inserted Successfully") : ref.showSnackbar("Course already exist. Please try again.");
        ref.commentGiven=true
        ref.dialog=false
      }).catch(function (error) {
            console.log(error);
      }).finally(() => this.loading = false);
    }
  },
  async mounted() {
    let ref = this;
    console.log("Course ID"+this.courseid)
    await axios.post('content/getContent', {courseid: this.courseid})
        .then(function (response) {
          console.log(response.data.data)
          response.data.data.forEach((e) => {
            ref.contents.push({
              id: e.id,
              name: e.name,
              description: e.description,
              link: e.link,
              currentFile: undefined,
              key: e.filekey
            });
          });
        }).catch(function (error) {
      console.log(error);
    }).finally(() => this.loading = false);
    await axios.post('comment/getComment', { courseid: this.courseid, userid: this.$store.state.login.id })
        .then(function (response) {

          ref.commentGiven = response.data.data.length > 0;
          console.log("Comment Given"+ref.commentGiven)
        }).catch(function (error) {
      console.log(error);
    }).finally(() => this.loading = false);
  }
  }
</script>

<style scoped>

</style>