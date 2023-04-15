<template>
<div>
<ion-button fill="clear" style="border:solid 2px white;border-radius:5px;font-size:13px;color:white;">
Edit Profile
</ion-button>

</div>
</template>
<script>
import {IonButton } from '@ionic/vue';
export default {
components:{
IonButton,

}
}
</script>

<style scoped>
ion-button{
 --background:#528265;
 --color:white;
 --border-style:solid;
 --border-color:white;
box-shadow: none;

}
</style>