<template>
<ion-alert :is-open="isOpen" :header="title"  :message="message"  :buttons="alertButtons"
@didDismiss="setOpen(true)" class="custom-alert"></ion-alert>
</template>

<script>
import { IonAlert } from '@ionic/vue';

export default {
components: { IonAlert},
props:{
title:{},
message:{},
redirect:{}

},

data(){return{
state:false,
alertButtons:[{text:'OK',
role:'confirm',
cssClass: 'alert-button-confirm',
handler:()=>{
if(this.redirect!=null){
this.$router.push(this.redirect);
}else{
return null;
}
}

}],
isOpen:false,
}},

methods:{
setOpen(isOpen){
if(this.isOpen==true){
this.isOpen=false;
}else{
this.isOpen=true;
}
},

},

mounted(){
this.setOpen(false);
}









};
</script>

<style>
  ion-alert.custom-alert {
    --backdrop-opacity: 0.7;
  }

  .custom-alert .alert-button-group {
    padding: 8px;
  }

  button.alert-button.alert-button-confirm {
    background-color:#528265;
    color: var(--ion-color-success-contrast);
  }

  .md button.alert-button.alert-button-confirm {
    border-radius: 4px;
  }

  .ios .custom-alert button.alert-button {
    border: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);
  }

  .ios button.alert-button.alert-button-cancel {
    border-right: 0;
    border-bottom-left-radius: 13px;
    border-top-left-radius: 13px;
  }

  .ios button.alert-button.alert-button-confirm {
    border-bottom-right-radius: 13px;
    border-top-right-radius: 13px;
  }
</style>