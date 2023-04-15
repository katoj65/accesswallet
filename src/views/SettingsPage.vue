<template>
<layout-component :title="title" :back="back">
<list-edit-component :menu="menu"></list-edit-component>
<div style="width:100%;">
<ion-button expand="block" @click="logout()">Logout</ion-button>
</div>
</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import ListEditComponent from '@/components/ListEditComponent.vue';
import { IonButton } from '@ionic/vue';
import { createClient } from '@supabase/supabase-js';

export default {
components:{
LayoutComponent,
ListEditComponent,
IonButton
},

data(){return{
title:'settings',
back:'/profile',

}},


computed:{
menu(){
const list=[
{id:1,title:'Names',description:'Joshua Kato',url:'edit-name'},
{id:2,title:'Gender',description:'Male',url:'edit-gender'},
{id:3,title:'DOB',description:'12/12/2023',url:'edit-dob'},
{id:4,title:'Email',description:'katoj65@gmail.com',url:'edit-email'},
{id:5,title:'Telephone',description:'0779902064',url:'edit-telephone'},
{id:6,title:'Country',description:'Uganda',url:'edit-country'},
{id:7,title:'Account Number',description:'1234567',url:null},
{id:8,title:'Password',description:'*********',url:'edit-password'},



];

return list;


}



},

methods:{
logout(){
const supabase = createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
supabase.auth.signOut();
this.$router.push('/login');
}

}







}
</script>
<style scoped>
ion-button{
 --background:#528265;
 --color:white;
 --box-shadow: none;
 --border-style:none;
 --border-color:none;
 --border-radius: 0;
}
</style>