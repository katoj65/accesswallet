<template>
<div v-if="menu.length>0">
<ion-item  v-for="m in menu" :key="m" lines="full" style="border-bottom:none;">
<ion-label>
<h4 style="color:#5D6D7E;font-size:18px;font-weight:bold;">{{ m.title }} </h4>
</ion-label>
<label slot="end" style="margin-right:-10px;color:silver;font-size:18px;">
{{ m.description }}
</label>
<span slot="end">
<ion-button slot="end" v-if="m.url!=null">
<ion-icon :icon="create"></ion-icon>
</ion-button>
<ion-button slot="end" v-else disabled class="no-border">
<ion-icon :icon="create"></ion-icon>
</ion-button>
</span>
</ion-item>
</div>
</template>
<script>
import { IonItem, IonLabel, IonIcon, IonButton } from '@ionic/vue';
import {create} from 'ionicons/icons';
export default {
components:{
IonItem,
IonLabel,
IonIcon,
IonButton
},

setup(){return{
create
}},

props:{
menu:{}
}
}
</script>
<style scoped>
ion-item::part(native) {
border:none;
border-bottom: solid thin #EBEDEF;
}
ion-button{
 --background:white;
 --color:#528265;
 --box-shadow: none;
 --border-style:none;
 --border-color:none;
}

ion-button .logout{


 --background:red;
 --color:#528265;
 --box-shadow: none;
 --border-style:none;
 --border-color:none;

}



</style>