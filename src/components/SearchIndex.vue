<template>
  <div>
    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-row cols="12">
        <v-col cols="6">
          <v-autocomplete :items="stations"  clearable outlined filled solo :filter="customFilter" color="white" item-text="name" label="From"></v-autocomplete>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="6">
          <v-autocomplete :items="stations"  clearable outlined filled solo :filter="customFilter" color="white" item-text="name" label="To"></v-autocomplete>
        </v-col>
      </v-row>
      <v-row cols="12">
        <v-col cols="6">
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="date" label="Date" clearable outlined filled solo append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

    </v-form>
  </div>
</template>

<script>
export default {
  name: "SearchIndex",
  data:function (){
    return {
      name: '',
      age: '',
      type: '',
      isFormValid: true,
      stations: [
        { name: 'Madurai', abbr: 'MDU', id: 1 },
        { name: 'Chennai Egmore', abbr: 'MS', id: 2 },
        { name: 'Chennai Central', abbr: 'MAS', id: 3 },
        { name: 'Tirunelveli', abbr: 'TEN', id: 4 },
        { name: 'Nagercoil', abbr: 'NCJ', id: 5 },
        { name: 'Coimbatore', abbr: 'CBE', id: 6 },
        { name: 'Erode', abbr: 'ED', id: 7 },
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    }
  },
  methods:{
    submit(){
      console.log(this.isFormValid)
      this.$refs.form.validate()
      if(this.isFormValid)
        alert("Name: "+this.name+" Age: "+this.age);
    },
    reset(){
      alert('Form Resetted');
    },
    // eslint-disable-next-line no-unused-vars
    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.abbr.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
    },
  }
}
</script>

<style scoped>

</style>