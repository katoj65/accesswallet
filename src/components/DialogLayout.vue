<template>
<ion-page>
<ion-header class="ion-no-border">
<ion-toolbar>
<ion-title style="padding:0;">
<!-- {{ title==null?'title':title }} -->



<ion-chip style="background:none;height:45px;">
<ion-avatar style="width:40px;height:40px;">
<img src="https://ionicframework.com/docs/img/demos/avatar.svg" style="width:40px;height:40px;"/>
</ion-avatar>
<ion-label style="color:white;"><span style="font-size:19px;font-weight:bold;text-transform:capitalize;">{{ title }} </span>
<br/><div style="text-transform:capitalize;padding-top:5px;font-weight:normal;" v-if="title!=null">{{ subtitle }} </div>
</ion-label>
</ion-chip>



</ion-title>
<ion-buttons slot="end" v-if="back!=null" style="padding-right:10px;">
<ion-button @click="$router.push(back)" style="border:solid 1px white;border-radius:5px;">
Close
</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content>
<slot></slot>
</ion-content>
</ion-page>
</template>
<script >
import {IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons,
IonAvatar, IonChip, IonLabel

} from '@ionic/vue';
export default{
components:{IonPage, IonContent,IonHeader, IonTitle, IonToolbar, IonButton, IonButtons,
IonAvatar, IonChip, IonLabel


},
props:{
title:{},
subtitle:{},
back:{},
}


}




</script>

<style scoped>
ion-toolbar {
--background:#528265;
--color: white;
--min-height: 70px;
--padding-top: 10px;
--padding-bottom: 10px;
}

ion-content::part(background) {
background:#f6f8fc;
}

ion-content::part(scroll) {
}
</style>

