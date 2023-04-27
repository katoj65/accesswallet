<template>
<dialog-layout :title="title" :subtitle="subtitle" :back="back">

<div>
<div v-if="isLoading==false" style="padding:0;">
<div>





<ion-item v-for="m in menu" :key="m.id" button lines="none" detail="true"
@click="$router.push('/send/'+id+'/'+m.url)">
<ion-icon slot="start" :icon="images"></ion-icon>
<ion-label style="text-transform:capitalize;">{{ m.name }} </ion-label>
</ion-item>










</div>
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

</div>
</dialog-layout>
</template>
<script>
import DialogLayout from '@/components/DialogLayout.vue';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import Dependent from '@/models/dependents';
import { IonButton, IonButtons, IonFooter, IonIcon, IonInput, IonItem, IonLabel, IonToolbar } from '@ionic/vue';
import { images, send } from 'ionicons/icons';

    export default {
    components:{
    DialogLayout,
    SkeletonComponent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonButtons,
    IonToolbar,
    IonFooter


    },

    data(){return{
    title:null,
    subtitle:null,
    back:'/tabs/tab3',
    isLoading:false,
    response:null,
    names:null,
    tel:null,
    relationship:null,
    id:null,

    form:{
    amount:null,
    },
    //



    //menu information
    menu:[

    {id:3,name:'Send Gift',icon:'',url:'gifts'},
    {id:4,name:'Send Shopping Vochour',icon:'',url:'gifts'},
    {id:5,name:'Schedule Payment',icon:'',url:'gifts'},
    {id:5,name:'Send Budget',icon:'',url:'gifts'},
    {id:2,name:'Send Invitation',icon:'',url:'gifts'},
    {id:1,name:'Wallet Deposit',icon:'',url:'gifts'},



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
    this.title=element.names;
    this.subtitle=element.relationship+' . '+element.telephone;
    this.relationship=element.relationship;
    this.id=element.id;
    this.tel=element.telephone;

    });











    }).catch(error=>{
    console.log(error);
    });
    },


    submit(){
    const id=this.id;
    alert(id);


    },

    change_menu(menu){
    this.main_menu=menu;
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

    }
    </style>