import Vue from 'vue'
import VueRouter from "vue-router";
import Home from './components/views/Home.vue';
import Login from './components/views/Login.vue';
import Register from './components/views/Register.vue';
import Error404 from './components/views/Error404.vue';
import state from './store';


Vue.use(VueRouter)

const routes=[
    {
        name:'Home',
        path: '/',
        component:Home,
        meta:{
            requireAuth:true,
        },
    },
    {
        name:'Login',
        path: '/login',
        component:Login,

    },
    {
        name:'Register',
        path: '/register',
        component:Register,
    },
    {
        path: '*',
        name:'404',
        component: Error404
    }
]


const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach(function (to, from, next){
    if (to.meta.requireAuth === true && !state.getters.isAuthenticated) next({ name: 'Login' })
    else if(to.meta.requireAuth === false && state.getters.isAuthenticated) next({name:'Home'})
    else next()
})

export default router;