import connect from './connect_supabase';
export default class SendMoney{

send(){
const supabase=connect();
console.log(supabase);

}




}