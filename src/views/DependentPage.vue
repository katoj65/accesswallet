<template>
<layout-component :title="title" :back="back">
<div v-if="isLoading==false">
<div v-if="response.length>0">
<ion-item v-for="u in response" :key="u.id" lines="full" @click="$router.push('/dependent/'+u.id)">
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
</div>
<div v-else style="padding:20px;">
<skeleton-component/>
</div>


<ion-fab slot="fixed" vertical="bottom" horizontal="end">
<ion-fab-button @click="$router.push('/dependent/create')">
<ion-icon :icon="add"></ion-icon>
</ion-fab-button>
</ion-fab>
</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import Dependent from '../models/dependents.js';
import { Preferences } from '@capacitor/preferences';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import { IonAvatar, IonItem, IonLabel, IonButton,IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import connect from '@/models/connect_supabase.js';

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
IonIcon
},

data(){return{
title:'Dependents',
back:'/profile',
response:[],
test:null,
isLoading:false,
userID:null,
test1:null,

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
}








},

mounted(){
this.list();
this.update_list();
},






setup(){return{
add
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
margin-bottom:2px;
}

</style>