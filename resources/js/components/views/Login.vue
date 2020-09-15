<template>
    <div class="d-flex justify-center">
        <v-card class="pa-4 mt-7" elevation="10">
            <div class="row d-flex justify-center">
                <h3 class="">Sign in</h3>
            </div>
            <div>
                <v-text-field label="Email" v-model="email"></v-text-field>
                <v-text-field type="password" label="Password" v-model="password"></v-text-field>
            </div>
            <div class="d-flex justify-center">
                <v-btn @click="login">
                    Login
                </v-btn>
            </div>

        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";

@Component
export default class Login extends Vue {
    name = "Login";
    email = '';
    password = '';

    login(){
        this.email = '';
        this.password ='';
    }
}
</script>

<style scoped>

</style>
