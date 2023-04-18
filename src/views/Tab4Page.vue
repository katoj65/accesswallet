<template>
<layout-component :title="title">
<div v-if="isLoading==false">
<div>
<div v-if="response.length>0">
<ion-item button v-for="m in response" :key="m.id" detail="true" lines="full" style="border-bottom:none;">
<ion-icon :icon="images" slot="start"></ion-icon>
<ion-label>
<h4 style="color:#5D6D7E;font-size:18px;text-transform:capitalize;">{{ m.name }}</h4>
</ion-label>
</ion-item>
</div>
<div v-else>
No content
</div>
</div>
</div>
<div v-else style="padding:20px;">
<skeleton-component></skeleton-component>
</div>
</layout-component>
</template>
<script>

import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonItem, IonLabel, IonIcon } from '@ionic/vue';
import {images} from 'ionicons/icons';
import { createClient } from '@supabase/supabase-js';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
export default {
components:{
LayoutComponent,
IonItem,
IonLabel,
IonIcon,
SkeletonComponent
},

data(){return{
title:'Buy Items',
isLoading:false,
response:[],


}},


computed:{
menu(){
const list=[];
return  list;
}



},

methods:{
async payload(){
this.isLoading=true;
const  supabase =  createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
await supabase.from('business_category')
.select('*').then(res=>{
this.isLoading=false;
// console.log(res.data);
this.response=res.data;
}).catch(error=>{
console.log(error);
});
}


},

mounted(){
this.payload();
},
setup(){
return{
images,

}
}






}
</script>
<style scoped>
ion-item::part(native) {
border-bottom: solid thin #EBEDEF;
}
</style>