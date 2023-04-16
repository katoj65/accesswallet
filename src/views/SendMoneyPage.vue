<template>
<layout-component :title="title" :back="back">
<div>
<ion-toolbar>
<ion-icon :icon="search" slot="start" style="padding-left:10px;"></ion-icon>
<ion-buttons slot="end">
<ion-button @click="new_recipient()"><ion-icon :icon="addSharp"></ion-icon> New</ion-button>
</ion-buttons>
<ion-input ref="input" type="search" placeholder="Search...."  ></ion-input>
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
<p style="text-transform:capitalize;padding-top:5px;">{{ d.relationship }} . {{ d.telephone }} </p>
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
<ion-footer style="border-top:solid thin #53986E;border-radius:10px 10px 0px 0px;padding:10px; box-shadow: 0 0 5px 0px silver;background:white;" class="ion-no-border">
<ion-toolbar>
<form>
<ion-item>

<span slot="end">
<ion-fab style="margin-left:-43px;margin-top:-30px;">
<ion-fab-button size="small" type="submit">
<ion-icon :icon="sendSharp" style="font-size:15px;"></ion-icon>
</ion-fab-button>
</ion-fab>
</span>

<ion-input ref="input" type="number" placeholder="Enter Amount to be Sent" style="margin-right:30px;"></ion-input>
</ion-item>
</form>

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

    <!--
    <ion-item lines="none">
    <ion-avatar slot="start">
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
    </ion-avatar>
    <ion-label>
    {{ dependent.names }}
    <p>{{ dependent.telephone }} </p>
    </ion-label>
    <ion-button slot="end" @click="clear()"><ion-icon :icon="closeOutline"></ion-icon></ion-button>
    </ion-item> -->
</div>
</div>
<div v-else-if="recipient!=null">
<ion-item>
<ion-input type="number" placeholder="Enter Recipient Number"></ion-input>
</ion-item>
</div>



</ion-toolbar>
</ion-footer>
</div>





</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonButton, IonButtons,IonToolbar, IonItem,IonLabel, IonAvatar, IonInput, IonFooter,
IonChip,
IonIcon,
IonFab,
IonFabButton,

} from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import Dependent from '../models/dependents.js';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import {send,closeOutline, search, sendSharp, closeSharp, addSharp} from 'ionicons/icons';
export default {
components:{
LayoutComponent,
IonButton, IonButtons, IonToolbar,
IonItem,IonLabel,IonAvatar,IonInput,
SkeletonComponent,IonFooter,
IonIcon,
IonChip,
IonFab, IonFabButton,
},
data(){return{
title:'Send Money',
back:'/',
isLoading:false,
response:[],
dependent:null,
searching:null,
recipient:null,



//form
form:{
amount:null,
tel:null,
dependentID:null,
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
this.recipient=null;
},

clear(){
this.dependent=null;
this.recipient=null;
},

new_recipient(){
this.dependent=null;
this.recipient=true;

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
addSharp
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
--border-color: #D6DBDF;
--border-style: solid;
--border-width: thin;


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

</style>