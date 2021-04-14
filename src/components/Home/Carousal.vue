<template>
  <v-carousel hide-delimiter-background cycle height="300" interval="10000" continuous>
    <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="scroll-x-reverse-transition"
        transition="scroll-x-reverse-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carousal",
  data () {
    return {
      items: [
        {
          src: require('@/assets/images/carousal/aiforindia-10-12-04-2021-11-23-34-713.jpg'),
        },
        {
          src: require('@/assets/images/carousal/belly-dance-beginner-class-13-04-2021-08-30-55-442.jpg'),
        },
        {
          src: require('@/assets/images/carousal/maassab-05-02-2021-06-46-48-932.jpg'),
        },
        {
          src: require('@/assets/images/carousal/sadhguru-live-with-chetan-bhagat--get-a-free-book-07-04-2021-04-24-11-530.jpg'),
        },
        {
          src: require('@/assets/images/carousal/war-31-03-2021-07-24-05-456.jpg'),
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>