import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import { store } from './store/store.js';
import axios from 'axios';

Vue.prototype.$store = store;
Vue.config.productionTip = false

// Axios Defaults
axios.defaults.headers.common['Authorization'] = 'token '+store.state.login.token;

if (process.env.NODE_ENV === 'production')
  axios.defaults.baseURL = 'http://edunix.us-east-1.elasticbeanstalk.com/api/';
else
  axios.defaults.baseURL = 'http://localhost:3000/api/';

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
