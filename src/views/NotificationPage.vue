<template>
<layout-component :title="title" :back="back">
{{ test }}
<skeleton-component v-if="isLoading==true" style="padding:20px;"/>
<message-list-component :list="list" v-else></message-list-component>
</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import MessageListComponent from '@/components/MessageListComponent.vue';
import Notification from '../models/notifications.js';
import SkeletonComponent from '@/components/SkeletonComponent.vue';
import { Preferences } from '@capacitor/preferences';


export default {
components:{
LayoutComponent,
MessageListComponent,
SkeletonComponent
},

//
data(){return{
title:'Notifications',
back:'/',
response:[],
isLoading:false,test:null,


}},

//
methods:{
async payload(){
this.isLoading=true;
await Preferences.get({key:'user_session'}).then(user_res=>{
const id =JSON.parse(user_res.value).id;
const notification=new Notification;
notification.all(id).then(res=>{
this.isLoading=false;
// console.log(res);
this.response=res.data;
}).catch(error=>{
console.log(error);
});



});



}


},

//
mounted(){
this.payload();


},

//
computed:{
list(){
const item=[];
this.response.forEach(element => {
item.push({
title:element.created_at+' '+element.title,
description:element.description
});
});
return item;
}



}





}
</script>