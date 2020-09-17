import "./bootstrap"
import vuetify from "./vuetify";
import Vue from "vue"
import router from "./router";
import Main from "./components/Main.vue";

Vue.component('MainApp', Main)

const app = new Vue({
    el: '#app',
    vuetify,
    router
});
