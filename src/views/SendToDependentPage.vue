<template>
<dialog-layout :title="title" :back="back" :subtitle="subtitle">
<div v-if="isLoading==false" style="padding:0;">
<div>


<form style="background:white;padding:10px;margin-bottom:2px;" @submit.prevent="submit">
<ion-item  style="border-bottom:solid 2px #528265;">
<ion-label position="stacked" style="font-size:20px;margin-bottom:20px;color:#528265;font-weight:bold;font-size:22px;">Send Money </ion-label>
<ion-input ref="input" type="number" placeholder="Enter amount to be sent" v-model="form.amount" style="padding-bottom:10px;"></ion-input>
</ion-item>
<div style="padding:0;padding-top:10px;">
<ion-button expand="block" type="submit">
<ion-icon slot="start" :icon="send"></ion-icon>
Send Money</ion-button>
</div>
</form>








<ion-item v-for="m in menu" :key="m.id" button lines="none" detail="true">
<ion-icon slot="start" :icon="images"></ion-icon>
<ion-label style="text-transform:capitalize;">{{ m.name }} </ion-label>
</ion-item>










</div>
</div>
<div v-else style="padding:20px;">
<skeleton-component/>
</div>

</dialog-layout>
</template>
<script>
import DialogLayout from '@/components/DialogLayout.vue';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import { IonItem, IonLabel,IonInput,IonButton, IonIcon,} from '@ionic/vue';
import Dependent from '@/models/dependents';
import {images,send} from 'ionicons/icons';
export default {
components:{
DialogLayout,
SkeletonComponent,
IonItem,
IonLabel,
IonInput,
IonButton,
IonIcon,



},

data(){return{
title:null,
subtitle:null,
back:null,
isLoading:false,
response:null,
names:null,
tel:null,
relationship:null,
id:null,

form:{
amount:null,
},

//menu information
menu:[

{id:1,name:'Deposit to Wallet',icon:'',url:'wallet'},
{id:3,name:'Send Gift',icon:'',url:'gift'},
{id:4,name:'Shopping Vochour',icon:'',url:'shop'},
{id:5,name:'Schedule Payment',icon:'',url:'pay'},
{id:2,name:'view Transactions',icon:'',url:'transact'},


],


}},


methods:{
async payload(){
this.isLoading=true;
const id=this.$route.params.id;
const model=new Dependent;
await model.show(id).then(response=>{
this.isLoading=false;
// console.log(response);
response.data.forEach(element=>{
this.title=element.names;
this.subtitle=element.relationship+' . '+element.telephone;
this.relationship=element.relationship;
this.id=element.id;
this.tel=element.telephone;
this.back='/dependent/'+element.id;

});

}).catch(error=>{
console.log(error);
});
},


submit(){
const id=this.id;
alert(id);


}





},

mounted(){
this.payload();
},

setup(){return{
images,send
}}





}
</script>

<style  scoped>
ion-input{
border:none;
}

ion-button{
--box-shadow:none
}

ion-item{
font-size:18px;
margin-bottom: 2px;
}
</style>