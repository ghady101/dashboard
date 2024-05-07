import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://mhjvjbceeqfjomszavdv.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oanZqYmNlZXFmam9tc3phdmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0ODQyMzUsImV4cCI6MjAzMDA2MDIzNX0.zkSErlh4GnDykoxj9yfoK6gkgTP4Pw0iZLH7V6-70zQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
