<template>
<ion-page>
<ion-header class="ion-no-border">
<ion-toolbar>
<ion-buttons slot="start" style="padding-left:10px;">

<!------->
<ion-button v-if="back!=null" @click="$router.push(back)">
<ion-icon slot="start" :icon="arrowBack" style="font-size:25px;color:#528265"></ion-icon>
</ion-button>
<ion-icon slot="start" :icon="wallet" v-else style="font-size:25px;color:#528265"></ion-icon>
<!-------->
</ion-buttons>


<ion-title style="font-weight:bolder;text-align:center;">
{{ page_title}}
</ion-title>


<ion-buttons slot="end">
<ion-button>
<ion-icon :icon="wallet" style="font-size:25px;color:#528265"></ion-icon>
</ion-button>
<ion-button>
<ion-icon :icon="ellipsisVerticalSharp" style="font-size:25px;color:#528265"></ion-icon>
</ion-button>
</ion-buttons>
</ion-toolbar>
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
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import {
analyticsSharp,
arrowBack,
create, ellipsisHorizontal, ellipsisVertical,
ellipsisVerticalSharp,
helpCircle,
listSharp,
logoTableau,
notifications,
person,
personCircle,
search,
star,
wallet
} from 'ionicons/icons';
// import ProfileHeaderComponent from '@/components/ProfileHeaderComponent.vue';
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
// ProfileHeaderComponent

},
props:{
title:{},
back:{},


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
--background:white;
--color: black;
--min-height: 40px;
--padding-top: 10px;
--padding-bottom: 10px;
}

ion-content::part(background) {
background:white;
}

ion-content::part(scroll) {

}
ion-content::part(native) {
background:white;
}
</style>

