<template>
    <div class="tree">
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
        <div v-if="!loaded && !error">
            Loading...
        </div>
        <div v-if="loaded">
            <draggable v-bind="options" :disable="!isAdmin" @remove="removed" :id="tree[0].id" :list="tree[0].all_children">
                <div v-for="el in tree[0].all_children" :key="el.id" :id="el.id">
                    <ListElement class="pa-5" :el="el"/>
                </div>
            </draggable>
        </div>
        <div v-if="error">
            Empty tree or issue with downloading data.
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from "vuedraggable";
import ListElement from "./ListElement.vue";
import Component from "vue-class-component";
import state from "../../store";

@Component({
    components: {
        ListElement,
        draggable
    }
})
export default class List extends Vue {
    buttons = 0
    loaded = false;
    error = false

    get options(){
        return {
            group:{
                name:'g1',
                put:()=>{
                    if(!this.isAdmin){
                        return false
                    }
                    return true;
                },
                pull:()=>{
                      if(!this.isAdmin){
                          return false
                      }
                      return true;
                },
                disabled:this.isAdmin
            }
        }
    }

    get isAdmin(){
        return state.getters.isAdmin;
    }

    async removed(evt: any) {
        await state.dispatch('moveNode',{
            item:evt.item.id,
            parent_id:evt.to.id,
        })
    }

    get tree() {
        return state.getters.getTree
    }

    get expand() {
        return state.getters.getExpand
    }

    expandList() {
        state.commit('setExpand')
    }

    sortTree(callback:any,tree: Array<Object>) {
        tree.sort(callback);
        tree.forEach((node: any) => {
            if (this.nodeHasChildren(node)) {
                this.sortTree(callback,node.all_children)
            }
        })
    }

    sortDescending(){
        this.sortTree((a:any,b:any)=>{
            if (a.name < b.name) return 1
            if (a.name > b.name) return -1
            return 0
        },this.tree[0].all_children)
    }

    sortAscending() {
        this.sortTree((a: any, b: any) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
        },this.tree[0].all_children)
    }

    nodeHasChildren(tree: any) {
        if (tree.all_children.length > 0) {
            return true
        }
        return false
    }

    async init() {
        await state.dispatch('downloadTree').then(()=>{
            this.sortAscending()
            this.loaded = true
        }).catch(()=>{
            this.error = true
        })
    }

    mounted() {
        this.init()
    }

};
</script>

<style scoped>
.v-btn{
    font-family: 'Courier Prime', monospace;
}
</style>
