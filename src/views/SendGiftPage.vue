<template>
<dialog-layout :title="title" :subtitle="subtitle" :back="back">
<div v-if="isLoading==false">
<ion-item>
<ion-label>
<h4 style="font-weight:bold;font-size:17px;">
Gift Store
</h4>
</ion-label>
<span slot="end">
  search
</span>
</ion-item>




<ion-button @click="$router.push('/test')">Test</ion-button>




</div>
<div v-else style="padding:20px;">
<skeleton-component/>
</div>
<form>
<ion-footer style="position:fixed;bottom:0;width:100%;border-top:solid thin #528265;" class="ion-no-border">
<ion-toolbar style="padding:10px;padding-top:0;font-weight:bold;padding-left:30px;padding-bottom:0;">Send Money</ion-toolbar>
<ion-toolbar>
<ion-buttons slot="end">
<ion-button>
<ion-icon :icon="send"></ion-icon>
</ion-button>
</ion-buttons>
<ion-input ref="input" type="number" placeholder="Enter amount to be sent" v-model="form.amount" style="padding-bottom:10px;margin-left:24px;"></ion-input>
</ion-toolbar>
</ion-footer>
</form>


  </dialog-layout>
  </template>
  <script>
import DialogLayout from '@/components/DialogLayout.vue';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import Dependent from '@/models/dependents';
import { Preferences } from '@capacitor/preferences';
import { IonButton, IonButtons, IonFooter, IonIcon, IonInput, IonToolbar, IonItem, IonLabel } from '@ionic/vue';
import { images, send } from 'ionicons/icons';
  export default {
  components:{
  DialogLayout,
  SkeletonComponent,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
  IonToolbar,
  IonFooter,
  IonItem,
  IonLabel


  },

  data(){return{

  title:null,
  subtitle:null,
  back:null,
  isLoading:false,
  response:null,
  names:null,
  tel:null,
  relationship:null,
  id:null,

  form:{
  amount:null,
  },

  //menu information
  menu:[


  {id:3,name:'Send Gift',icon:'',url:'/send-gift'},
  {id:4,name:'Send Shopping Vochour',icon:'',url:'/send-gift'},
  {id:5,name:'Schedule Payment',icon:'',url:'/send-gift'},
  {id:5,name:'Send Budget',icon:'',url:'/send-gift'},
  {id:2,name:'Send Invitation',icon:'',url:'/send-gift'},
  {id:1,name:'Wallet Deposit',icon:'',url:'/test'},



  ],


  }
  },


  methods:{
  async payload(){
  this.isLoading=true;
  const id=this.$route.params.id;
  const model=new Dependent;
  await model.show(id).then(response=>{
  this.isLoading=false;
  // console.log(response);
  response.data.forEach(element=>{
    console.log(element);
  this.title=element.names;
  this.subtitle=element.relationship+' . '+element.telephone;
  this.relationship=element.relationship;
  this.id=element.id;
  this.tel=element.telephone;
  this.back='/contact-send/'+element.id;
  });











  }).catch(error=>{
  console.log(error);
  });
  },


  submit(){
  const id=this.id;
  alert(id);


  }





  },

  mounted(){
  this.payload();
  },

  setup(){return{
  images,send
  }
  }





  }
  </script>

  <style  scoped>
  ion-input{
  border:none;
  }

  ion-button{
  --box-shadow:none
  }

  ion-item{
  font-size:18px;
  margin-bottom: 2px;
  }
  </style>