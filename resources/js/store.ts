import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null || localStorage.getItem('token'),
        tree:null,
        expand:false,
        action:false,
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        isAuthenticated(state) {
            if (state.token) return true
            return false
        },
        getTree(state){
            return state.tree
        },
        getExpand(state){
            return state.expand
        },
        getHeaders(state){
            return {
                headers:{
                    Authorization: `Bearer ${state.token}`,
                    APP_KEY:'A6R9+vE5m2hvXE56fcKvycASwYby62/KEhYEKxi+b1g=',
                }
            }
        },
        getRemoveAction(state){
            return state.action;
        }
    },
    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token)
            state.token = token
        },
        deleteToken(state){
            localStorage.removeItem('token')
            state.token = null
        },
        setTree(state,tree){
            state.tree = tree
        },
        setExpand(state){
            state.expand = !state.expand
        },
        setRemoveAction(state,action){
            state.action=action;
        }
    },

    actions: {
        async register(state, {name, email, password}) {
            const register = await axios.post('//localhost:8000/api/auth/register', {
                name: name,
                email: email,
                password: password
            },{headers:{
                APP_KEY:'A6R9+vE5m2hvXE56fcKvycASwYby62/KEhYEKxi+b1g='
            }})

            if (!register.data.access_token) return false

            state.commit('setToken', register.data.access_token)
            return true;
        },

        async login(state, {email, password}) {
            const login = await axios.post('//localhost:8000/api/auth/login', {email: email, password: password},{headers:{
                    APP_KEY:'A6R9+vE5m2hvXE56fcKvycASwYby62/KEhYEKxi+b1g='
                }})

            if (!login.data.access_token) {
                return false
            }
            state.commit('setToken', login.data.access_token)
            return true
        },

        async logout(state) {
            const options = state.getters.getHeaders
            await axios.post('http://localhost:8000/api/auth/logout', {},options);
            state.commit('deleteToken')
            return true
        },

        async downloadTree(state){
            let tree=state.getters.getTree;
            const options = state.getters.getHeaders;
            if(tree) return tree

            tree = await axios.get('//localhost:8000/api/trees',options);
            await state.commit('setTree',tree.data)
            return tree.data
        },

        async refreshTree(state){
            const options = state.getters.getHeaders;
            let tree = await axios.get('//localhost:8000/api/trees',options)
            await state.commit('setTree',tree.data)
            return tree.data
        },

        async isAuthenticated(state){
            if(!state.getters.getToken) return false;

            const options = state.getters.getHeaders;

            await axios.post('//localhost:8000/api/auth/me',{},options).then(()=>{
                state.dispatch('refreshToken');
            }).catch(()=>{
                state.commit('deleteToken');
            })
        },

        async refreshToken(state){
            let options = state.getters.getHeaders;

            let token = await axios.post('//localhost:8000/api/auth/refresh',{},options)

            state.commit('setToken',token.data.access_token)
        },

        async moveNode(state,{item,parent_id}){
            const data = {'parent_id': parent_id}
            const headers = state.getters.getHeaders;

            await axios.put(`//localhost:8000/api/tree/parent/${item}`, data,headers)
            await state.commit('setRemoveAction',true)
        }
    },

    modules: {}
})

export default store
