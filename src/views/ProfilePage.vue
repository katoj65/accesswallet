<template>
<layout-component :title="title" style="padding:0;" :back="back" :profile="user">

<!-- {{ response }} -->


<ion-item button v-for="m in menu" :key="m" lines="full" style="border-bottom:none;" @click="$router.push(m.url)">
<ion-icon :icon="images" slot="start"></ion-icon>
<ion-label>
<h4 style="color:#5D6D7E;font-size:18px;">{{ m.title }} </h4>
</ion-label>
<label slot="end" style="margin-right:20px;color:silver;font-size:18px;">
{{ m.description }}
</label>
</ion-item>




</layout-component>
</template>
<script>

import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonItem, IonLabel, IonIcon } from '@ionic/vue';
import {images} from 'ionicons/icons';
import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

export default {
components:{
LayoutComponent,
 IonItem,
 IonLabel,
 IonIcon
},

data(){return{
title:'Profile',
back:'/',
response:[],
isLoading:false,
user:null,

}},



setup(){return{
images

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
async res(){
this.isLoading=true;
const  supabase =  createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
await supabase
.from('profile')
.select('*')
.eq('userID',1)
.then(res=>{
this.isLoading=false;
this.response=res.data;
const status=res.status;
// console.log(status);
if(status==200){

// console.log(status);
//get user session
Preferences.get({ key: 'user_session' }).then(res=>{
const i=res.value;
this.user=i;
// console.log(JSON.parse(i));

}).catch(error=>{
console.log(error);
});


}else{
this.$store.state.errorr='Check your internet connection.';
}
}).catch(error=>{
console.log(error);
})


}



},
mounted(){
this.res();
}






}
</script>

<style scoped>

ion-item::part(native) {
border:none;
border-bottom: solid thin #EBEDEF;
}


</style>