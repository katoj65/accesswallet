<template>
<ion-item detail="true" button v-for="l in list" :key="l.title" lines="none">
<ion-label>
<h3>{{ l.title }} </h3>
<p>
{{ l.description }}
</p>
</ion-label>
</ion-item>
</template>

<script>
import { IonItem, IonLabel } from '@ionic/vue';
import { caretForwardOutline } from 'ionicons/icons';
export default{
components: { IonItem, IonLabel },
setup() {
return {
caretForwardOutline,
};
},

props:{
list:{}
}




};
</script>