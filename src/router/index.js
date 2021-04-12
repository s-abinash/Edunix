import Vue from 'vue'
import VueRouter from 'vue-router'

import e404 from '../components/e404';
import BookingForm from "../views/BookingForm";
import TrainSearch from "../views/TrainSearch";
import Login from "../views/Login";
import {store} from "../store/store.js";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: TrainSearch
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/booking',
        name: 'BookingForm',
        component: BookingForm
    },
    {
        path: '*',
        name: '404',
        component: e404
    },
]

const router = new VueRouter({
    base:'ticket-booking',
    routes
})

router.beforeEach((to, from, next) => {
    console.log(store.getters['login/isAuthenticated']);
    if (to.name !== 'Login' && to.name !=='Home' && !store.getters['login/isAuthenticated']) next({ name: 'Login' })
    else next()
})

export default router
