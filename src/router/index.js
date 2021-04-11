import Vue from 'vue'
import VueRouter from 'vue-router'

import e404 from '../components/e404';
import BookingForm from "../views/BookingForm";
import TrainSearch from "../views/TrainSearch";
import Login from "../views/Login";

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

export default router
