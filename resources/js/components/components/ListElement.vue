<template>
    <div :id="el.id" class="pl-5">
        <div class="row d-flex align-center">
            <v-btn @click="showTree" :disabled="!hasChild" icon>
                <v-icon v-if="!show">mdi-chevron-right</v-icon>
                <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
            <div class="d-flex align-center">
                <div class="d-flex mt-6 mr-5">
                    <v-text-field :error="true" :readonly="!isEdit" :error-messages="nameError" v-model="el.name"
                                  solo></v-text-field>
                </div>
                <div v-if="isAuthenticated">
                    <v-btn class="mr-5" @click="editNode">edit</v-btn>
                    <v-btn @click="deleteNode">Delete</v-btn>
                </div>
            </div>

            <v-dialog v-model="deleteNodeConfirm">
                <DeleteNode :el="el" @deleteNodeConfirm="deleteNode"></DeleteNode>
            </v-dialog>
        </div>

        <v-expand-transition>
            <div v-show="show">
                <div>
                    <draggable :id="el.id" v-bind="options" :list="el.all_children"
                               @remove="removed" tag="div">
                        <ListElement v-for="e in el.all_children" :key="e.id" :id="e.id" :el="e"></ListElement>
                    </draggable>
                </div>
            </div>
        </v-expand-transition>
    </div>
</template>
<script lang="ts">
import Vue from 'Vue';
import draggable from "vuedraggable";
import Component, {mixins} from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";
import state from '../../store'
import axios from 'axios'
import DeleteNode from "./DeleteNode.vue";

@Component({
    components: {
        draggable,DeleteNode
    }, name: 'ListElement'
})
export default class ListElement extends Vue {
    @Prop()
    el: any

    private nameError: string = '';
    private show: boolean = false;
    private isEdit: boolean = false;
    private deleteNodeConfirm: boolean = false;


    get isAuthenticated(){
        return state.getters.isAuthenticated;
    }

    get options(){
        return {
            group:{
                name:'g1',
                put:()=>{
                    if(!this.isAuthenticated){
                        return false
                    }
                    return true;
                },
                pull:()=>{
                    if(!this.isAuthenticated){
                        return false
                    }
                    return true;
                }
            }
        }
    }

    get expand() {
        return state.getters.getExpand
    }

    get hasChild() {
        if (this.el.all_children.length > 0) return true
        return false
    }

    get name() {
        return this.el.name
    }

    async removed(evt: any) {
        await state.dispatch('moveNode',{
            item:evt.item.id,
            parent_id:evt.to.id,
        })
    }

    showTree() {
        this.show = !this.show
    }

    validate() {
        const regex = new RegExp('^[a-zA-z. ]{3,32}$');
        if (!regex.test(this.el.name)) {
            this.nameError = "Only letter, length between 3 and 32"
            return false
        }
    }

    editNode() {
        if (!this.isEdit)
            return this.isEdit = true

        const options = {'name': this.name}
        const headers = state.getters.getHeaders

        axios.put(`//localhost:8000/api/tree/${this.el.id}`, options,headers)
        this.isEdit = false
    }

    deleteNode() {
        return this.deleteNodeConfirm = !this.deleteNodeConfirm;

    }

    @Watch('expand')
    onExpandChanged(val: boolean, oldVal: boolean) {
        if (oldVal) {
            this.show = false;
        } else {
            this.show = true;
        }
    }

    @Watch('name')
    onNameChanged() {
        this.nameError = '';
        setTimeout(() => {
            this.validate()
        }, 500)
    }

    date(value: any) {
        const date = new Date(value)

        let day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`
        let month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth()}`
        const year = date.getFullYear()

        let hours = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`
        let minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`

        return `${year}-${month}-${day} ${hours}:${minutes}`
    }

};
</script>
<style scoped>
</style>
