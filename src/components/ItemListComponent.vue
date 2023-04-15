<template>
<div>
<div v-if="list.length>0">
<ion-item button v-for="m in list" :key="m.id" detail="true" lines="full" style="border-bottom:none;">
<ion-icon :icon="images" slot="start"></ion-icon>
<ion-label>
<h4 style="color:#5D6D7E;font-size:18px;">{{ m.name }}</h4>
</ion-label>
</ion-item>
</div>
<div v-else>
No content
</div>
</div>
</template>

<script>
import { IonItem, IonLabel, IonIcon } from '@ionic/vue';
import {images} from 'ionicons/icons';
export default {
props:{
list:{}
},
components:{
IonItem, IonLabel, IonIcon
},
setup(){
return{
images,

}
}

}
</script>

<style>
ion-item::part(native) {
border-bottom: solid thin #EBEDEF;
}
</style>