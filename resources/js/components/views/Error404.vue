<template>
    <v-card elevation="0" class="error404 d-flex justify-center align-center mt-10 pa-10 pt-16 pb-16">
        <div>
            <div class="pa-0">
                <h1>Error 404</h1>
            </div>
            <div class="pa-0">
                <h5 cla>Not found</h5>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";

@Component
export default class Error404 extends Vue {

    mounted(){
        console.log('component error')
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
