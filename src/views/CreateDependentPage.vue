<template>
<layout-component :title="title" :back="back" style="padding-bottom:50px;">
<!-- {{ errors }} -->
<form @submit.prevent="submit" style="background:white;margin:0;padding:10px;padding-bottom:25px;">
<div style="padding:0;">
<h4 style="padding:0;text-align:center">
Enter new dependent
</h4>
</div>
<div>
<ion-input label="Enter Names" placeholder="Enter Names" v-model="form.names" :style="errors.names!=null?'border:solid 2px red':null"></ion-input>
</div>
<div>
<ion-input label="Enter Telephone" placeholder="Enter Telephone" v-model="form.telephone" type="number" :style="errors.telephone!=null?'border:solid 2px red':null"></ion-input>
</div>
<div>
<ion-input label="Enter Email" placeholder="Enter Address" v-model="form.address" :style="errors.address!=null?'border:solid 2px red':null"></ion-input>
</div>
<div>
<ion-input label="Enter Relationship" placeholder="Enter Relationship" v-model="form.relationship" :style="errors.relationship!=null?'border:solid 2px red':null"></ion-input>
</div>

<div>
<ion-button expand="block" shape="round" fill="clear" type="submit">
Save
</ion-button>
<loader-popup-component message="Saving..." v-if="isLoading==true"/>
</div>
</form>
<alert-component :title="'Successful'" :message="message" :redirect="back" v-if="isSuccess==true"/>
</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonInput, IonButton} from '@ionic/vue';
import LoaderPopupComponent from '@/components/LoaderPopupComponent.vue';
import Dependent from '@/models/dependents.js';
import { Preferences } from '@capacitor/preferences';
import AlertComponent from '@/alerts/AlertComponent.vue';



export default {
components:{
LayoutComponent,
IonInput,
IonButton,
LoaderPopupComponent,
AlertComponent,


},
data(){return{
title:'Dependents',
back:'/dependents',
isLoading:false,
isSuccess:false,
message:null,



//form
form:{
names:null,
telephone:null,
address:null,
relationship:null,
userID:null,
},
//errors
errors:{
names:null,
telephone:null,
address:null,
relationship:null,
},



}},


methods:{

validation_error(item){
if(item==null || item==''){
return '* Field is required';
}
},




async submit(){

if(this.form.names==null || this.form.address==null || this.form.telephone==null || this.form.relationship==null){
const message='* Field is required.';
this.errors.names=this.validation_error(this.form.names);
this.errors.telephone=this.validation_error(this.form.telephone);
this.errors.address=this.validation_error(this.form.address);
this.errors.relationship=this.validation_error(this.form.relationship);
return;
}

this.isLoading=true;
this.isSuccess=false;
await Preferences.get({key:'user_session'}).then(user=>{
const id=JSON.parse(user.value).id;
this.form.userID=id;
console.log(id);
const model=new Dependent;
model.create(this.form).then(state=>{
const status=state.status;
this.isLoading=false;
if(status==201){
console.log(state.status);
this.$store.state.alert={title:'successful',message:'Dependent has been saved.',status:'success'};
this.form.names=null;
this.form.relationship=null;
this.form.telephone=null;
this.form.address=null;
this.isSuccess=true;
this.message='Dependent has been added.';
}else{
this.$store.state.alert={title:'error',message:'Network connection error',status:'error'};
}
}).catch(err=>{
console.log(err);
});
}).catch(error=>{
console.log(error);
});








}






}





}
</script>


<style scoped>


form div{
padding:30px;
padding-bottom:0;

}

ion-input,ion-select{
border:solid 2px #528265;
border-radius:5px;
--color:black;
height:50px;

}

ion-button{
--background:#528265;
--color:white;
--width:100%;
border-radius:10px;
box-shadow: none;
--padding: 30px;
height:45px;

}



</style>