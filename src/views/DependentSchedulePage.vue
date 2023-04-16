<template>
<dialog-layout :title="title" :subtitle="subtitle" :back="back">
<div style="border-radious:30px;">
<div v-if="isLoading==false">
<ion-card style="padding:0;margin:0;box-shadow:none;">
<ion-card-header>
<ion-card-title>Schedule Payment</ion-card-title>
</ion-card-header>

<ion-card-content style="text-align:center;padding-left:20px;margin-top:10px;">
<ion-datetime presentation="date" style="width:100%;border:solid 1px #E5E7E9;border-radius:20px;">
<!-- <span slot="title">Select a Reservation Date</span> -->

</ion-datetime>

<div style="padding:20px;text-align:center;">
    <ion-chip style="background:white;border:none;">
    <ion-icon :icon="peopleOutline" ></ion-icon>
    <ion-label style="font-size:16px;">No Dependent Scheduled</ion-label>
    </ion-chip>
    </div>
</ion-card-content>

</ion-card>
</div>
<div  v-else style="margin:20px;">
<skeleton-component/>
</div>
</div>


<ion-footer style="position:fixed;width:100%;bottom:0;border-top:solid thin #528265;" class="ion-no-border">
<ion-toolbar style="padding:10px;padding-top:7px;padding-bottom:7px;box-shadow:none;border:none;">
<ion-button fill="clear" expand="block" class="footer-button">
<ion-icon :icon="calendar" style="margin-right:10px;"></ion-icon>
Select Dates and Time </ion-button>
</ion-toolbar>
</ion-footer>

</dialog-layout>
</template>
<script>

import DialogLayout from '@/components/DialogLayout.vue';
import {IonChip,IonLabel, IonDatetime, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonFooter,  IonToolbar  } from '@ionic/vue';
import Dependent from '@/models/dependents';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import { calendar, peopleOutline} from 'ionicons/icons';
export default {
components:{
DialogLayout,
IonDatetime,
IonCard, IonCardContent, IonCardHeader, IonCardTitle,
IonButton,
SkeletonComponent,
IonIcon,
IonChip,IonLabel,
IonFooter,
IonToolbar

},

data(){return{
title:null,
subtitle:null,
back:null,
isLoading:false,
response:null,
names:null,
tel:null,
relationship:null,
id:null,




}},

methods:{
async payload(){
this.isLoading=true;
const id=this.$route.params.id;
const model=new Dependent;
await model.show(id).then(response=>{
this.isLoading=false;
// console.log(response);
response.data.forEach(element=>{
this.title=element.names;
this.subtitle=element.relationship+' . '+element.telephone;
this.relationship=element.relationship;
this.id=element.id;
this.tel=element.telephone;
this.back='/dependent/'+element.id;

});

}).catch(error=>{
console.log(error);
});
},


submit(){
const id=this.id;
alert(id);


}





},

mounted(){
this.payload();
},

setup(){return{
calendar,
peopleOutline
}}

}
</script>

<style scoped>
ion-datetime{
--font-size:10px;
}

ion-chip{
--padding:10px;
}

ion-toolbar{
--border:none;
--background:#528265;
}

ion-button {

    --border-color: white;
    --border-style: solid;
    --border-width: 1.6px;
}
</style>