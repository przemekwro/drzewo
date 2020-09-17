<template>
    <div class="pl-5">
        <div>
            <v-btn @click="showTree" :disabled="!hasChild" icon>
                <v-icon v-if="!show">mdi-chevron-right</v-icon>
                <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
            {{ el.name }} {{ date(el.created_at) }}
        </div>

        <v-expand-transition>
            <div v-show="show">
                <draggable v-bind="options" :list="el.all_children" class="dragArea" tag="ul" :group="{ name: 'g1' }">
                    <div v-for="e in el.all_children">
                        <ListElement :el="e"></ListElement>
                    </div>

                </draggable>
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

@Component({
    components: {
        draggable,
    }, name: 'ListElement'
})
export default class ListElement extends Vue {

    get options(){
        return{
            put:function(evt:any){
                console.log('asd')
                return true
            },
            add:function(){
                console.log('penis')
            }
        }
    }
    @Prop()
    el: any
    message = '';
    private show: boolean = false;

    onAdd(/**Event*/ evt:Event) {
        console.log('asd')
        // same properties as onEnd
    }

    asd(){
        console.log('dropped')
    }

    @Watch('expand')
    onExpandChanged(val: boolean, oldVal: boolean) {
        if (oldVal) {
            this.show = false;
        } else {
            this.show = true;
        }
    }

    get expand() {
        return state.getters.getExpand
    }

    get hasChild() {
        if (this.el.all_children.length > 0) return true
        return false
    }

    showTree() {
        this.show = !this.show
    }

    date (value:any) {
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
