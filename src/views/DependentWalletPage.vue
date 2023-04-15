<template>
<dialog-layout :title="title" :back="back">
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
title:'Dependent wallet',
back:'/dependent/225',




}}

}
</script>