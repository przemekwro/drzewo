<template>
    <v-app class="">
        <v-card class="menu d-flex align-center" elevation="10">
                <Menu></Menu>
        </v-card>
        <div class="content container body pa-10">
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </div>
    </v-app>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from 'vue'
import Menu from './components/Menu.vue'

@Component({
    components: {
        Menu
    }
})
export default class MainApp extends Vue {
    mounted() {
    }
}
</script>
<style>
.v-application--wrap{
    background: #c9c9c9;

}
.content{
    max-width: 1100px;
}
.menu {
    height: 10vh;
    border-radius: 0px !important;
}
</style>
