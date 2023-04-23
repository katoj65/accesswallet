<template>
<layout-component :title="title" :back="back">
<ion-toolbar>
<span slot="start" style="padding-left:10px;">
<ion-icon :icon="search"></ion-icon>
</span>
<ion-title style="font-size:18px;font-weight:normal;">
<ion-input label="Search for dependent..." placeholder="Search for dependent..." @keyup="searching()" v-model="form.search"></ion-input>
</ion-title>
</ion-toolbar>




<div style="margin-top:2px;" v-if="response.length>0">
<ion-item v-for="u in response" :key="u.id" lines="none" @click="selected(u)">
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>

<h4 style="font-weight:bold;font-size:17px;text-transform:capitalize;">{{ u.names }}</h4>
<p style="color:gray;">
<span style="text-transform:capitalize;">{{ u.relationship }}</span>
.
<span>{{ u.telephone }}</span>
</p>
</ion-label>
<ion-button slot="end">
 Send
</ion-button>
</ion-item>
</div>
<div v-else style="padding:20px;text-align:center;color:gray;">
0 Item found
</div>

</layout-component>
</template>
<script>

import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonTitle, IonToolbar, IonIcon, IonInput, IonButton} from '@ionic/vue';
import { search } from 'ionicons/icons';
import Dependent from '@/models/dependents';
import { Preferences } from '@capacitor/preferences';
import { IonAvatar, IonItem, IonLabel } from '@ionic/vue';

export default {
components:{
LayoutComponent,
IonTitle,
IonToolbar,
IonIcon,
IonInput,
IonAvatar,
IonLabel,
IonItem,
IonButton,

},
data(){return{
title:'Search',
back:'/send-money',
form:{
search:null,
},
response:[],
item:null,

}},


setup(){return{
search,
}},


methods:{
async searching(){
const modal=new Dependent;
await Preferences.get({key:'user_session'}).then(user=>{
const uid=JSON.parse(user.value).id;
modal.search(this.form.search,uid).then(response=>{
console.log(response)
if(response.status==200){

this.response=response.data;

}else{
console.log('Poor internet connection.');
}


}).catch(error=>{
console.log(error);
});


}).catch(err=>{console.log(err)});

},



selected(item){
this.$store.state.search_dependent=item;
this.$router.push('/send-money');
}
,




},

mounted(){
this.$store.state.search_dependent=null;
}







}
</script>

<style scoped>
ion-button{
    --background:white;
    --color:gray;
    --box-shadow: none;
    --border-radius: 5px;

    --padding:15px;
    height: 35px;

    }
</style>