<template>
<ion-page>
<ion-header class="ion-no-border">
<ion-toolbar>
<ion-buttons slot="start" v-if="back!=null?back:'/tabs/tab3'">
<ion-button @click="$router.push(back)">
<ion-icon :icon="arrowBackSharp"></ion-icon>
</ion-button>
</ion-buttons>



<ion-title style="padding:0;">
<!-- {{ title==null?'title':title }} -->


<ion-chip style="background:none;height:45px;">
<ion-avatar style="width:40px;height:40px;">
<img src="https://ionicframework.com/docs/img/demos/avatar.svg" style="width:40px;height:40px;"/>
</ion-avatar>
<ion-label style="color:white;">
<div v-if="title!=null">
<span style="font-size:19px;font-weight:bold;text-transform:capitalize;">{{ title }} </span>
<br/>
<div style="text-transform:capitalize;padding-top:5px;font-weight:normal;" v-if="title!=null">{{ subtitle }} </div>
</div>
<div v-else style="min-width:100px;">
    <ion-skeleton-text :animated="true" style="width: 100%;margin-bottom:3px;border-radius:20px;"></ion-skeleton-text>
    <ion-skeleton-text :animated="true" style="width: 70%;margin-bottom:2px;border-radius:20px;"></ion-skeleton-text>
</div>

</ion-label>



</ion-chip>



</ion-title>
<ion-buttons slot="end" style="padding-right:10px;">
<ion-button style="padding:2px;">
<ion-icon :icon="chatbubbleEllipsesSharp" style="font-size:22px;"></ion-icon>
</ion-button>
<ion-button style="padding:2px;">
<ion-icon :icon="ellipsisVerticalSharp" style="font-size:22px;"></ion-icon>
</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content>
<slot></slot>
</ion-content>
</ion-page>
</template>
<script>
import { ellipsisVerticalSharp, chatbubbleEllipsesSharp, arrowBackSharp} from 'ionicons/icons';
import {
IonPage,
IonContent,
IonHeader,
IonTitle,
IonToolbar,
IonButton,
IonButtons,
IonAvatar,
IonChip,
IonLabel,
IonIcon,
IonSkeletonText,

} from '@ionic/vue';
export default{
components:{
IonPage,
IonContent,
IonHeader,
IonTitle,
IonToolbar,
IonButton,
IonButtons,
IonAvatar,
IonChip,
IonLabel,
IonIcon,
IonSkeletonText,


},
props:{
title:{},
subtitle:{},
back:{},
},


setup(){return{
ellipsisVerticalSharp,
chatbubbleEllipsesSharp,
arrowBackSharp



}}


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

ion-button{
--padding:0;
}
ion-icon{
--padding:0;
}
</style>

