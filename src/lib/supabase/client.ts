import { config } from "@/config";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
}
