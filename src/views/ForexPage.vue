<template>
<layout-component :title="title" :back="back">

<div>
<table style="width:100%;">
<thead>
<tr>
<th colspan="3" style="text-align:center;">
Uganda Shillings againist other currencies
</th>
</tr>
</thead>
<tbody>
<tr v-for="n in 30" :key="n">
<td>
<ion-icon :icon="calendar" style="margin-right:10px;"></ion-icon>
12/12/2023
</td>
<td>USD</td>
<td>2760</td>
</tr>
</tbody>
</table>

</div>

</layout-component>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue';
import { IonIcon } from '@ionic/vue';
import {calendar} from 'ionicons/icons';

export default {
components:{
LayoutComponent,
IonIcon,
},

data(){return{
title:'Trade Forex',
back:'/',


}},


//set up
setup(){return{
calendar
}}



}
</script>
<style scoped>
table thead th{
padding:10px;
border: solid thin #EBEDEF;
}
table tbody td{
padding:10px;
border: solid thin #EBEDEF;
}
</style>