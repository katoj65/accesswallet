<template>
<layout-profile :title="title" style="padding:0;" :back="back">
<ion-card style="padding:0;margin:0;border-radius:0;box-shadow:none;border-bottom:solid 1px #F2F3F4">
<ion-card-header>
<div>

</div>
<ion-card-title style="text-align:center;">
<div style="text-align:center;padding-left:42%;">
<ion-avatar>
<img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
</div>
<div style="margin-top:15px;">
{{ names }}
</div>
</ion-card-title>
<ion-card-subtitle style="text-align:center;">{{ email }} </ion-card-subtitle>
</ion-card-header>
<ion-card-content>
</ion-card-content>
</ion-card>













<div>
<ion-list :inset="true" style="margin-top:0;">
<ion-item button v-for="m in menu" :key="m" lines="full"  @click="$router.push(m.url)" detail="true">
<ion-icon :icon="images" slot="start"></ion-icon>
<ion-label>
<h4 style="color:#5D6D7E;font-size:18px;text-transform:capitalize;">{{ m.title }} </h4>
</ion-label>
<label slot="end" style="margin-right:20px;color:silver;font-size:18px;text-transform:capitalize;">
{{ m.description }}
</label>
</ion-item>
</ion-list>
</div>



</layout-profile>
</template>
<script>

import LayoutProfile from '@/components/LayoutProfile.vue';
import { IonItem, IonLabel, IonIcon,
IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
IonAvatar,
IonList

} from '@ionic/vue';
import {images,ellipsisVertical} from 'ionicons/icons';
import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

export default {
components:{
LayoutProfile,
IonItem,
IonLabel,
IonIcon,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
IonAvatar,
IonList
},

data(){return{
title:'Profile',
back:'/',
response:[],
isLoading:false,
user:null,
names:null,
email:null,


}},



setup(){return{
images, ellipsisVertical

}},

computed:{
menu(){
const list=[
{id:1, title:'Account Number',description:'1234567',url:'/'},
{id:2,title:'Dependents',description:'20 People',url:'/dependents'},
{id:3,title:'Businesses',description:'10',url:'/'},
{id:4,title:'Create Business',description:'',url:'/'},
{id:5,title:'Transactions',description:'',url:'/'},
{id:6,title:'Wallet',description:'',url:'/wallet'},

];


return list;
},


},

methods:{


async payload(){
await Preferences.get({key:'user_session'}).then(user=>{
const session=JSON.parse(user.value);
this.user=session;
this.names=session.firstname+' '+session.lastname;
this.email=session.email;



}).catch(error=>{
console.log(error);
});



},



},
mounted(){
this.payload();
}






}
</script>

<style scoped>

ion-item::part(native) {



}


</style>