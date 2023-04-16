<template>
<ion-app class="bg">
<div style="padding:10px;z-index:10000000;margin-bottom:0px;position:fixed;bottom:0;width:100%;background:red;" v-if="$store.state.error!=null">{{ $store.state.error }}</div>
<ion-router-outlet/>
</ion-app>
</template>
<script>
import { Preferences } from '@capacitor/preferences';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
export default{
components:{
IonApp,
IonRouterOutlet,
},

data(){return{
isLoading:false,
session:{
uid:null,
username:null,
email:null,
}

}},

methods:{
get_uid(){

// Preferences.clear();
const item = Preferences.get({ key: 'uid' });
this.isLoading=true;
item.then(res=>{
this.isLoading=false;
//
this.session.uid=res.value;
if(this.session.uid!=null){
//get username.
const get_username = Preferences.get({ key: 'username' });
get_username.then(response1=>{this.session.username=response1.value;}).catch(error1=>{console.log(error1)});
//get email address
const get_email=Preferences.get({key:'email'});
get_email.then(response2=>{this.session.email=response2.value}).catch(error2=>{console.log(error2)});
}else{
// this.$router.push('/login');
}
}).catch(error=>{
console.log(error);
});
},

//ion session
session_method(){
const uid = Preferences.get({ key: 'uid' });
this.test=uid;
},

//user session
async user_session(){
await Preferences.get({key:'user_session'}).then(response=>{
const str=JSON.parse(response.value)
this.$store.state.useID=str.id;
// console.log(this.$store.state.useID);
}).catch(error=>{
console.log(error);
});
}







},











mounted(){
this.get_uid();
this.session_method();
this.user_session();
}














}
</script>
<style>
.bg{
background:#528265;
color:white;
}

ion-item{
font-size:18px;
margin-bottom: 2px;
}

ion-footer{
border-top:#528265;
box-shadow:none;
}



</style>