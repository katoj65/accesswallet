<template>
<layout-component>
<exchange-rate></exchange-rate>

<div>
<ion-grid>
<ion-row>
<ion-col v-for="m in menu" :key="m.id" size="4">
<ion-card style="margin:0; border-radius:5px;" button>
<ion-card-header>
<ion-card-subtitle style="text-align:center;">
<!-- <ion-icon :icon="gridSharp" size="big" style="font-size:30px;color:#528265;"></ion-icon> -->
<ion-avatar style="height:30px;padding:0;margin:0;text-align:center;width:100%;">
  <img alt="Icon" :src="m.icon" style="width:30px;height:30px;"/>
</ion-avatar>
</ion-card-subtitle>
</ion-card-header>
<ion-card-content style="margin-top:-15px;">
<h4 style="text-align:center;font-size:15px;color:#528265;font-weight: bold;">{{ m.item }}</h4>
</ion-card-content>
</ion-card>
</ion-col>
</ion-row>

</ion-grid>
</div>





</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import ExchangeRate from '@/components/ExchangeRate.vue';
import {IonGrid, IonRow, IonCol,IonCard, IonCardContent, IonCardSubtitle, IonCardHeader,IonAvatar} from '@ionic/vue';
// import {gridSharp} from 'ionicons/icons';
export default {
components:{
LayoutComponent,
ExchangeRate,
IonGrid,
IonRow,
IonCol,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonAvatar,

},
data(){return{
item:import.meta.env,
}},



computed:{
menu(){
const menu=[
{id:1,item:'Utilities',icon:'../../assets/icon/utility.png',url:'utility'},
{id:2,item:'Bills',icon:'../../assets/icon/bills.png',url:'bill'},
{id:3,item:'Shopping',icon:'../../assets/icon/shop.png',url:'shopping'},
{id:4,item:'Hotels',icon:'../../assets/icon/hotel.png',url:'hotel'},
{id:5,item:'Schools',icon:'../../assets/icon/tuition.png',url:'school'},
{id:6,item:'Medical',icon:'../../assets/icon/medical.png',url:'medical'},
{id:7,item:'Events',icon:'../../assets/icon/event.png',url:'events'},
{id:8,item:'Insurance',icon:'../../assets/icon/insurance.png',url:'insurance'},
{id:9,item:'Banks',icon:'../../assets/icon/bank.png',url:'bank'},
{id:10,item:'Travel',icon:'../../assets/icon/travel.png',url:'travel'},
{id:11,item:'Property',icon:'../../assets/icon/property.png',url:'property'},
{id:12,item:'Schedule',icon:'../../assets/icon/schedule.png',url:'schedule'},

];

return menu;

},


//









},


setup(){return{
// gridSharp


}},











}
</script>

<style scoped>
ion-card{
box-shadow: none;
border:solid thin #528265;
box-shadow: 0px 0px 3px #D6DBDF;


}
  ion-avatar {
    --border-radius: 4px;
  }
</style>
