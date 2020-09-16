import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null || localStorage.getItem('token'),
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        isAuthenticated(state) {
            if (state.token) return true
            return false
        },
    },
    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token)
            state.token = token
        },
        deleteToken(state){
            localStorage.removeItem('token')
            state.token = null
        }
    },
    actions: {
        async register(state, {name, email, password}) {
            const register = await axios.post('//localhost:8000/api/auth/register', {
                name: name,
                email: email,
                password: password
            })

            if (!register.data.access_token) return false

            state.commit('setToken', register.data.access_token)
            return true;
        },

        async login(state, {email, password}) {
            const login = await axios.post('//localhost:8000/api/auth/login', {email: email, password: password})

            if (!login.data.access_token) {
                return false
            }
            state.commit('setToken', login.data.access_token)
            return true
        },

        async logout(state) {
            const token = state.getters.getToken
            state.commit('deleteToken')
            const options = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const res = await axios.post('http://localhost:8000/api/auth/logout', { hello: 'world' },options);
            return true
        },
    },

    modules: {}
})

export default store
