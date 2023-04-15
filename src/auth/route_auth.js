
import { createStore } from 'vuex'
const auth = createStore({
state () {
return {
user:null,
}
},

});


export default auth.state.user;