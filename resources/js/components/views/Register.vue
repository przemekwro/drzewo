<template>
    <div class="d-flex justify-center">
        <v-card class="pa-4 mt-7" elevation="10">
            <div class="row d-flex justify-center">
                <h3 class="">Register</h3>
            </div>
            <div>
                <v-text-field label="Name" :error="nameError.length>1" :error-messages="nameError" v-model="name"></v-text-field>
                <v-text-field label="Email" :error="emailError.length>1" :error-messages="emailError" v-model="email"></v-text-field>
                <v-text-field type="password" label="Password" :error="passwordError.length>1" :error-messages="passwordError" v-model="password1"></v-text-field>
                <v-text-field type="password" label="Repeat" v-model="password2"></v-text-field>
            </div>
            <div class="d-flex justify-center">
                <v-btn @click="register">
                    Register
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import state from "../../store"

@Component
export default class Login extends Vue {
    name = '';
    email = '';
    password1 = '';
    password2 = '';
    passwordError='';
    emailError='';
    nameError='';

    private async register(){
        //if(!this.validate()) return false

        const register = await state.dispatch('register',{name:this.name,email:this.email,password:this.password1})

        if(!register){
            return false;
        }

        this.$router.push({name:'Home'});

        this.name = '';
        this.email = '';
        this.password1 = '';
        this.password2 = '';
        this.passwordError='';
        this.emailError='';
        this.nameError='';
    }

    private validate(){
        console.log('1')
        if(!this.validateName()){
            console.log('1.1')
            return false
        }
        console.log('2')
        if(!this.validateEmail()){
            return false
        }
        console.log('3')
        if(!this.validatePassword()){
            return false
        }
        return true
    }

    private validateEmail(){
        this.emailError='';
        console.log('asd')
        const regexp = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z.-]{1,}\\.[a-zA-Z]{2,4}$');
        if(!regexp.test(this.email)) {
            console.log('email');
            this.emailError='This is not an email';
            return false
        }
        return true
    }
    private validatePassword(){
        this.passwordError='';
        if(this.password1 !== this.password2) {
            console.log('password');
            this.passwordError = `Password doesn't match`;
            return false
        }

        const regexp = new RegExp("^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))).{8,32}$");
        if(!regexp.test(this.password1)){
            console.log('password regexp');
            this.passwordError = `8 characters, 1 letter big/small, 1 digit, 1 special`;
            return false
        }

        return true;
    }

    private validateName(){
        this.nameError='';

        const regexp = new RegExp('[0-9a-zA-Z]{3,}');
        if(!regexp.test(this.name)){
            console.log('name');
            this.nameError='Minimum 3 characters or digit';
            return false
        }
        return true
    }
}
</script>

<style scoped>

</style>
