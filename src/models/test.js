import connect from './connect_supabase';
export default class Test{

item(){
const supabase=connect();
return supabase;
}












}