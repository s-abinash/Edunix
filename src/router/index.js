import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "../components/HelloWorld";
import e404 from '../components/e404';
import BookingForm from "../views/BookingForm";

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'Hello',
        component: HelloWorld
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
