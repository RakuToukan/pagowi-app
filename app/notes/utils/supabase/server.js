// utils/supabase/server.js
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function createClient() {
  return createSupabaseClient(
    process.env.SUPABASE_URL, // Sesuaikan dengan nama ENV di .env.local kamu
    process.env.SUPABASE_ANON_KEY,
  );
}
