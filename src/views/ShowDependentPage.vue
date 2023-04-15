<template>
<layout-component :title="title" :back="back">
<div style="min-height:600px;">
<div v-if="isLoading==false">
<div v-for="d in response" :key="d">
<div style="margin-top:-20px;padding-top:20px;">
<div style="text-align:center;padding-top:20px;background:white;">
<div><img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" style="width:70px;border-radius:100%;height:70px;" /></div>
<h4 style="text-transform:capitalize;">{{ d.names }} </h4>
<div>{{ d.telephone }}</div>
<div>
<ul>
<li>
<div @click="$router.push('/dependent-wallet/'+d.id)">
<div>
<ion-icon :icon="walletOutline" style="font-size:22px;"></ion-icon>
</div>
<div style="font-weight:bold; font-size:15px;padding-top:8px;">Wallet</div>
</div>
</li>
<li>
<div @click="$router.push('/dependent-schedule/'+d.id)">
<div>
<ion-icon :icon="calendarOutline" style="font-size:22px;"></ion-icon>
</div>
<div style="font-weight:bold; font-size:15px;padding-top:8px;">Schedule</div>
</div>
</li>
<li>
<div @click="$router.push('/dependent-send/'+d.id)">
<div>
<ion-icon :icon="send" style="font-size:22px;"></ion-icon>
</div>
<div style="font-weight:bold; font-size:15px;padding-top:8px;">Send</div>
</div>
</li>
</ul>
</div>
</div>

<div style="margin-top:-13px;">
<ion-item  lines="none" >
<ion-icon :icon="peopleOutline" slot="start"></ion-icon>
<ion-label style="text-transform:capitalize;">
{{ d.relationship }} </ion-label>
</ion-item>



<ion-item lines="none">
<ion-icon :icon="locationOutline" slot="start"></ion-icon>
<ion-label style="text-transform:capitalize;">
{{ d.address }}
</ion-label>
</ion-item>



<ion-item lines="none" detail="true">
<ion-icon :icon="cashOutline" slot="start"></ion-icon>
<ion-label>Shopping Vochour</ion-label>
</ion-item>

<ion-item lines="none" detail="true">
<ion-icon :icon="giftOutline" slot="start"></ion-icon>
<ion-label>Send Gift</ion-label>
</ion-item>


<ion-item lines="none" detail="true">
<ion-icon :icon="mailOutline" slot="start"></ion-icon>
<ion-label>Buy Items</ion-label>
</ion-item>

<ion-item lines="none" detail="true">
<ion-icon :icon="mailOutline" slot="start"></ion-icon>
<ion-label>Invitations</ion-label>
</ion-item>

<ion-item lines="none" detail="true">
<ion-icon :icon="mailOutline" slot="start"></ion-icon>
<ion-label>View Transactions</ion-label>
</ion-item>



</div>
<div>
</div>
</div>
</div>
</div>
<div v-else style="padding:20px;">
<skeleton-component/>
</div>
</div>
</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import Dependent from '@/models/dependents';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import { IonIcon,IonItem,IonLabel} from '@ionic/vue';
import {images, callOutline, peopleOutline,locationOutline, sendOutline, cashOutline,
mailOutline, walletOutline, calendarOutline, send, giftOutline} from 'ionicons/icons';
import SendMoney from '@/models/send.js';


export default {
components:{
LayoutComponent,
SkeletonComponent,
IonIcon,

IonItem,
IonLabel,






},
data(){return{
title:'Dependent',
back:'/dependents',
response:null,
isLoading:false,
amount:null,
//form
form:{
amount:null,
comment:null,
},

errors:{
amount:null,
},
//











}},


methods:{


async payload(){
this.isLoading=true;
const id=this.$route.params.id;
const model=new Dependent;
await model.show(id).then(response=>{
this.isLoading=false;
// console.log(response);
this.response=response.data;
}).catch(error=>{
console.log(error);
});







},




submit(){
this.errors.amount=this.form.amount==null?'* Field is required.':null;
if(this.form.amount==null){
const model=new SendMoney;
model.send();
}

},

setOpen(state,option){
this.modal.isOpen=state;
this.modal.name=option;
}


















},




mounted(){
this.payload();
},


setup() {
return {
images,
callOutline,
peopleOutline,
locationOutline,
cashOutline,
mailOutline,
sendOutline,
walletOutline,
calendarOutline,
send,
giftOutline

};
},







}
</script>



<style scoped>
ion-input{
border:none;
--placeholder-color:green;
--placeholder-opacity: .8;
}


ion-item {
--border-radius: 0px;
--margin-bottom:2px;


}

ul{
background:white;
height:70px;
}
ul li{
float:left;
margin:5px;
background:white;
list-style: none;
width:25%;
padding:5px;
}
</style>