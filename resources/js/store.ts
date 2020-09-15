import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token:false,
    },
    getters:{
        getToken(state){
            return state.token;
        },
        isAuthenticated(state){
            if(state.token) return true
            return false
        },
    },
    mutations: {

    },
    actions:{

    },

    modules:{}
})

export default store
