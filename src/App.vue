<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
