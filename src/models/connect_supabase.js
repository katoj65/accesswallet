import { createClient } from '@supabase/supabase-js';
export default function connect(){
const supabase = createClient('https://dccbahjdswqcuviwqnsl.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjY2JhaGpkc3dxY3V2aXdxbnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwNDA4NjYsImV4cCI6MTk5NDYxNjg2Nn0.1z2eKCEVKg2MF67JKpAIfmMpiDkyOIzE1u2zd4Zm0F8');
return supabase;

}