<template>
    <div>
        <div class="row justify-space-between pa-10">
            <h1>Tree</h1>
            <div>
                <div class="d-flex align-center">
                    <v-btn-toggle v-model="buttons">
                        <v-btn max-height="36px" @click="sortAscending">
                            <v-icon>mdi-sort-alphabetical-ascending</v-icon>
                        </v-btn>
                        <v-btn max-height="36px" @click="sortDescending">
                            <v-icon>mdi-sort-alphabetical-descending</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                    <v-btn class="ml-5" @click="expandList"><span v-if="!expand">Show all</span> <span
                        v-else>Hide all</span></v-btn>
                </div>
            </div>
        </div>
        <div v-if="loaded">
            <draggable :id="tree.id" group="g1" :list="tree[0].all_children">
                <div v-for="el in tree[0].all_children" :key="el.id" :id="el.id">
                    <ListElement class="pa-5" :el="el"/>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from "vuedraggable";
import ListElement from "./ListElement.vue";
import Component from "vue-class-component";
import state from "../../store";
import axios from "axios";

@Component({
    components: {
        ListElement,
        draggable
    }
})
export default class List extends Vue {
    buttons = 0
    loaded = false;

    get tree() {
        return state.getters.getTree
    }

    get expand() {
        return state.getters.getExpand
    }

    expandList() {
        state.commit('setExpand')
    }

    sortAscending() {
        this.sortTreeAscending(this.tree[0].all_children)
    }

    sortDescending() {
        this.sortTreeDescending(this.tree[0].all_children)
    }

    sortTreeAscending(tree: Array<Object>) {
        tree.sort((a: any, b: any) => {
            if (a.name > b.name) return 1
            if (b.name > a.name) return -1
            return 0
        });
        tree.forEach((node: any) => {
            if (this.nodeHasChildren(node)) {
                this.sortTreeAscending(node.all_children)
            }
        })
    }

    sortTreeDescending(tree: Array<Object>) {
        tree.sort((a: any, b: any) => {
            if (a.name < b.name) return 1
            if (b.name < a.name) return -1
            return 0
        });
        tree.forEach((node: any) => {
            if (this.nodeHasChildren(node)) {
                this.sortTreeAscending(node.all_children)
            }
        })
    }

    nodeHasChildren(tree: any) {
        if (tree.all_children.length > 0) {
            return true
        }
        return false
    }

    async init() {
        await state.dispatch('downloadTree')
        console.log(this.tree)
        await this.sortTreeAscending(this.tree[0].all_children)
        this.loaded = true
    }

    mounted() {
        this.init()
    }

};
</script>

<style>
ul li {
    text-decoration: none;
}

</style>
