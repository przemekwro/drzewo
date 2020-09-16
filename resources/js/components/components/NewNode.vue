<template>
    <v-card class="mt-7 pa-5" elevation="10">
        <div class="">
            <div class="row d-flex align-center justify-center">
                <h2>New</h2>
            </div>
            <div class="row align-center">
                <div class="col-6 pa-5">
                    <v-text-field v-model="name" label="Name"></v-text-field>
                </div>
                <div class="col-6 d-flex justify-center">
                    <v-switch
                        v-model="node"
                        :label="label"
                    ></v-switch>
                </div>
                <div class="col-9">
                    <v-select item-value="value" item-text="name" v-model="selectValue" type="radio" :items="exampleList"></v-select>
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
export default class Menu extends Vue {
    name='';
    exampleList=[{name:'null', value: null},{name:'9', value:9},{name:'20', value:20},{name:'23', value:23}];
    node=true;
    selectValue='';

    result = '';

    get label(){
        if(this.node){
            return 'Node';
        }
        return 'Leaf'
    }

    private async addNode(){
        let token  = await state.getters.getToken;

        let asd =  await axios.post('//localhost:8000/api/tree',{
            name:this.name,
            is_node:this.node,
            parent_id:this.selectValue,
            Authorization:`Bearer ${token}`
            }).catch(er =>{
                console.log(er)
        })
        console.log(asd)
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
