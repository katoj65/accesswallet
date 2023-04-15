<template>
<div>
<ion-button expand="block" fill="clear" class="login_button" type="submit" v-if="isLoading==false">
<span>{{title}} </span>
</ion-button>
<ion-button expand="block" fill="clear" class="login_button" disabled v-else>
<ion-spinner name="crescent"></ion-spinner>
</ion-button>

    </div>
</template>

<script>
import {IonButton, IonSpinner} from '@ionic/vue';
export default {
    components:{
IonButton,IonSpinner
    },
props:{
isLoading:{},
title:{}
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