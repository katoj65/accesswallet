import connect from './connect_supabase';
export default class Notification{


//get all notifications
all(auth){
const supabase=connect();
return supabase.from('notification').select('*').eq('userID',auth);
}


//show single notification
show(id){
const supabase=connect();
return supabase.from('notification').select('*').eq('id',id);
}

async create(input){
const supabase=connect();
await supabase.from('notification').insert(input);
}






}


