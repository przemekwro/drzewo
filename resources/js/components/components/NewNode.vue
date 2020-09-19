<template>
    <v-card class="mt-7 pa-5" elevation="10">
        <div class="">
            <div class="row d-flex align-center justify-center">
                <h2>New</h2>
            </div>
            <div class="row align-center">
                <div class="col-9 pa-5">
                    <v-text-field v-model="name" :error="nameError.length>0" :error-messages="nameError"
                                  label="Name"></v-text-field>
                </div>
                <div class="col-9">
                    <v-select item-value="id" label="Select node" :error="selectError.length>0" :error-messages="selectError"
                              :item-text="text" v-model="selectValue" type="radio" :items="paths"></v-select>
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
import {Watch} from "vue-property-decorator";

@Component
export default class NewNode extends Vue {
    name = '';
    nameError = '';
    selectValue = null;
    selectError = "";

    node = true;
    result = '';
    tree = [];
    paths: Array<Object> = [];

    get wasRemoved() {
        return state.getters.getRemoveAction;
    }

    get isAuthenticated() {
        return state.getters.isAuthenticated
    }

    get label() {
        if (this.node) {
            return 'Node';
        }
        return 'Leaf'
    }

    private text(item: any) {
        let path = ``;
        item.path.forEach((i: any) => {
            path += `${i}/`
        })
        return path
    }

    public async init() {
        this.paths = []
        this.tree = await state.dispatch('refreshTree');
        this.prepareTree()
    }

    private prepareTree() {
        let tree = [...this.tree]

        tree.forEach((item: any) => {
            item.path = []
        })

        this.createTree(tree, []);
        return true
    }

    private createTree(tree: any, path: any) {
        if (!tree) return null

        tree.forEach((item: any) => {
            item.path = [...path]
            item.path.push(item.name)
            this.paths.push(item)

            this.createTree(item.all_children, item.path)
        });
    }

    private async addNode() {
        if (!this.isAuthenticated) {
            return false
        }

        if (!this.validateNewNode()) {
            return false
        }

        const headers = await state.getters.getHeaders;

        await axios.post('//localhost:8000/api/tree', {
            name: this.name,
            parent_id: this.selectValue,
        }, headers).catch(er => {
            console.log(er)
        })
        //odswiez
        await this.init();

        //wyczysc
        this.name = '';
        this.selectValue = null;
    }

    private validateNewNode() {
        const regex = new RegExp('^[a-zA-z. ]{3,32}$');
        if (!regex.test(this.name)) {
            this.nameError = "Only letter, length between 3 and 32"
            return false
        }
        if (!this.selectValue) {
            this.selectError = 'Select parent';
            return false
        }

        this.nameError = '';
        this.selectError = '';

        return true
    }

    @Watch('wasRemoved')
    async onWasRemovedChange(newValue: boolean, oldValue: boolean) {
        if (newValue) {
            await this.init();
            state.commit('setRemoveAction', false)
        }
    }

    mounted() {
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
