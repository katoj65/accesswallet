<template>
<ion-loading :message="message" class="custom-loading"></ion-loading>
</template>
<script>
import { IonLoading } from '@ionic/vue'
export default {
    components:{
    IonLoading
    },
    props:{
    message:{}
    }
}
</script>
<style>
  ion-loading.custom-loading {
    --background: #e3edff;
    --spinner-color: #1c6dff;

    color: #1c6dff;
  }
</style>