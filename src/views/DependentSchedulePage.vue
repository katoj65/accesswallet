<template>
<dialog-layout :title="title" :subtitle="subtitle" :back="back">
<form>





</form>
</dialog-layout>
</template>
<script>
import { Preferences } from '@capacitor/preferences';
import DialogLayout from '@/components/DialogLayout.vue'
export default {
components:{
DialogLayout
},

data(){return{
title:'Dependent schedule',
back:'/dependent/225',




}}

}
</script>