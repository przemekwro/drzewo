<template>
    <v-app class="body">
        <v-card class="menu d-flex align-center" elevation="20">

                <Menu></Menu>

        </v-card>
        <div class="content container">
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
        console.log('Component mounted.')
    }
}
</script>
<style>
.content{
    height: 90vh;
}
.menu {
    height: 10vh;
    border-radius: 0px !important;
}

</style>
