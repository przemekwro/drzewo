<template>
    <v-card class="mt-7 pa-5" elevation="10">
        <div class="">
            <div class="row d-flex align-center justify-center">
                <h2>New</h2>
            </div>
            <div class="row align-center">
                <div class="col-6 pa-5">
                    <v-text-field v-model="name" :error="nameError.length>0" :error-messages="nameError" label="Name"></v-text-field>
                </div>
                <div class="col-6 d-flex justify-center">
                    <v-switch
                        v-model="node"
                        :label="label"
                    ></v-switch>
                </div>
                <div class="col-9">
                    <v-select item-value="id" :error="selectError.length>0" :error-messages="selectError" :item-text="text" v-model="selectValue" type="radio" :items="paths"></v-select>
                </div>
                <div class="col-3 d-flex justify-end">
                    <v-btn @click="addNode">Add</v-btn>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import state from '../../store'
import axios from 'axios'

@Component
export default class NewNode extends Vue {
    name='';
    nameError='';
    selectValue=null;
    selectError="";

    node=true;
    result = '';
    tree = [];
    paths:Array<Object> = [];

    private text(item:any){
        let path = ``;
        item.path.forEach((i:any)=>{
            path+=` / ${i}`
        })
        path+=' /'
        return path
    }


    private async init (){

        await state.dispatch('downloadTree').then(result=>{
            this.tree = result
        })
        let tree = [...this.tree]
        let paths =[];

        tree.forEach((item:any)=>{
            item.path = []
        })

        this.printNode(tree, []);
        return tree
    }

    printNode( tree:any, path:any){
        if(!tree) return null

        tree.forEach((item: any)=>{
            item.path=[...path]
            item.path.push(item.name)
            this.paths.push(item)

            this.printNode(item.all_children, item.path)
        });
    }

    get label(){
        if(this.node){
            return 'Node';
        }
        return 'Leaf'
    }

    private async addNode(){
        let token  = await state.getters.getToken;

        if(!this.validateNewNode()){
            return false
        }

        await axios.post('//localhost:8000/api/tree',{
            name:this.name,
            is_node:this.node,
            parent_id:this.selectValue,
            Authorization:`Bearer ${token}`
            }).catch(er =>{
                console.log(er)
        })
        await this.refresh();

        this.name='';
        this.selectValue=null;
    }

    private async refresh(){
        let tree = null
        tree = await state.dispatch('refresh')
        console.log(tree)
        tree.forEach((item:any)=>{
            item.path = []
        })

        this.printNode(tree, []);
        return true
    }

    private validateNewNode(){
        const regex = new RegExp('^[a-zA-z. ]{3,32}$');
        if(!regex.test(this.name)){
            this.nameError="Only letter, length between 3 and 32"
            return false
        }
        if(!this.selectValue){
            this.selectError='Select parent';
            return false
        }

        this.nameError='';
        this.selectError='';

        return true
    }

    mounted (){
        this.init()
    }
}
</script>

<style scoped>
a {
    color: black !important;
    text-decoration: none;
}

.router-link-active {
    color: black;
    text-decoration: underline;
}

.logo {
    font-size: 36px;
    font-weight: bold;
}

</style>
