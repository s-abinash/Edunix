import Vue from 'vue'
import VueRouter from 'vue-router'
import e404 from '../components/e404';
import AdminHome from "../views/Admin/Home";
import Home from "../views/Home";
import Create from "@/components/Admin/Create";
import AddContent from "@/components/Admin/AddContent";
import Login from "@/views/Login";
import Course from "@/components/User/Course";

import {store} from "@/store/store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/learn',
        name: 'Learn',
        component: Course,
        props: true
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminHome
    },
    {
        path: '/admin/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/admin/addcontent',
        name: 'Add Content',
        component: AddContent,
        props: true
    },
    {
        path: '*',
        name: '404',
        component: e404
    },
]

const router = new VueRouter({
    mode: 'history',
    base:'edunix',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name === 'Learn' && !store.getters['login/isAuthenticated']){
        next({ name: 'Login' })
    }
    else if ((to.name === 'Admin' || to.name === 'Create' || to.name === 'Add Content') && !store.getters['login/isAdmin']){
        next({ name: 'Login' })
    }
    else next()
})

export default router
