<template>
    <v-card class="d-flex justify-center">
        zalogowany
        {{name}}
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component
export default class Home extends Vue{
    name= "Home"
}
</script>

<style scoped>

</style>
