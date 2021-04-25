<template>
  <v-footer dark color="#333338">

      <v-img :src="require('@/assets/logo.png')" max-height="45" max-width="45"></v-img>
      <div class="text-h6 ml-3"> &#169; {{ new Date().getFullYear() }} - Edunix</div>
      <div class="ml-3" style="float: right"> Abinash S</div>
  </v-footer>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped>

</style>