
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';


/* Theme variables */
import './theme/variables.css';


import { createStore } from 'vuex';
const store = createStore({
  state () {
return {
//supabase links information
supabase:{
endpoint:'https://dccbahjdswqcuviwqnsl.supabase.co',
key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjY2JhaGpkc3dxY3V2aXdxbnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwNDA4NjYsImV4cCI6MTk5NDYxNjg2Nn0.1z2eKCEVKg2MF67JKpAIfmMpiDkyOIzE1u2zd4Zm0F8'
},

search_dependent:null,
count: 0,
userID:null,
user:null,
error:null,





  }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})



//
import { StatusBar } from '@capacitor/status-bar';
StatusBar.setBackgroundColor({color:'#528265'});

//







const app = createApp(App)
.use(IonicVue)
.use(store)
.use(router);

router.isReady().then(() => {
app.mount('#app');
});