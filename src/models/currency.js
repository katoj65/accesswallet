import connect from './connect_supabase';
class Currency{
//currency chart
currency_chart(){
const supabase=connect();
supabase.get().then(response=>{








    

}).catch(error=>{
consile.log(error);
});






}










}