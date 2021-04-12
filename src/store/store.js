import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './loginStore';
import bookingStore from './bookingStore';

Vue.use(Vuex);


export const store=new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    modules: {
        login:login,
        bookingStore: bookingStore,
      }
})