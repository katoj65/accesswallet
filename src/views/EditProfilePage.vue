<template>
<layout-component :title="title" :back="back">
<ion-card style="margin:0;border-radius:0;box-shadow:none;" v-if="response.length==0">
<ion-card-header>
<ion-card-subtitle style="text-align:center;">Fill in your details</ion-card-subtitle>
</ion-card-header>
<ion-card-content>
<form @submit.prevent="submit">
{{ form }}
<div class="field">
<ion-input v-model="form.firstname" disabled></ion-input>
</div>

<div class="field">
<ion-input v-model="form.lastname" disabled></ion-input>
</div>


<div class="field">
<ion-select aria-label="gender" interface="popover" placeholder="Select Gender" @change="selected_gender($event)">
<ion-select-option :value="g.name" v-for="g in select_gender" :key="g.id">
{{ g.name }}
</ion-select-option>
</ion-select>
</div>






<div class="field">


</div>





<div class="field">
<ion-input type="number" placeholder="Enter your Telephone Number" v-model="form.tel"></ion-input>
</div>



<div class="field">
<ion-input placeholder="Enter your Address" v-model="form.location"></ion-input>
</div>


<div class="field">
<ion-select aria-label="Country" interface="popover" placeholder="Select Country" @change="selected_country($event)">
<ion-select-option :value="c.id" v-for="c in select_country" :key="c.id">
{{ c.name }}
</ion-select-option>
</ion-select>
</div>




<div class="field">
<ion-select aria-label="Fruit" interface="popover" placeholder="Select currency" @change="selected_currency($event)">
<ion-select-option :value="s.id" v-for="s in select_currecy" :key="s.id">
{{ s.name }}
</ion-select-option>
</ion-select>
</div>



<div class="field">
<ion-button expand="block" shape="round" fill="clear" type="submit">
Save
</ion-button>
<loader-popup-component message="Saving..." v-if="isLoading==true"/>


</div>



</form>
</ion-card-content>
</ion-card>






</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonInput, IonButton, IonSelect, IonSelectOption,} from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import { createClient } from '@supabase/supabase-js';
import LoaderPopupComponent from '@/components/LoaderPopupComponent';
export default {
components:{
LayoutComponent,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonInput,
IonButton,
IonSelect,
IonSelectOption,
LoaderPopupComponent,



},

data(){return{
title:'Edit Profile',
back:'/profile',
state:false,
response:[],
user:null,
isLoading:false,
id:null,

select_currecy:[],
select_country:[],

select_gender:[
{id:1,name:'Male'},
{id:2,name:'Female'},
{id:3,name:'Other'}
],

form:{
firstname:null,
lastname:null,
tel:null,
location:null,
country:null,
currency:null,
gender:null,
dob:null,

},





}},


methods:{
async payload(){
await Preferences.get({key:'user_session'}).then(response=>{
const res=JSON.parse(response.value);
this.user=res;
this.form.firstname=this.user.firstname
this.form.lastname=this.user.lastname;
this.id=res.id
this.form.tel=res.id;
});

//select countriesa
this.countries();
this.currencies();

},

async countries(){
const supabase = createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
await supabase.from('country').select('id,name').then(response=>{
// console.log(response);
this.select_country=response.data;
}).catch(error=>{
console.log(error);
});
},

async currencies(){
const supabase = createClient(this.$store.state.supabase.endpoint, this.$store.state.supabase.key);
await supabase.from('currency').select('id,name,abbreviation')
.then(response=>{
this.select_currecy=response.data;
// console.log(response);
})
.catch(error=>{
console.log(error);
});


},


//selectables
selected_gender(event){
this.form.gender=event.target.value;
},
selected_country(event){
alert(event);
this.form.country=event.target.value;
},
selected_currency(event){
this.form.currency=event.target.value;
},






//submit
submit(){
this.isLoading=true;

},







},

mounted(){
this.payload();
}








}
</script>

<style scoped>
form .field {
margin:15px;
}

ion-input,ion-select{
border:solid 2px #528265;
border-radius:10px;
--color:black;

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

ion-datetime{
--color:black;
border:solid 2px #528265;
color:black;
}

ion-datetime-button #date_item{
 --background:#528265;
 --color:#003300;
 --border-style:none;
 --border-color:none;
--padding-top:25px;
--padding-bottom:25px;
--font-size:20px;
box-shadow: none;
--with:100%;
}




</style>