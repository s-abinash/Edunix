<template>
  <v-footer padless dark color="#333338">
    <v-col class="text-center" cols="12">
      <v-img :src="require('@/assets/logo.png')" max-height="27" max-width="27"></v-img> Book my Show
    </v-col>
    <v-col class="text-center" cols="12">
      &#169; {{ new Date().getFullYear() }} — <strong>Abinash, KEC</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped>

</style>