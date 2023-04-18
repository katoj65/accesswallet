<template>
<layout-component :title="title" :back="back">
<div>
<ion-toolbar>
<span slot="start" @click="$router.push('/search')">
<ion-icon :icon="search" style="padding-left:10px;"></ion-icon>
<span style="margin-left:10px;">Search....</span>
</span>
</ion-toolbar>
</div>





<div v-if="isLoading==false" style="margin-top:2px;">
<div v-if="response.length>0">
<ion-item  lines="full" v-for="d in response" :key="d.id">
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>
<h4 style="text-transform:capitalize;font-weight:bold;font-size:18px;">
{{ d.names }}
</h4>
<p style="text-transform:capitalize;padding-top:5px;color:gray;">{{ d.relationship }} <ion-icon :icon="ellipse" style="font-size:7px;"></ion-icon> {{ d.telephone }} </p>
</ion-label>
<span slot="end">
<ion-button @click="select_item(d)">Send</ion-button>
</span>
</ion-item>
</div>
<div v-else>
No Dependent
</div>

<div style="height:200px;">
</div>
</div>
<div v-else style="padding:20px;">
<skeleton-component/>
</div>














<div style="position:fixed;bottom:0;width:100%;z-index:10000;padding:0;">
<ion-footer style="border-top:solid thin #53986E;border-radius:0px 0px 0px 0px;padding:10px; box-shadow: 0 0 5px 0px silver;background:white;" class="ion-no-border">
<ion-toolbar>





<div>
<ion-fab style="margin-top:20px;z-index:position:absolute;right:0;">
<ion-fab-button @click="submit()">
<ion-icon :icon="sendSharp" style="font-size:15px;"></ion-icon>
</ion-fab-button>
</ion-fab>
<ion-item>
<ion-input ref="input" type="number" placeholder="Enter amount to be sent" style="margin-right:70px;padding-left:50px;border-bottom:solid thin #D6DBDF;" v-model="form.amount"></ion-input>
</ion-item>


<div style="padding-top:10px;"  v-if="dependent!=null">
<div>
<strong style="padding-left:20px;">
Sending Money to {{ dependent.relationship }}
</strong>
</div>
<div>
<ion-chip style="margin-left:10px;margin-top:10px;" color="medium">
<ion-avatar>
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label style="text-transform:capitalize;"><span style="font-weight:bold;">{{ dependent.names }}</span> . {{ dependent.telephone }}</ion-label>
<ion-icon :icon="closeOutline" color="primary" @click="clear()"></ion-icon>

</ion-chip>
</div>
<div v-if="isFilled==true && message!=null">
  <ion-chip color="danger">Fill in the amount field. </ion-chip>
  </div>
</div>
<div v-else-if="recipient==true">
<ion-item>
<ion-input type="number" placeholder="Enter recipient number" v-model="form.telephone" style="margin-right:70px;border-bottom:solid thin #D6DBDF;margin-bottom:10px;"></ion-input>
</ion-item>
<div v-if="isFilled==true && message!=null">
<ion-chip color="danger">{{ message }} </ion-chip>
</div>
</div>
</div>



</ion-toolbar>
</ion-footer>
</div>



<loader-popup-component :message="'Loading...'" v-if="isFormloading==true"/>

</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonButton,IonToolbar, IonItem,IonLabel, IonAvatar, IonInput, IonFooter,
IonChip,
IonIcon,
IonFab,
IonFabButton,

} from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import Dependent from '../models/dependents.js';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import {send,closeOutline, search, sendSharp, closeSharp, addSharp,ellipse } from 'ionicons/icons';
import SendMoney from '@/models/send.js';
import LoaderPopupComponent from '@/components/LoaderPopupComponent.vue';




export default {
components:{
LayoutComponent,
IonButton, IonToolbar,
IonItem,IonLabel,IonAvatar,IonInput,
SkeletonComponent,IonFooter,
IonIcon,
IonChip,
IonFab,
IonFabButton,
LoaderPopupComponent,


},
data(){return{
title:'Send Money',
back:'/',
isLoading:false,
response:[],
dependent:null,
searching:null,
recipient:true,
inserted:null,
message:null,
isFormloading:false,
isFilled:false,
isSuccess:false,

//form
form:{
amount:'',
telephone:'',
dependentID:'',
userID:'',
balance:'',
type:'',
}





}},

methods:{
//payload
async payload(){
this.isLoading=true;
await Preferences.get({key:'user_session'}).then(user=>{
const id=JSON.parse(user.value).id;
const model=new Dependent;
model.list(id).then(dependents=>{
this.isLoading=false;

console.log(dependents);
this.response=dependents.data;


}).catch(err=>{
console.log(err);
});

}).catch(error=>{
console.log(error);
});


},

select_item(row){
this.dependent=row;
this.recipient=false;
this.form.telephone=row.telephone;
this.form.dependentID=row.id;
this.form.type='wallet';

},

clear(){
this.dependent=null;
this.recipient=true;
this.form.dependentID='';
this.form.telephone='';
this.form.amount='';
},

new_recipient(){
this.dependent=null;
this.recipient=true;
this.form.type='mobile money';

},





//submit
async submit(){
this.isFilled=false;
if(this.form.amount!='' && this.form.telephone!=''){
this.isFormloading=true;
await Preferences.get({key:'user_session'}).then(user=>{
const id=JSON.parse(user.value).id;
this.form.userID=id;
const model=new SendMoney;
//get balance
model.get_balance(id).then(bal=>{
if(bal.status==200){
bal.data.forEach(element=>{
this.form.balance=element.amount;
});

//check balance.
if(this.form.balance>=this.form.amount){
//prepare balance.
const balance=this.form.balance-this.form.amount;
//update.
model.update_balance({'amount':balance},id).then(response=>{
if(response.status==200){
response.data.forEach(el=>{
this.form.balance=el.amount;
});

this.message='Success';
//reset form fields.
this.form.dependentID='';
this.form.amount='';
this.form.telephone='';
this.isFormloading=false;
this.clear();
}else{
console.log('internet connection error.');
}
}).catch(e2=>{console.log(e2)});
}else{
this.message='You have low credit on your account.';
}

}else{
console.log('internet connection error.');
}
}
).catch(e1=>{console.log(e1)});
}).catch(err=>{console.log(err)});
}else{
this.message='Fill in all fields';
this.isFilled=true;
}

}







}
,


mounted(){
this.payload();
},

setup(){
return{
send,
closeOutline,
search,
sendSharp,
closeSharp,
addSharp,
ellipse
}
}





}
</script>

<style scoped>
ion-input{
border:none;
}

ion-button{
--background:white;
--color:gray;
--box-shadow: none;
--border-radius: 5px;

--padding:15px;
height: 35px;

}
ion-button .list{
--border-radius: 5px;
--border-color: #D6DBDF;
--border-style: solid;
--border-width: thin;
}

ion-fab-button {
--background: #528265;
--background-activated: #528265;
--background-hover: #528265;
--box-shadow: none;
--color: white;
  }

ion-item{
border:none;
}


</style>