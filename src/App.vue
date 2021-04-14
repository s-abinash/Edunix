<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>


import AppBar from "./components/Home/AppBar";

export default {
  name: 'App',

  components: {
    // eslint-disable-next-line vue/no-unused-components
    components: {AppBar},
  },

  data: () => ({
    //
  }),
};
</script>
