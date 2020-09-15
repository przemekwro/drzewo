<template>
    <div>
        <v-btn text>
            <router-link to="/login">ASD</router-link>
        </v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Menu extends Vue{
name= "MenuBeforeLogin"
}
</script>

<style scoped>

</style>
