<template>
    <div>
        <div v-if="tree" >
       {{tree[0].all_children[4].all_children}}
        </div>
        <div v-else>
            cokolwiek
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
    tree = null

    mounted() {
        this.init()
    }

    private async init(){
        let tree = await axios.get('//localhost:8000/api/trees')
        this.tree = tree.data

    }

}
</script>

<style scoped>


</style>
