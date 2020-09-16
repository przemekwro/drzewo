<template>
   <div>
       {{item.name}}
       <div v-for="i in item.all_children_accounts">

       </div>
   </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import state from '../../store'
import axios from 'axios'

@Component
export default class Menu extends Vue {

}
</script>

<style scoped>


</style>
