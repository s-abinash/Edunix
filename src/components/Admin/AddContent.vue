<template>
  <div>
    <AppBar></AppBar>
    <v-container fluid>
      <v-card class="px-5 ml-auto mr-auto mt-3" max-width="900">
        <v-card-title class="justify-start">
          <v-btn text color="primary" @click="$router.push({'name': 'Admin'})"><v-icon>mdi-arrow-left</v-icon>Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="refresh"><v-icon>mdi-refresh</v-icon>Refesh</v-btn>
        </v-card-title>
        <v-card-title class="text-h3">{{this.coursename}}</v-card-title>
        <v-card-subtitle>Course Content</v-card-subtitle>
        <v-card-text>
          <v-card v-for="(content,index) in contents" :key="content.id" rounded class="px-5 mt-5">
            <v-card-title>{{ (index+1)+". "+content.name }}</v-card-title>
            <v-card-text>
              {{content.description}}
            </v-card-text>
            <v-card-actions>

              <v-spacer></v-spacer>
              <v-icon class="mr-2" @click="editItem(content)" color="#FFEC68">mdi-pencil</v-icon>
              <v-icon  @click="deleteItem(content)" color="#FF5500">mdi-delete</v-icon>
            </v-card-actions>
            <v-expansion-panels flat >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-card-text color="purple"><v-icon>mdi-play-box-outline</v-icon>Play Video</v-card-text>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                 <div class="text--center ml-15 mr-auto ">
                   <video width="610" height="340" controls id="myVideo">
                    <source :src="content.link" type="video/mp4">
                  </video>
                 </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click.stop="dialog=true">Add Section</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" max-width="800">
        <v-card>
          <v-card-title class="headline">
            {{ formTitle }} Content
          </v-card-title>
          <v-card-text class="px-10">
            Select Type of Content
            <v-text-field label="Title" v-model="editedItem.name"></v-text-field>
            <v-text-field label="Description" v-model="editedItem.description"></v-text-field>
            <v-file-input style="cursor: pointer" show-size label="Upload Video" @change="selectFile" chips accept="video/mp4,video/x-m4v,video/*"></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="addSection"> {{ formTitle }}</v-btn>
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
    </v-container>
    <v-snackbar v-model="snackbar" class="black--text" elevation="4" rounded="pill">
      <b class="white--text align-center"> {{ snacktext }} </b>
      <template v-slot:action="{ attrs }"><v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn></template>
    </v-snackbar>
    <v-overlay :value="loading">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from 'axios'
import AppBar from "@/components/Home/AppBar";


export default {
  name: "AddContent",
  components: {AppBar},
  props:['courseid','coursename'],
  mounted() {
    let ref = this;
    this.loading=true;
    axios.post('content/getContent',{courseid:this.courseid})
        .then(function (response) {
          console.log(response.data.data)
          response.data.data.forEach((e) => {
            ref.contents.push({
              id:e.id,
              name:e.name,
              description:e.description,
              link:e.link,
              currentFile: undefined,
              key: e.filekey
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
  data:function () {
    return {
      dialog:false,
      dialogDelete: false,
      contenttype: '',
      videoEnable: false,
      currentFile: undefined,
      snackbar: false,
      snacktext: '',
      progress: 0,
      message: "",
      name:'Introduction',
      description:'Sample Description',
      player:false,
      playerLink:'',
      id:'',
      contents: [],
      valid: true,
      loading: true,
      search: '',
      groupby: '',
      editedIndex: -1,
      editedItem: {
        id:'',
        name:'',
        description:'',
        link:'',
        currentFile: undefined,
        key:''
      },
      defaultItem: {
        id:'',
        name:'',
        description:'',
        link:'',
        currentFile: undefined,
        key:''
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add' : 'Update'
    },
    newLink(){
      return this.playerLink
    }
  },
  methods:{
     refresh:function (){
       let ref = this;
       this.contents=[]
       this.loading=true;
       axios.post('content/getContent',{courseid:this.courseid})
           .then(function (response) {
             console.log(response.data.data)
             response.data.data.forEach((e) => {
               ref.contents.push({
                 id:e.id,
                 name:e.name,
                 description:e.description,
                 link:e.link,
                 currentFile: undefined,
                 key: e.filekey
               });
             });
           }).catch(function (error) {
         console.log(error);
       }).finally(() => this.loading = false);
     },
      pauseandclose: function(){
          this.player=false;
          let vid = document.getElementById("myVideo");
          vid.pause();
      },
      showDialog(link)
      {
        console.log(link)
         this.playerLink=link;
         this.player=true;
      },
      showSnackbar(txt) {
        this.snacktext = txt;
        this.snackbar = true;
      },
      selectFile(file) {
        this.editedItem.currentFile = file;

      },
      async addSection() {
        this.loading = false;
        let formData = new FormData();
        let ref = this;
        let error;
        formData.append("file", this.editedItem.currentFile);
        formData.append("data", JSON.stringify({
          id: this.editedItem.id,
          course: this.courseid,
          coursename: this.coursename,
          name: this.editedItem.name,
          description: this.editedItem.description,
          link: this.editedItem.link,
          key: this.editedItem.key
        }))
        console.log(formData)
        if (this.valid) {
          if (this.editedIndex > -1) {
            await axios.post('/content/updateContent', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(function (response) {
              error = response.data.error;
              (!error) ? ref.showSnackbar("Updated Successfully") : ref.showSnackbar("Please try again.");
              ref.dialog=false;
              Object.assign(ref.contents[ref.editedIndex], ref.editedItem);
              ref.refresh();
            }).catch(function (error) {
              console.log(error);
            }).finally(() => this.loading = false);
            if (!error) {
              this.close();
            }
          }
          else{
            await axios.post('/content/insertContent', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(function (response) {
              error = response.data.error;
              (!error) ? ref.showSnackbar("Inserted Successfully") : ref.showSnackbar("Please try again.");
              ref.editedItem.id = response.data.id;
              ref.contents.push(ref.editedItem);
              ref.dialog=false;
            }).catch(function (error) {
              console.log(error);
            }).finally(() => this.loading = false);
            if (!error)
            {
              this.close();
            }

          }
        }
      },
    editItem(item) {
      this.editedIndex = this.contents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.contents.indexOf(item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      let ref = this;
      this.loading = false;
      axios.post('/content/deleteContent', {
        id: ref.contents[ref.editedIndex].id,
        key: ref.contents[ref.editedIndex].key
      }).then(function (response) {
        ref.showSnackbar(response.data.message);
      }).catch(function (error) {
        console.log(error);
      }).finally(() => this.loading = false);
      this.contents.splice(this.editedIndex, 1)
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

    }
}
</script>

<style scoped>

</style>