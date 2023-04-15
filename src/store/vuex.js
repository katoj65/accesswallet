import { createStore } from 'vuex';
const store = createStore({
  state () {
return {
//supabase links information
supabase:{
endpoint:'https://dccbahjdswqcuviwqnsl.supabase.co',
key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjY2JhaGpkc3dxY3V2aXdxbnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwNDA4NjYsImV4cCI6MTk5NDYxNjg2Nn0.1z2eKCEVKg2MF67JKpAIfmMpiDkyOIzE1u2zd4Zm0F8'
},

count: 0,
user:null,
errorr:null,
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

export default store;