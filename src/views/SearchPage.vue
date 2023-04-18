<template>
<layout-component :title="title" :back="back">
<ion-toolbar>
<span slot="start" style="padding-left:10px;">
<ion-icon :icon="search"></ion-icon>
</span>
<ion-title style="font-size:18px;font-weight:normal;">
    <ion-input label="Search for dependent..." placeholder="Search for dependent..."></ion-input>
</ion-title>
</ion-toolbar>
Some information


</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonTitle, IonToolbar, IonIcon, IonInput} from '@ionic/vue';
import { search } from 'ionicons/icons';

export default {
components:{
LayoutComponent,
IonTitle,
IonToolbar,
IonIcon,
IonInput

},
data(){return{
title:'Search',
back:'/send-money',



}},


setup(){return{
search,
}}







}
</script>