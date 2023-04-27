<template>
<layout-component :title="title">
<div v-if="isLoading==false">
<div v-if="response.length>0">
<ion-item v-for="u in response" :key="u.id" lines="full" @click="open(u)">
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>
<h4 style="text-transform:capitalize;font-weight:bold;font-size:18px;">{{ u.names }}</h4>
<p style="text-transform:capitalize;padding-top:5px;">{{ u.relationship }} . {{ u.telephone }} </p>
</ion-label>
<span slot="end">
<ion-button>Send</ion-button>
</span>
</ion-item>
</div>
<div v-else>
<p style="text-align:center;">
No dependents available
</p>
</div>
<div style="height:100px;"></div>
</div>
<div v-else style="padding:20px;">
<skeleton-component/>
</div>


<ion-fab slot="fixed"  horizontal="end" style="position:fixed;bottom:0;right:0;margin-right:10px;margin-bottom:10px;">
<ion-fab-button @click="$router.push('/dependent/create')">
<ion-icon :icon="add"></ion-icon>
</ion-fab-button>
</ion-fab>


























<ion-modal :is-open="isOpen" @willDismiss="close_send_money_model()">
<ion-header class="ion-no-border" style="position:fixed;width:100%;">
<ion-toolbar>
<ion-buttons slot="start">
<span style="padding:5px;" button>
<ion-icon :icon="arrowBackOutline"  @click="close_send_money_model()" style="font-size:25px;color:#528265;padding:5px;"></ion-icon>
</span>
</ion-buttons>
<ion-title style="text-align:center;">
Send money
</ion-title>
<ion-buttons slot="end">

<ion-icon :icon="listSharp"  @click="mode=true" style="font-size:25px;color:#528265;padding:10px;" v-if="mode==false"></ion-icon>

<ion-icon :icon="send"  @click="mode=false" style="font-size:25px;color:#528265;padding:10px;" v-if="mode==true"></ion-icon>

<ion-icon :icon="ellipsisVertical"  @click="close_send_money_model()" style="font-size:25px;color:#528265;padding:10px;"></ion-icon>

</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content v-if="sentToContact!=null">


<ion-card style="margin:0; box-shadow:none;border-radius:0;padding-top:60px;border-bottom:solid 1px #F2F3F4">
<div style="text-align:center;">
<ion-avatar style="text-align:center;width:70px;height:70px;margin-left:39%;margin-right:37%;">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
</div>
<ion-card-header style="text-align:center;">
<ion-card-title style="text-transform:capitalize;font-weight:bold;">{{ sentToContact.names }} </ion-card-title>
<ion-card-subtitle><span style="text-transform:capitalize;">{{ sentToContact.relationship }}</span> . {{ sentToContact.telephone  }} </ion-card-subtitle>
</ion-card-header>
<ion-card-content>
</ion-card-content>
</ion-card>







<div v-if="mode==false">
<form style="background:white;padding:10px; border-bottom:solid 1px #F2F3F4;" @submit.prevent="submit">
<ion-item style="border:none;margin:0;" lines="none" v-if="message!=null">
<ion-label style="color:red;">{{ message }} </ion-label>
</ion-item>



<ion-item lines="none">
<!-- <ion-label>Enter amount to be sent</ion-label> -->
<div style="width:100%;padding:10px;margin-bottom:5px;background:#F4F6F7;border-radius:5px;">
<ion-input placeholder="Enter amount to be sent" style="padding:10px;margin-top:10px;margin:10px;" type="number" v-model="form.amount"></ion-input>
</div>
</ion-item>



<div style="padding:10px;padding-bottom:20px;">
<submit-button-2 :title="'Send'" :icon="true" ></submit-button-2>
</div>
</form>
<div>
<ion-list :inset="true" style="margin-top:1px;">
<ion-item lines="none" button detail="true">
<ion-icon slot="start" :icon="timerOutline" style="color:#528265;"></ion-icon>
<ion-label>Schedule Payment</ion-label>
</ion-item>
<ion-item lines="none"  button detail="true">
<ion-icon slot="start" :icon="wallet" style="color:#528265;"></ion-icon>
<ion-label>Deposit to user wallet</ion-label>
</ion-item>
<ion-item lines="none"  button detail="true">
<ion-icon slot="start" :icon="readerOutline" style="color:#528265;"></ion-icon>
<ion-label>Payment Log</ion-label>
</ion-item>
<ion-item lines="none"  button detail="true">
<ion-icon slot="start" :icon="cash" style="color:#528265;"></ion-icon>
<ion-label>My Wallet Balance</ion-label>
</ion-item>
</ion-list>
</div>
</div>









<!---List-->
<div v-else-if="mode==true">
<ion-list :inset="true" style="margin-top:0;">
<ion-item lines="none" button detail="true" v-for="n in 8" :key="n">
<ion-icon slot="start" :icon="cash" style="color:#528265;"></ion-icon>
<ion-label>Send Item</ion-label>
</ion-item>
</ion-list>
</div>









</ion-content>
</ion-modal>








<loader-popup-component v-if="formLoading==true" :message="'Sending...'"></loader-popup-component>
</layout-component>
</template>
<script>
import LoaderPopupComponent from '@/components/LoaderPopupComponent.vue';
import LayoutComponent from '@/components/LayoutComponent.vue';
import Dependent from '../models/dependents.js';
import { Preferences } from '@capacitor/preferences';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import {
IonAvatar,
IonItem,
IonLabel,
IonButton,
IonFab,
IonFabButton,
IonIcon,
IonModal,
IonHeader,
IonToolbar,
IonContent,
IonTitle,
IonButtons,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
IonInput,
IonList




} from '@ionic/vue';
import { add, arrowBackOutline, wallet, ellipsisVertical, cash, timerOutline,readerOutline,send,listSharp, } from 'ionicons/icons';
import connect from '@/models/connect_supabase.js';
import SubmitButton2 from '@/components/SubmitButton2.vue';
import SendMoney from '@/models/send.js';
import { Dialog } from '@capacitor/dialog';
import Notification from '@/models/notifications.js';


export default {
components:{
LayoutComponent,
SkeletonComponent,
IonAvatar,
IonItem,
IonLabel,
IonButton,
IonFab,
IonFabButton,
IonIcon,
IonModal,
IonHeader,
IonToolbar,
IonContent,
IonTitle,
IonButtons,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
IonInput,
SubmitButton2,
LoaderPopupComponent,
IonList

},

data(){return{

title:'Contacts',
response:[],
test:null,
isLoading:false,
userID:null,
test1:null,
isOpen:false,
sentToContact:null,
message:null,

//
form:{
amount:'',
balance:null,
userID:null,
contactID:null,

},
//
formLoading:false,
mode:false,

}},

methods:{
async list(){
this.isLoading=true;
await Preferences.get({key:'user_session'}).then(user=>{
const id=JSON.parse(user.value).id;
this.userID=id;
const model=new Dependent;
model.list(id).then(response=>{
const data=response.data;
if(data!=null){
this.isLoading=false;
console.log(response);
this.response=response.data;
}else{
this.$store.state.error='Network connection error.';
}
}).catch(error=>{
console.log(error);
});
}).catch((err) => {
console.log(err);
});
},





//
async dependents(){
Preferences.get({key:'user_session'}).then(user=>{
const id=JSON.parse(user.value).id;
const model=new Dependent;
model.lists(id).then(response=>{this.response=response.data}).catch(error=>{console.log(error)});
});
},

//
async update_list(){
await Preferences.get({key:'user_session'}).then(user=>{
const id=JSON.parse(user.value).id;
const supabase=connect();
supabase.channel('changes').on('postgres_changes',{
event:'INSERT',
schema:'public',
table:'dependent',
filter:'userID=eq.'+id,
},
response=>{
console.log(response.new)
this.response.push(response.new);
}
).subscribe();
});
},




//send button
send_button(row){
const id=row.id;
this.$router.push('/contact-send/'+id);
},


open(item){
this.isOpen=true;
this.sentToContact=item;
},

//close the send money modal
close_send_money_model(){
this.isOpen=false;
this.sentToContact=null;
this.form.amount='';
this.message=null;
this.mode=false;
},






//submit.
async submit(){
this.message=null;
if(this.form.amount!=''){
this.formLoading=true;
await Preferences.get({key:'user_session'}).then(user=>{
const id=JSON.parse(user.value).id;
this.form.userID=id;
this.form.contactID=this.sentToContact.id;
const model=new SendMoney;
//get balance.
model.get_balance(id).then(bal=>{
if(bal.status==200){
bal.data.forEach(element=>{
this.form.balance=element.amount;
console.log(this.form.balance);
});

//check balance.
if(this.form.amount<=this.form.balance){
//send funds.
const balance=this.form.balance-this.form.amount;
//send block.


//generate new balance
model.update_balance({'amount':balance},id).then(response=>{
if(response.status==200){
response.data.forEach(el=>{
this.form.balance=el.amount;
});


this.formLoading=false;
//message
Dialog.alert({title:'Successful',message:'You have sent '+this.form.amount+'/= to '+this.sentToContact.names});

//send a notification
const message='Yo have sent '+ this.form.amount+'/= to '+this.sentToContact.names+', '+this.sentToContact.telephone;
const not=new Notification;
not.create({
'userID':this.form.userID,
'title':'Money sent',
'description':message
});

this.form.amount='';


}else{
Dialog.alert({title:'Error',message:'Check your internet connection.'});
}
}).catch(error1=>{
 Dialog.alert({title:'Error',message:'Check your internet connection.'});
});




}else{

Dialog.alert({
title:'Failed',
message:'You have low balance on your account.'
});
this.formLoading=false;
}






}else{

this.message='Check your internet connection.';
Dialog.alert({
title:'Error',
message:'Check your internet connection.'
});

}
}).catch(err=>{
console.log(err);
Dialog.alert({
title:'Error',
message:'Check your internet connection.'
});
});



}).catch(error=>{
console.log(error);
});

}else{
this.message='Fill in the amount field.';

}

}








},

mounted(){
this.list();
this.update_list();
},






setup(){return{
add,arrowBackOutline,
wallet,
ellipsisVertical,
cash,
timerOutline,
readerOutline,
send,
listSharp,

}},








//computed properties.
computed:{
dependent_list(){
// this.list();
return null;
}





},





}
</script>

<style scoped>
ion-button{
--background:white;
--color:gray;
--font-size:20px;
box-shadow: none;
--box-shadow:none;
--border-radius: 5px;
--border-color: #D6DBDF;
--border-style: solid;
--border-width: thin;
}

ion-fab-button {
--background:#528265;
--background-activated: #87d361;
--background-hover: #a3e681;
--box-shadow: 0px 1px 2px 0px rgba(0,0,0,.3), 0px 1px 3px 1px rgba(0,0,0,.15);
--color: white;
}

ion-item{

}

ion-toolbar {
--background:white;
--color: black;
--min-height: 30px;
--padding-top: 0px;
--padding-bottom: 0px;

}

ion-content::part(background) {
background:white;
}

ion-button #save{
background: #93e9be;
}

ion-input{
--border-style: solid;
--border-width: 1px;
--border-color: #000;
--padding:20px;
}
</style>