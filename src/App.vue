<template>
  <v-app>
        <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: ()=>({
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],
  }),


};
</script>
<style>
v-text-field {
  caret-color: red;
}
/* Refers the whole setup */
::-webkit-scrollbar
{
  width: 10px;
  background-color: #F5F5F5;
}

/* Refers tracking path */
::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}

/* Refers Draggable Bar */
::-webkit-scrollbar-thumb
{
  background-color: #555555;
  border: 2px solid #555555;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #434A54;
}
</style>
