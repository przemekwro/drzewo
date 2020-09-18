<template>
    <v-card>
        <div class="pa-5">
            <div class="row d-flex justify-center ma-5">
                <h2>Deleting node</h2>
            </div>
            <div class="row d-flex justify-center ma-5">
                Choose type of delete.
                You can delete only node ( child will be assigned to parent of deleting node), or You can delete node with all child.
            </div>
            <div class="d-flex justify-space-around ma-5">
                <v-btn color="red" @click="deleteNode">Delete All</v-btn>
                <v-btn color="red" @click="deleteOnlyNode">Delete Node</v-btn>
                <v-btn @click="cancelDelete">Cancel</v-btn>
            </div>
        </div>
    </v-card>
</template>
<script lang="ts">
import Vue from 'Vue';
import draggable from "vuedraggable";
import Component, {mixins} from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";
import state from '../../store'
import axios from 'axios'

@Component({
    components: {
        draggable,
    }, name: 'ListElement'
})
export default class ListElement extends Vue {
    @Prop()
    el: any

    removed(evt: any) {
        const data = {'parent_id': evt.to.id}

        axios.put(`//localhost:8000/api/tree/parent/${evt.item.id}`, data)
    }

    cancelDelete(){
        this.$emit('deleteNodeConfirm',false)
    }

    async deleteNode() {
        await axios.delete(`//localhost:8000/api/tree/${this.el.id}`);
        this.refresh()
    }
    async deleteOnlyNode() {
        await axios.delete(`//localhost:8000/api/tree/node/${this.el.id}`);
        this.refresh()
    }
    refresh(){
        state.dispatch('refresh');
    }
};
</script>
<style scoped>
</style>
