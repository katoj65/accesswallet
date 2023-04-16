import connect from './connect_supabase';
class Business{

async create(input){
const supabase=connect();
await supabase.from('business').insert(input);
}

async get(id){
const supabase=connect();
await supabase.from('business').select('*').eq('userID',id);
}


async show(id){
const supabase=connect();
await supabase.from('business').select('*').eq('id',id);
}


}