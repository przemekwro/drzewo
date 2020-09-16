<template>
    <div>
        <NewNode></NewNode>

        <v-card class="mt-7 pa-5" elevation="10">
            <List>

            </List>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import NewNode from '../components/NewNode.vue';
import List from '../components/List.vue';

@Component({
    components: {
        NewNode, List
    }
})
export default class Home extends Vue {
    name = '';
}
</script>

<style scoped>

</style>
