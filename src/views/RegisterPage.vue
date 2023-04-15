<template>
<ion-page>
<ion-content>
<div style="padding:20px;">
<div style="text-align:center;">
<img :src="'../../assets/icon/logo1.png'" style="width:200px;">
</div>

{{ error_message }}


<form @submit.prevent="submit">
<h3 style="text-align:center;">Register</h3>

<div style="padding-left:20px;padding-right:20px;" class="form-field">
<ion-input placeholder="Enter First Name" class="custom" v-model="form.firstname"></ion-input>
</div>

<div style="padding-left:20px;padding-right:20px;" class="form-field">
<ion-input placeholder="Enter Last Name" class="custom" v-model="form.lastname"></ion-input>
</div>


<div style="padding-left:20px;padding-right:20px;" class="form-field">
<ion-input placeholder="Enter Email Address" class="custom" v-model="form.email"></ion-input>
</div>
<div style="padding-left:20px;padding-right:20px;" class="form-field">
<ion-input placeholder="Enter Passwowrd" class="custom" type="password" v-model="form.password"></ion-input>
</div>
<div style="padding:20px;padding-top:10px;">



<ion-button expand="block" fill="clear" class="login_button" type="submit" v-if="isLoading==false">
<span>Register</span>
</ion-button>
<ion-button expand="block" fill="clear" class="login_button" disabled v-else>
<ion-spinner name="crescent"></ion-spinner>
</ion-button>



</div>
</form>
<div style="padding:20px;padding-top:0;" >
<ion-button expand="block" class="signup_button" fill="clear" @click="$router.push('/login')">
Login
</ion-button>
</div>
</div>
</ion-content>
</ion-page>
</template>
<script>
import { createClient } from '@supabase/supabase-js';
import { IonInput, IonButton,IonPage, IonContent, IonSpinner } from '@ionic/vue';
export default {
components:{
IonInput,
IonButton,
IonPage,
IonContent,
IonSpinner

},

data(){return{
title:'register',
error_message:null,
isLoading:false,
response:null,
error:null,
form:{
firstname:'Joshua',
lastname:'Kato',
email:'katoj65@gmail.com',
password:'123456789'
}

}},
methods:{
submit(){
this.isLoading=true;
const supabase = createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
//signup








supabase.auth.signUp({
email:this.form.email,
password:this.form.password,
options:{
data:{
firstname:this.form.firstname,
lastname:this.form.lastname,
}
}
}).then(response=>{
this.isLoading=false;
const errors=response.error;
const data=response.data;
this.error=errors;
// const email=response.data.user.email;
// if(email===this.form.email){
// this.response=email;
// }else{
// this.response=response.data.user;
// }

if(errors==null){
this.error_message=data.user;
const session=supabase.auth.getUser();
console.log(session);


}else{
this.error_message='You have already submitted your details.';
}

console.log(errors);



}).catch(error=>{
this.isLoading=false;
console.log(error);
});









}


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

.form-field{
margin-top:20px;
margin-bottom:20px;
}

 ion-content {
  --background:#528265;
    --color: #fff;
  }

</style>