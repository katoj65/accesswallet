<template>
<ion-page>
<ion-content>
<div style="padding:20px;">
<div style="text-align:center;">
<img :src="'../../assets/icon/logo1.png'" style="width:200px;">
</div>



<form @submit.prevent="submit">
<h3 style="text-align:center;">Welcome</h3>

<div v-if="message!=null">
{{ message }}
</div>

<div style="padding-left:20px;padding-right:20px;">
<ion-input placeholder="Enter email address" class="custom" v-model="form.email"></ion-input>
</div>
<div style="padding-left:20px;padding-right:20px;margin-top:20px;">
<ion-input placeholder="Enter passwowrd" class="custom" type="password" v-model="form.password"></ion-input>
</div>
<div style="padding:20px;">
<submit-button :isLoading="isLoading" :title="'Login'"></submit-button>
</div>
</form>
<div style="padding:20px;padding-top:0;" >
<ion-button expand="block" class="signup_button" fill="clear" @click="$router.push('/register')">
Register
</ion-button>
</div>
</div>
</ion-content>
</ion-page>
</template>
<script>
import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';
import { IonInput, IonButton,IonPage, IonContent } from '@ionic/vue';
import SubmitButton from '@/components/SubmitButton.vue';


export default {
components:{
IonInput,
IonButton,
IonPage,
SubmitButton,
IonContent


},

data(){return{
title:'login',
message:null,
isLoading:false,
form:{
email:'katoj65@gmail.com',
password:'123456789'
}

}},
methods:{
submit(){
this.isLoading=true;
const supabase = createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
const signIn=supabase.auth.signInWithPassword({
email: this.form.email,
password: this.form.password,
});

//signIn.
signIn.then(response=>{
this.isLoading=false;
const error=response.error;

if(error==null){

const data=response.data;
const session=data.session;
if(session!=null){
//user details.

const user=data.user;
const uid=user.id;
const username=user.user_metadata.firstname;
const names =user.user_metadata.firstname+' '+user.user_metadata.lastname;
const user_email=user.email;

//generate user session information
const session_stringfy=JSON.stringify({id:uid,firstname:user.user_metadata.firstname,lastname:user.user_metadata.lastname,email:user.email});

//session.

Preferences.set({key: 'user_session',value:session_stringfy});
//get session
Preferences.get({ key: 'user_session' }).then(res=>{
const i=res.value;
// console.log(JSON.parse(i));
});

this.$router.push('/');

}else{
this.message='Invalid user email or password.';
}



}else{
this.$store.state.errorr='Check your internet connection.';
console.log(error);
}


}).catch(error=>{
this.message='An error has occured. Please try again.';
});



},


}





}
</script>

<style scoped>
p{color:white;}
h3{color:white;
margin-bottom:20px;}
ion-input.custom {
--background: white;
--color: black;
--placeholder-color:silver;
--placeholder-opacity: .8;

--padding-bottom: 15px;
--padding-end: 15px;
--padding-start: 15px;
--padding-top: 15px;
--margin-top:10px;
--margin-bottom:10px;
border-radius:10px;
text-align: center;
}

.login_button{
 --background:#145A32;
 --color:white;
--padding-top:25px;
--padding-bottom:25px;
--font-size:20px;
border-radius: 30px;

}

.signup_button{
 --background:#528265;
 --color:#003300;
 --border-style:none;
 --border-color:none;
--padding-top:25px;
--padding-bottom:25px;
--font-size:20px;
box-shadow: none;

}
 ion-content {
  --background:#528265;
    --color: #fff;
  }

</style>