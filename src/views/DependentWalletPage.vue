<template>
<dialog-layout :title="title" :back="back" :subtitle="subtitle">
<div v-if="isLoading==false">
<ion-item lines="none">
<ion-label style="font-weight:bold;">
Wallet Information
</ion-label>
</ion-item>
<ion-item v-for="n in 30" :key="n" lines="none">
<ion-label>
Multi-line text that should wrap when it is too long
to fit on one line. Lorem ipsum dolor sit amet,
consectetur adipiscing elit.
</ion-label>
</ion-item>

</div>
<div v-else style="padding:20px;">
<skeleton-component/>
</div>
</dialog-layout>
</template>
<script>

import { Preferences } from '@capacitor/preferences';
import DialogLayout from '@/components/DialogLayout.vue';
import Dependent from '@/models/dependents';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import { IonItem, IonLabel } from '@ionic/vue';
export default {
components:{
DialogLayout,
SkeletonComponent,
IonItem, IonLabel
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





}
</script>