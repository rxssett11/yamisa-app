import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zaeezcmpboaobindrqxc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZWV6Y21wYm9hb2JpbmRycXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzA5NTUsImV4cCI6MjA2MDQwNjk1NX0.5V_ojsbt4DJjHWqMBuOmrW-WJcK2Eo0jB-T2W3xM6ck';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
