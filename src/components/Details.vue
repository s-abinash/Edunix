<template>
  <div>
    <v-form ref="form" v-model="isFormValid" lazy-validation>
    <v-row cols="10">
      <v-text-field rounded outlined  v-model="name" label="Name" :rules="[v => !!v || 'Name is Required']"></v-text-field>
    </v-row>
    <v-row cols="10">
      <v-text-field type="number" outlined  min="0" max="100" :rules="[v => !!v || 'Age is Required', v => (v!=0) || 'Age cannot be 0'] " rounded v-model="age" label="Age"></v-text-field>
    </v-row>
    <v-row cols="10">
      <v-select :items="['Sleeper','3A','2A','1A','Seater']" outlined  rounded :rules="[v => !!v || 'Class is Required']" v-model="type" label="Class"></v-select>
    </v-row>
    <v-row justify="end" class="mb-3">
      <v-btn @click="reset" value="reset" type="reset">Reset</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="submit" dark value="Submit" type="submit">Submit</v-btn>
    </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data:function (){
    return {
      name: '',
      age: '',
      type: '',
      isFormValid: true
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
    }
  }
}
</script>

<style scoped>

{
  background-color: darkslateblue;
}
</style>