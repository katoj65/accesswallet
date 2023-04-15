<template>
<div>
<ion-card style="margin:0;padding-top:10px;">
<ion-card-header>
<ion-card-title style="font-size:18px;">

{{forex_update_type=='offer'?'Offer Exchange Rate':'Forex Exchange Rate'}}


<span style="float:right;">
<ion-button style="margin-top:-20px;padding:0;" shape="round" size="small" class="btn2" @click="$router.push('/culiculator')">
<ion-icon :icon="calculator" style="margin-right:3px;"></ion-icon>
</ion-button>
</span>
</ion-card-title>
</ion-card-header>
<ion-card-content style="padding:0;">
<ion-grid>
<div  v-if="isLoading==true" style="padding:15px;padding-left:30px;padding-right:30px;">
<ion-skeleton-text :animated="true" style="width: 100%;"></ion-skeleton-text>
<ion-skeleton-text :animated="true" style="width: 70%;"></ion-skeleton-text>
<ion-skeleton-text :animated="true" style="width: 40%;"></ion-skeleton-text>
<!-- <ion-skeleton-text :animated="true" style="width: 40%;"></ion-skeleton-text> -->

</div>
<ion-row v-else>
<ion-col v-for="m in forex" :key="m" size="6">
<ion-card style="margin:0;border-radius:10px;background:#53986E;border:solid thin white;" button @click="exchange_rates()">
<ion-card-header>
<ion-card-title style="font-weight:bold;">
<ion-icon :icon="wallet" style="margin-right:3px;"></ion-icon>
{{ m.rate }}
</ion-card-title>
</ion-card-header>

<ion-card-content style="font-size:15px;margin-top:-15px;">
{{ m.name }}
</ion-card-content>
</ion-card>
</ion-col>
</ion-row>
<ion-row>
<ion-col size="12" style="padding:0;padding-bottom:15px;">
<div>
<ion-button expand="block" class="btn1" @click="$router.push('/send-money')">
<!-- <ion-icon :icon="wallet" style="margin-right:10px;"></ion-icon> -->
Send Money
</ion-button>
</div>
</ion-col>
</ion-row>
</ion-grid>
</ion-card-content>
</ion-card>
</div>
</template>

<script>
import {IonCardHeader, IonButton, IonCard, IonCardContent,IonCardTitle, IonGrid, IonRow, IonCol,IonIcon, IonSkeletonText, } from '@ionic/vue';
import { wallet, calculator} from 'ionicons/icons';
import { defineComponent } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

export default defineComponent({
components: { IonButton,
IonCard,
IonCardHeader,
IonCardContent,
IonCardTitle,
IonGrid,
IonRow,
IonCol,
IonIcon,
IonSkeletonText,
},

data(){
return{
isLoading:false,
rates:[
{id:1,name:'US Dollars',rate:1},
{id:2,name:'UG Shillings',rate:'3,700'}
],


response:[],
forex_update_type:null,

}},


//icon and static items
setup(){return{
wallet,
calculator
}},

computed:{
currency(){
return this.rates;
},


//forex formation
forex(){
const rates=this.response;
// const item =[
// {id:1,name:'US Dollars',rate:1},
// {id:2,name:'UG Shillings',rate:'3,700'}
// ];
const el=[];
rates.forEach(element => {
this.forex_update_type=element.type;
el.push({id:1,name:element.currency_primary,rate:element.rate_primary});
el.push({id:2,name:element.currency_secondary,rate:element.rate_secondary});
});

return el;

}





},

methods:{
exchange_rates(){
const rates=this.rates;
this.$router.push('/exchange-rates');
},
//


async exchange(){
this.isLoading=true;
const  supabase =  createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
await Preferences.get({ key: 'user_session' }).then(res=>{
const i=JSON.parse(res.value);
supabase
.from('update_forex')
.select('*')
.eq('userID',i.id)
.then(res=>{
this.get_user();
this.isLoading=false;
const item=res.data;
console.log(res);
// this.response=[
// {id:1,name:'US Dollars',rate:item.rate_primary},
// {id:2,name:'UG Shillings',rate:this.rate_secondary}
// ];

this.response=item;
}).catch((err) => {
console.log(err);
});

}).catch(error=>{
this.$store.state.error='Error.';
});



},


//get user data
async get_user(){
await Preferences.get({ key: 'user_session' }).then(res=>{
const i=JSON.parse(res.value);
this.id=i.email;
});
},








},






mounted(){
this.exchange();
}






});
</script>

<style scoped>
ion-card {
--background:#528265;
--color:white;
border-radius: 0;
border-bottom-left-radius: 30px;
box-shadow: none;
}

ion-card-title {
--color: white;
}

ion-card-subtitle {
--color: white;
}

/* iOS places the subtitle above the title */
ion-card-header.ios {
display: flex;
flex-flow: column-reverse;
}


.btn1{
--background:#53986E;;
--color:white;
--padding-top:25px;
--padding-bottom:25px;
--font-size:20px;
box-shadow: none;
--box-shadow:none;
--border-radius: 30px;
--border-color: white;
    --border-style: solid;
    --border-width: thin;
}


.btn2{
--background:#53986E;
--color:white;
--padding-top:20px;
--padding-bottom:20px;
--font-size:20px;
box-shadow: none;
--box-shadow:none;
--border-radius: 5px;
--border-color: white;
    --border-style: solid;
    --border-width: thin;

}

ion-skeleton-text {
    --border-radius: 9999px;
    --background: white;
    --background: white;
    --color:white;
  }
</style>