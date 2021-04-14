<template>
<div>
    <v-card class="overflow-hidden">
      <AppBar></AppBar>
    </v-card>
    <Carousal class="mt-4"></Carousal>
    <br>
    <div class="px-10">
    <v-row>
      <v-col justify="left">
        <h2>Recommended Movies</h2>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row dense justify="center">
        <v-col v-for="card in movies.slice((page-1)*5,page*5)" :key="card.title" :cols="card.flex">
          <v-card>
            <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
            </v-img>
            <v-card-title v-text="card.title"></v-card-title>
            <v-card-subtitle>{{ card.genre }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center mt-4"><v-pagination v-model="page" :length="movies.length/5" circle color="black"></v-pagination></div>
      <br>
      <div class="text-center justify-center"><v-btn text color="#F84464" to="/explore">See All</v-btn></div>
    </v-container>
    </div>
  <Footer/>
</div>
</template>

<script>
import AppBar from "../components/Home/AppBar";
import Carousal from "../components/Home/Carousal";
import Footer from "../components/Home/Footer";
export default {
  name: "Home",
  // eslint-disable-next-line vue/no-unused-components
  components: {Footer, Carousal, AppBar},
  data: () => ({
    page:1,
    movies: [
      { id: 1, title: 'Karnan', genre:'Drama', language:'Tamil', src: require('@/assets/images/movies/et00305671-vujhyphnak-portrait.jpg'), flex: 2 },
      { id: 2,title: 'Tenet', genre:'Thriller', language:'English', src: require('@/assets/images/movies/et00121315-vkvlvxwebx-portrait.jpg'), flex: 2 },
      { id: 3,title: 'Judas', genre:'Action', language:'Hindi', src: require('@/assets/images/movies/et00136763-pjgddezauj-portrait.jpg'), flex: 2 },
      { id: 4,title: 'Sulthan', genre:'Drama', language:'Tamil', src: require('@/assets/images/movies/et00305740-vhggnckzhm-portrait.jpg'), flex: 2 },
      { id: 5,title: '99 Songs', genre:'Romantic', language:'Tamil', src: require('@/assets/images/movies/et00039742-xuerldyrkh-portrait.jpg'), flex: 2 },
      { id: 6,title: 'Zilla Vs. Kong', genre:'Action', language:'English', src: require('@/assets/images/movies/et00122511-ptkrtmjxau-portrait.jpg'), flex: 2 },
      { id: 7,title: 'Vakeel Saab', genre:'Thriller', language:'Kannada', src: require('@/assets/images/movies/et00128390-wkstrfzkrj-portrait.jpg'), flex: 2 },
      { id: 8,title: 'Chasing', genre:'Crime', language:'Tamil', src: require('@/assets/images/movies/et00136763-pjgddezauj-portrait.jpg'), flex: 2 },
      { id: 9,title: 'Kho Kho', genre:'Sports', language:'Hindi', src: require('@/assets/images/movies/et00310263-qbyplmdgwp-portrait.jpg'), flex: 2 },
      { id: 10,title: 'Dheyyam', genre:'Romantic', language:'Telugu', src: require('@/assets/images/movies/et00022058-ssstluhrrv-portrait.jpg'), flex: 2 },
      { id: 11,title: 'Tom & Jerry', genre:'Action', language:'Tamil', src: require('@/assets/images/movies/et00300988-xbwbbjfjzw-portrait.jpg'), flex: 2 },
      { id: 12,title: 'Voyagers', genre:'Thriller',language:'English', src: require('@/assets/images/movies/et00137315-tzhnpqttny-portrait.jpg'), flex: 2 },
      { id: 13,title: 'Wild Dog', genre:'Thriller',language:'Telugu', src: require('@/assets/images/movies/et00307497-xedyfcgxjg-portrait.jpg'), flex: 2 },
      { id: 14,title: 'Minari', genre:'Drama',language:'English', src: require('@/assets/images/movies/et00307815-heuugkljjy-portrait.jpg'), flex: 2 },
      { id: 15,title: 'Roohi', genre:'Horror',language:'Hindi', src: require('@/assets/images/movies/et00099813-vcgnqdezlw-portrait.jpg'), flex: 2 }
    ],
  }),
}
</script>

<style scoped>

</style>