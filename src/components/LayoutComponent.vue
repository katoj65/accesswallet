<template>
<ion-page>
<ion-header class="ion-no-border">
<ion-toolbar>
<ion-buttons slot="start" style="padding-left:10px;">

<!------->
<ion-button v-if="back!=null" @click="$router.push(back)">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
<ion-icon slot="start" :icon="wallet" v-else></ion-icon>
<!-------->
</ion-buttons>


<ion-title style="font-weight:bolder;">
{{ page_title}}
</ion-title>

<ion-buttons slot="end" v-if="page_title=='Profile'">
<ion-button @click="$router.push('/settings')">
<ion-icon slot="start" :icon="ellipsisVerticalSharp"></ion-icon>
</ion-button>
</ion-buttons>
<ion-buttons slot="end" v-else>
<ion-button @click="$router.push('/notifications')">
<ion-icon slot="start" :icon="notifications"></ion-icon>
</ion-button>
<ion-button @click="$router.push('/trade-forex')">
<ion-icon slot="start" :icon="analyticsSharp"></ion-icon>
</ion-button>
<ion-button @click="$router.push('/profile')">
<ion-icon slot="start" :icon="person"></ion-icon>
</ion-button>
</ion-buttons>
</ion-toolbar>
<profile-header-component v-if="page_title=='Profile'" :profile="profile"></profile-header-component>
</ion-header>
<ion-content :fullscreen="true" >
<ion-header collapse="condense">
<ion-toolbar>
<ion-title size="large">Tab 1</ion-title>
</ion-toolbar>
</ion-header>
<div style="margin-top:-10px;padding-top:10px;">
<slot></slot>
</div>
</ion-content>
</ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,IonButton, IonIcon} from '@ionic/vue';
import {analyticsSharp,logoTableau, create, ellipsisHorizontal, ellipsisVertical, helpCircle, search,
personCircle, star,person, listSharp, wallet, notifications, arrowBack, ellipsisVerticalSharp} from 'ionicons/icons';
import ProfileHeaderComponent from '@/components/ProfileHeaderComponent.vue';
export default {
components:{
IonPage,
IonHeader,
IonToolbar,
IonTitle,
IonContent,
IonButtons,
IonButton,
IonIcon,
ProfileHeaderComponent

},
props:{
title:{},
back:{},
profile:{}

},
data(){return{
item:null,




}},

setup() {
return { create, ellipsisHorizontal,
ellipsisVertical, helpCircle, search, personCircle,
star ,person,logoTableau,analyticsSharp,listSharp,
wallet, notifications,arrowBack,ellipsisVerticalSharp

};
},

computed:{
page_title(){
return this.title!=null?this.title:'Access Wallet';
},

}
}
</script>
<style scoped>
ion-toolbar {
--background:#528265;
--color: white;
--min-height: 80px;
--padding-top: 20px;
--padding-bottom: 20px;
}

ion-content::part(background) {
background:#f6f8fc;
}

ion-content::part(scroll) {

}
</style>

