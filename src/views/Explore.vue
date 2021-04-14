<template>
  <div>
    <v-card class="overflow-hidden">
      <AppBar></AppBar>
    </v-card>
    <Carousal class="mt-4"></Carousal>
    <br>
    <div class="px-10">
    <v-row justify="space-between">
      <v-col cols="4">
        <v-expansion-panels multiple>
          <v-expansion-panel>
            <v-expansion-panel-header><h3 style="color:#F84464">Language</h3></v-expansion-panel-header>
            <v-expansion-panel-content >
              <v-chip-group v-model="language" column multiple active-class="pink--text" @change="reRend">
                <v-chip v-for="i in languageItems" :key="i" :value="i">{{i}}</v-chip>
              </v-chip-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header ><h3 style="color:#F84464">Generes</h3></v-expansion-panel-header>
            <v-expansion-panel-content >
              <v-chip-group v-model="genre" column multiple active-class="pink--text" @change="reRend">
                <v-chip v-for="i in genreItems" :key="i" :value="i">{{i}}</v-chip>
              </v-chip-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header ><h3 style="color:#F84464">Reset</h3></v-expansion-panel-header>
            <v-expansion-panel-content >
              <v-btn text>Clear All</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="8">
<!--        <p>{{this.language}}</p>-->
<!--        <p>{{this.genre}}</p>-->
        <v-container fluid>
          <v-row dense justify="center">
            <v-col v-for="card in movies"  :key="card.id" :cols="card.flex+1" v-show="card.show">
              <v-card>
                <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                </v-img>
                <v-card-title v-text="card.title"></v-card-title>
                <v-card-subtitle>{{ card.genre }} - {{ card.language }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    </div>
  </div>
</template>

<script>
import Carousal from "../components/Home/Carousal";
import AppBar from "../components/Home/AppBar";
export default {
  name: "Explore",
  components: {Carousal,AppBar},
  data: () => ({
    language:'',
    genre:'',
    languageItems:['English', 'Tamil', 'Telugu', 'Kannada', 'Hindi'],
    genreItems:['Action', 'Drama', 'Thriller', 'Romantic', 'Sports', 'Crime', 'Horror'],
    movies: [
      { id: 1, title: 'Karnan', genre:'Drama', language:'Tamil', src: require('@/assets/images/movies/et00305671-vujhyphnak-portrait.jpg'), flex: 2, show: true},
      { id: 2,title: 'Tenet', genre:'Thriller', language:'English', src: require('@/assets/images/movies/et00121315-vkvlvxwebx-portrait.jpg'), flex: 2, show: true },
      { id: 3,title: 'Judas', genre:'Action', language:'Hindi', src: require('@/assets/images/movies/et00136763-pjgddezauj-portrait.jpg'), flex: 2, show: true },
      { id: 4,title: 'Sulthan', genre:'Drama', language:'Tamil', src: require('@/assets/images/movies/et00305740-vhggnckzhm-portrait.jpg'), flex: 2, show: true },
      { id: 5,title: '99 Songs', genre:'Romantic', language:'Tamil', src: require('@/assets/images/movies/et00039742-xuerldyrkh-portrait.jpg'), flex: 2, show: true },
      { id: 6,title: 'Zilla Vs. Kong', genre:'Action', language:'English', src: require('@/assets/images/movies/et00122511-ptkrtmjxau-portrait.jpg'), flex: 2, show: true },
      { id: 7,title: 'Vakeel Saab', genre:'Thriller', language:'Kannada', src: require('@/assets/images/movies/et00128390-wkstrfzkrj-portrait.jpg'), flex: 2, show: true },
      { id: 8,title: 'Chasing', genre:'Crime', language:'Tamil', src: require('@/assets/images/movies/et00136763-pjgddezauj-portrait.jpg'), flex: 2, show: true },
      { id: 9,title: 'Kho Kho', genre:'Sports', language:'Hindi', src: require('@/assets/images/movies/et00310263-qbyplmdgwp-portrait.jpg'), flex: 2, show: true },
      { id: 10,title: 'Dheyyam', genre:'Romantic', language:'Telugu', src: require('@/assets/images/movies/et00022058-ssstluhrrv-portrait.jpg'), flex: 2, show: true },
      { id: 11,title: 'Tom & Jerry', genre:'Action', language:'Tamil', src: require('@/assets/images/movies/et00300988-xbwbbjfjzw-portrait.jpg'), flex: 2, show: true },
      { id: 12,title: 'Voyagers', genre:'Thriller',language:'English', src: require('@/assets/images/movies/et00137315-tzhnpqttny-portrait.jpg'), flex: 2, show: true },
      { id: 13,title: 'Wild Dog', genre:'Thriller',language:'Telugu', src: require('@/assets/images/movies/et00307497-xedyfcgxjg-portrait.jpg'), flex: 2, show: true },
      { id: 14,title: 'Minari', genre:'Drama',language:'English', src: require('@/assets/images/movies/et00307815-heuugkljjy-portrait.jpg'), flex: 2, show: true },
      { id: 15,title: 'Roohi', genres:'Horror',language:'Hindi', src: require('@/assets/images/movies/et00099813-vcgnqdezlw-portrait.jpg'), flex: 2, show: true }
    ],
  }),
  methods: {
    reRend: function () {
        for(let id=0;id<this.movies.length;id++){
          if(this.language.length!==0 && this.genre.length!==0)
          {
            this.movies[id].show=this.language.includes(this.movies[id].language) && this.genre.includes(this.movies[id].genre)
          }
          else if(this.language.length!==0)
          {
              this.movies[id].show= this.language.includes(this.movies[id].language)
          }
          else if(this.genre.length!==0)
          {
            this.movies[id].show= this.genre.includes(this.movies[id].genre)
          }
          else
            this.movies[id].show= true;
        }
    },
  },

}
</script>

<style scoped>

</style>