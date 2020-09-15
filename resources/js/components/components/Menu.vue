<template>
    <div class="container d-flex justify-space-between align-center">
        <div class="logo text-uppercase">
            Logo
        </div>
        <div class="d-flex justify-end">
            <router-link to="/login"><v-btn text>
                Login
            </v-btn></router-link>
            <router-link to="/register"><v-btn text>
                Register
            </v-btn></router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Menu extends Vue {
    name = "MenuBeforeLogin"
}
</script>

<style scoped>
a{
    color: black!important;
  text-decoration: none;
}
.router-link-active{
    color:black;
    text-decoration: underline;
}
.logo{
    font-size: 36px;
    font-weight: bold;
}

</style>
