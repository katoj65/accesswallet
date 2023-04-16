import connect from './connect_supabase';
export default class Dependent{

//list all items in the database.
list(id){
const supabase=connect();
return supabase.from('dependent').select('*').eq('userID',id);

}

//show single item
async show(id){
const supabase=connect();
return await supabase.from('dependent').select('*').eq('id',id);
}


//create dependent
create(input){
const supabase=connect();
return supabase.from('dependent').insert(input);

}


//listen to the channet test
async list_channel(item){
const supabase=connect();
const channel=supabase.channel('changes').on('postgres_changes',{
event:'INSERT',
schema:'public',
table:'dependent'
},
(payload) =>payload=item).subscribe();
return channel;
}





async test(){
const supabase=connect();
return await supabase
  .from('dependent')
  .select();
}

async lists(id){
const supabase=connect();
return await supabase.from('dependent').select('*').eq('userID',id);
}













}