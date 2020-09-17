<template>
    <div>
        <div class=" pa-10 row justify-space-between">
            <h1>Tree</h1>
            <div>
                <div class="d-flex align-center">
                    <v-btn-toggle v-model="buttons" >
                        <v-btn max-height="36px" @click="sortAscending">
                            <v-icon>mdi-sort-alphabetical-ascending</v-icon>
                        </v-btn>
                        <v-btn max-height="36px" @click="sortDescending">
                            <v-icon>mdi-sort-alphabetical-descending</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                    <v-btn class="ml-5" @click="expandList"><span v-if="!expand">Show all</span> <span v-else>Hide all</span></v-btn>
                </div>
            </div>
        </div>
        <div>
            <draggable v-bind="options"
                        :list="sortedTree" class="dragArea" :group="{ name: 'g1' }">
                <div v-for="el in sortedTree" :key="el.id">
                    <ListElement :el="el"/>
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

@Component({
    components: {
        ListElement,
        draggable
}})
export default class List extends Vue {
    buttons=0

    sortedTree:any=null

    get options(){
        return{
            onEnd:function(evt:any){
                console.log('asd')
            },
            onAdd: function (/**Event*/ evt) {
                console.log('asdasdadsasd')
            }
        }
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
    sortAscending(){
        this.sortTreeAscending(this.sortedTree)
    }
    sortDescending(){
        this.sortTreeDescending(this.sortedTree)
    }

    sortTreeAscending(tree:Array<Object>) {
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

    sortTreeDescending(tree:Array<Object>) {
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


    nodeHasChildren(tree:any){
        if(tree.all_children.length>0){
            return true
        }
        return false
    }
    async init (){
        this.sortedTree = await state.dispatch('downloadTree')
        this.sortTreeAscending(this.sortedTree)
    }

    mounted(){
        this.init()
    }

};
</script>
<style scoped></style>
