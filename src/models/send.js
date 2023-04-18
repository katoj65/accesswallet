import connect from './connect_supabase';
export default class SendMoney{

//send money
async send(form){
const data=[];
const supabase=connect();
const uid=form.userID;
const bal=form.balance-form.amount;
const insert={
'senderID':uid,
'amount':form.amount,
'type':form.type,
'telephone':form.telephone
};

//
if(form.amount<form.balance){
return await supabase.from('send_money').insert(insert).select();
}else{
return await {data};
}


}


//get balance
get_balance(uid){
const supabase=connect();
return supabase.from('wallet').select('amount').eq('userID',uid);
}

//update balance
update_balance(update,id){
const supabase=connect();
 return supabase.from('wallet').update(update).eq('userID',id).select();
}









}