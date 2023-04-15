<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" style="border-top:solid thin #53986E;">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="cash" style="color:#53986E" />
          <ion-label>Send</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="card" style="color:#53986E" />
          <ion-label>Pay</ion-label>
        </ion-tab-button>


        <ion-tab-button tab="tab4" href="/tabs/tab4">
          <ion-icon :icon="bagHandleSharp" style="color:#53986E"/>
          <ion-label>Buy</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="wallet" style="color:#53986E" />
          <ion-label>Wallet</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle,cash,bagHandleSharp,wallet,card } from 'ionicons/icons';
export default{
components:{
IonTabBar,
IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet


},

setup(){return{
ellipse,
square,
triangle,
cash,
bagHandleSharp,
wallet,card




}}




}




</script>
<style scoped>
ion-tab-bar{

}
</style>