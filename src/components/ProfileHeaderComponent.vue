<template>
<div>
<ion-toolbar>
<div style="background:#528265;text-align:center;" >
<div v-if="profile!=null">
<ion-thumbnail slot="start" style="width:100%;">
<img alt="Silhouette of mountains" :src="'../../assets/icon/access-wallet-high-resolution-logo-black-on-white-background.png'" style="width:100px;border-radius:200px;height:100px;"/>
</ion-thumbnail>
<div style="padding:20px;margin-top:25px;padding-bottom:5px;">
<h3 style="color:white;font-weight:bold;">
{{ user.firstname }} {{ user.lastname }}
</h3>
<p>

<ion-button fill="clear" style="border:solid 2px white;border-radius:10px;" @click="$router.push('/edit-profile')">Edit Profile</ion-button>

</p>
</div>
</div>
<div v-else style="background:#528265;text-align:center; margin-top:-20px;width:100%;padding:30px;height:220px;">
<skeleton-component/>
</div>
</div>

</ion-toolbar>
</div>
</template>

<script>
import {IonThumbnail,IonToolbar,IonButton  } from '@ionic/vue';
import SkeletonComponent from '@/components/SkeletonComponent';

export default {
props:{
profile:{}
},
components:{
IonThumbnail,
IonToolbar,

SkeletonComponent,
IonButton
},

data(){return{
isLoading:false,


}},

computed:{
user(){
const profile=JSON.parse(this.profile);
return profile;
},
},

methods:{
payload(){
this.isLoading=true;
if(this.profile!=null){
this.isLoading=false;
}
}



},
mounted(){
this.payload();
}






}
</script>

<style scoped>
ion-item::part(native) {
background:#528265;
color: white;
border:none;
padding-bottom:10px;

}


ion-button{
 --background:#528265;
 --color:white;
 --border-style:solid;
 --border-color:white;
box-shadow: none;
border-radius: 10px;

}
</style>