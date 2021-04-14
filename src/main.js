import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import { store } from './store/store';
import axios from 'axios';

Vue.config.productionTip = false

// Axios Defaults
axios.defaults.headers.common['Authorization'] = 'token '+store.getters['login/token'];
axios.defaults.baseURL = 'http://localhost:3000/api/'

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
