<template>
    <div class="container d-flex justify-space-between align-center">
        <div class="row d-flex align-center ">
            <v-img max-height="64px" max-width="64px" src="https://image.flaticon.com/icons/png/512/93/93701.png"></v-img>
        <div class="ml-5 logo text-uppercase">
            Tree
        </div>
        </div>
        <div class="d-flex justify-end">
            <div v-if="!isAuthenticated">
                <router-link to="/" exact>
                    <v-btn text>
                        Home
                    </v-btn>
                </router-link>
                <router-link to="/login" exact>
                    <v-btn text>
                        Login
                    </v-btn>
                </router-link>
                <router-link to="/register" exact>
                    <v-btn text>
                        Register
                    </v-btn>
                </router-link>
            </div>
            <div v-else>
                <router-link to="#">
                    <v-btn @click="logout" text>
                        Logout
                    </v-btn>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import state from '../../store'

@Component
export default class Menu extends Vue {
    get isAuthenticated () {
        return state.getters.isAuthenticated
    }

    logout(){
        state.dispatch('logout')
        this.$router.push({name:'Login'})
    }
}
</script>

<style scoped>
a {
    color: black !important;
    text-decoration: none;
}

.router-link-active {
    color: black;
    text-decoration: underline;
}

.logo {
    font-size: 36px;
    font-weight: bold;
}

</style>
