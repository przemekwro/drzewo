<template>
    <div elevation="0" class="error404 d-flex justify-center align-center">
        <div>
            <div class="">
                <h1>Error 404</h1>
            </div>
            <div class="">
                <h5>Not found</h5>
            </div>
        </div>
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

    login() {
        this.email = '';
        this.password = '';
    }
}
</script>

<style scoped>
.error404 {
    color: #c6c6c6;
}
h1{
    font-size: 64px;
}
h5{
    font-size: 24px;
}

</style>
