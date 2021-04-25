<template>
<div>
  <v-container fluid>
    <v-card background-color="transparent" class="ma-lg-4" elevation="6">
      <v-card-subtitle>
        <v-row justify="start">
          <v-col cols="4" class="ml-10">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field>
          </v-col>
          <v-col cols="8"></v-col>
        </v-row>
      </v-card-subtitle>
      <v-data-table :headers="headers" :items="courses" sort-by="id" :search="search" class="elevation-1 px-10">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Course Management</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" rounded>
                  <v-icon>mdi-plus</v-icon>
                  Add Course
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-subtitle v-show="editedIndex>-1">Course ID: {{editedItem.id}}</v-card-subtitle>
                <v-card-text>
                  <v-container>
                    <v-form class="px-5" ref="form" v-model="valid" lazy-validation>

                      <v-select v-model="editedItem.category" label="Category" :items="category" outlined :rules="[v => !!v || 'Category is required']"></v-select>
                      <v-text-field v-model="editedItem.name" label="Title" outlined :rules="[v => !!v || 'Title is required']"></v-text-field>
                      <v-textarea v-model="editedItem.description" label="Description" outlined :rules="[v => !!v || 'Description is required']"></v-textarea>
                      <v-text-field v-model="editedItem.author" label="Author" outlined :rules="[v => !!v || 'Author is required']"></v-text-field>

                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="green" dark @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="deleteItemConfirm">Delete</v-btn>
                  <v-btn color="grey darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" @click="editItem(item)" color="#FFEC68">mdi-pencil</v-icon>
          <v-icon  @click="deleteItem(item)" color="#FF5500">mdi-delete</v-icon>
        </template>
        <template v-slot:item.goto="{ item }">
          <v-btn color="purple" icon @click="goto(item)"><v-icon x-large> mdi-arrow-right</v-icon></v-btn>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-overlay v-show="loading">
      <v-progress-circular color="black" width="10" size="70" indeterminate></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" class="black--text" elevation="4" rounded="pill">
      <b class="white--text align-center"> {{ snacktext }} </b>
      <template v-slot:action="{ attrs }"><v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn></template>
    </v-snackbar>

  </v-container>
  <v-overlay :value="loading">
    <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
  </v-overlay>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "Create",
  data: function () {
    return {
      title: '',
      category: ['Web Development','Machine Learning', 'Big Data', 'IoT', 'Cloud/DevOps'],
      author: '',
      description: '',
      dialog: false,
      dialogDelete: false,
      logo: require("@/assets/logo.png"),
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id',},
        {text: 'Name', value: 'name'},
        {text: 'Category', value: 'category'},
        {text: 'Author', value: 'author'},
        {text: 'Actions', value: 'actions', sortable: false },
        {text: 'Go to Contents', value: 'goto', sortable: false },

      ],
      courses: [],
      valid: true,
      loading: false,
      snackbar: false,
      snacktext: '',
      search: '',
      groupby: '',
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        description: '',
        author: '',
        category: '',
      },
      defaultItem: {
        id: '',
        name: '',
        description: '',
        author: '',
        category: '',
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add Course' : 'Edit Course'
    },
  },
  mounted() {
    let ref = this;
    this.loading = false;
    axios.post('course/getCourse')
        .then(function (response) {
          console.log(response.data.data)
          response.data.data.forEach((e) => {
            ref.courses.push({
              id: e.id,
              name: e.name,
              description: e.description,
              author: e.author,
              category: e.category,
            });
          });
        }).catch(function (error) {
      console.log(error);
    }).finally(() => this.loading = false);
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    showSnackbar(txt) {
      this.snacktext = txt;
      this.snackbar = true;
    },
    initialize() {
      this.courses = []
    },
    goto(item)
    {
      console.log(item.id)
      this.$router.push({name:'Add Content', params: {courseid:item.id,coursename:item.name}})
    },
    editItem(item) {
      this.editedIndex = this.courses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.courses.indexOf(item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      let ref = this;
      this.loading = false;
      axios.post('course/deleteCourse', {
        id: ref.courses[ref.editedIndex].id
      }).then(function (response) {
        ref.showSnackbar(response.data.message);
      }).catch(function (error) {
        console.log(error);
      }).finally(() => this.loading = false);
      this.courses.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      this.validate();
      let ref = this;
      let error;
      this.loading = false;
      if (this.valid) {
        if (this.editedIndex > -1) {
          await axios.post('course/updateCourse', {
            id: this.editedItem.id,
            title: this.editedItem.name,
            category: this.editedItem.category,
            author: this.editedItem.author,
            description: this.editedItem.description
          }).then(function (response) {
            ref.showSnackbar(response.data.message);
            error = response.data.error;
          }).catch(function (error) {
            console.log(error);
          }).finally(() => this.loading = false);
          if (!error) {
            Object.assign(this.courses[this.editedIndex], this.editedItem);
            this.close();
          }

        } else {
          await axios.post('course/insertCourse', {
            title: this.editedItem.name,
            category: this.editedItem.category,
            author: this.editedItem.author,
            description: this.editedItem.description
          }).then(function (response) {
            error = response.data.error;
            (!error) ? ref.showSnackbar("Inserted Successfully") : ref.showSnackbar("Course already exist. Please try again.");
            ref.editedItem.id = response.data.id;
          })
              .catch(function (error) {
                console.log(error);
              }).finally(() => this.loading = false);
          if (!error)
            this.courses.push(this.editedItem);
        }
        if (!error)
          this.close();
      }
    },
  }
}
</script>

<style scoped>

</style>