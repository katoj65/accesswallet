<template>
<div style="width:100%;">
<ion-skeleton-text :animated="true" style="width: 100%;margin-bottom:10px;"></ion-skeleton-text>
<ion-skeleton-text :animated="true" style="width: 80%;margin-bottom:10px;"></ion-skeleton-text>
<ion-skeleton-text :animated="true" style="width: 60%;margin-bottom:10px;"></ion-skeleton-text>
</div>
</template>
<script>
import {IonSkeletonText,} from '@ionic/vue';
export default {
components:{
IonSkeletonText
},
}
</script>
<style scoped>
ion-skeleton-text {
--border-radius: 9999px;
--background: white;
--background: white;
--color:white;
  }
</style>