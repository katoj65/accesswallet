<template>
<layout-component :title="title">
<div v-if="isLoading==false">
<div class="container">
<ion-card style="background:#53986E;border:solid thin white;border-radius:15px;" v-if="isLoading==false">
<ion-card-header>
<ion-card-title style="color:white;">Card No: 12345678 </ion-card-title>
<ion-card-subtitle style="color:white;">Names: <ion-note style="color:white;margin-left:10px;font-size:18px;">{{ names }} </ion-note> </ion-card-subtitle>
</ion-card-header>
<ion-card-content>
<span style="font-size:20px;font-weight:bold;">SHS. {{ amount }}</span>
<span tyle="float:right;width:100%;">

</span>
</ion-card-content>
</ion-card>
</div>

<div v-if="isLoading2==false">
<ion-list  lines="full" >
<ion-list-header>
<ion-label style="font-weight:bold;font-size:18px;">Transaction Details
</ion-label>
</ion-list-header>
<ion-item v-for="t in transactions" :key="t.id">
<ion-label>{{ t.title }} </ion-label>
<ion-label>
{{ t.description }}
</ion-label>
</ion-item>

</ion-list>
</div>

<div v-else style="padding:20px;">
<skeleton-component/>
</div>

</div>
<div v-else style="padding:20px;">
<skeleton-component/>
</div>


</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
IonCardTitle ,IonItem, IonLabel, IonList, IonListHeader} from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import { createClient } from '@supabase/supabase-js';
import SkeletonComponent from '@/components/SkeletonComponent.vue';

export default {
components:{
LayoutComponent,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
IonItem,
IonLabel,
IonList,
IonListHeader,
SkeletonComponent,


},

data(){return{
title:'Wallet',
names:null,
number:null,
amount:null,
transactions:[],
isLoading:false,
isLoading2:false,

}},


methods:{
async payload(){
this.isLoading=true;
await Preferences.get({key:'user_session'}).then(user_res=>{
const user=JSON.parse(user_res.value);
const  supabase =  createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
supabase.from('wallet')
.select('*')
.eq('userID',user.id)
.then(response=>{
//

this.names=user.firstname+' '+user.lastname;
this.number=user.id;

if(response.data!=null){
this.isLoading=false;
if(response.data.length>0){
response.data.forEach(element => {
this.amount=element.amount;
});
}else{
this.amount=0;
}
}else{
this.isLoading=true;
this.$store.state.error='Network connection error.';
}

this.isLoading2=true;
// transaction log
supabase.from('transaction').select('*').eq('userID',user.id).then(res=>{
this.isLoading2=false;
this.transactions=res.data;
}).catch(error=>{
console.log(error);
});
}).catch(error=>{
console.log(error);
});







}).catch(error=>{
console.log(error);
});



}




},

mounted(){
this.payload();
}










}
</script>
<style scoped>
ion-card{
box-shadow: none;
 --background:#528265;
 --color:white;
 border:solid thin white;
}
.container{
 background:#528265;
 margin:0;
 padding:10px;

}
</style>