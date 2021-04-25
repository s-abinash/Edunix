<template>
<div>
  <AppBar></AppBar>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="mx-auto mt-5 px-15" height="600" width="1200" flat>
          <v-card-title class="text-h1">Learn<br> without<br> Limits</v-card-title>
          <v-card-subtitle class="text-h6">Build skills with courses, certificates, and degrees online <br> from world-class universities and companies.</v-card-subtitle>
          <v-btn large color="#e7364d" dark @click="$router.push({name:'Login'})">Join Free</v-btn>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-img class="mr-10" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6JVJEaAT8FWwiBfVl1vECY/eccd28d76369194c1bae181bdef80140/hero-b.png?auto=format%2Ccompress&dpr=2&w=459&h=497&q=40"></v-img>
      </v-col>
    </v-row>

    <div class="text-h4 text--center mb-8 ml-15">Courses Available</div>
    <v-row dense justify="center">
      <v-col v-for="(card,index) in courses.slice((page-1)*2,page*2)" :key="card.title" :cols="card.flex" class="mr-2 ml-2">
        <v-card class="mx-auto" >
          <v-img @click="goto(card.id,card.name)" style="cursor: pointer" src="https://source.unsplash.com/300x300/?computer" height="200" v-if="index%2==0"></v-img>
          <v-img @click="goto(card.id, card.name)" style="cursor: pointer" src="https://source.unsplash.com/300x300/?technology" height="200" v-else></v-img>
          <v-card-text @click="goto(card.id, card.name)" style="cursor: pointer">
            <div>{{card.category}}</div>
            <p class="display-1 text--primary">
              {{card.name}}
            </p>
            <p>{{card.author}}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="teal accent-4" @click="card.reveal = true">
              Learn More
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <v-card v-if="card.reveal" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
              <v-card-text class="pb-0">
                <p class="display-1 text--primary">
                  Description
                </p>
                <p>{{card.description}}</p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn text color="teal accent-4" @click="card.reveal = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center mt-4"><v-pagination v-model="page" :length="pageLength" circle color="black"></v-pagination></div>
    <br>
    <v-row justify="center" class="px-10">
      <v-col cols="4">
        <v-img class="ml-10 mt-5" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/front-page-rebrand/secondary-consumer-cta/Image-Next-Step.png?auto=format%2Ccompress&dpr=2&w=471&h=330&q=40"></v-img>
      </v-col>
      <v-col cols="8">
        <v-card class="ml-15 mt-5 px-15" height="600" width="1200" flat>
          <v-card-title class="text-h3">Take the next step<br> toward your personal<br> and professional goals<br> with Edunix.</v-card-title>
          <v-card-subtitle class="text-h6">Join now to receive personalized recommendations<br> from the full Edunix catalog.</v-card-subtitle>
          <v-btn large color="#e7364d" dark @click="$router.push({name:'Login'})">Join Free</v-btn>
        </v-card>
      </v-col>

    </v-row>
  </v-container>

  <Footer/>
</div>
</template>

<script>
import AppBar from "../components/Home/AppBar";
import Footer from "../components/Home/Footer";
import axios from "axios";
export default {
  name: "Home",
  // eslint-disable-next-line vue/no-unused-components
  components: {Footer, AppBar},
  mounted() {
    let ref=this;
    axios.post('course/getCourse')
        .then(function (response) {
          console.log(response.data.data)
          response.data.data.forEach((e) => {
            ref.courses.push({
              id: e.id,
              name: e.name,
              description: e.description,
              author: e.author,
              category: e.category,
              reveal:false,
              flex:5
            });
          });
        }).catch(function (error) {
      console.log(error);
    }).finally(() => this.loading = false);
  },
  data:function () {
    return {
      courses:[],
      reveal: false,
      page:1,
    }
  },
  computed:{
    pageLength(){
      return Math.ceil(this.courses.length/2);
    }
  },
  methods:{
    goto(id,name){
      console.log(id)
      this.$router.push({name:'Learn', params:{courseid:id,coursename:name}})
    }
  }

}
</script>

<style scoped>

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

</style>