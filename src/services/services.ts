import { createClient } from "@/lib/supabase/client";

export async function getHeaders() {
  const supabase = createClient();
  const data = await supabase.auth.getSession();
  const token = data.data?.session?.access_token;
  return {
    Authorization: "Bearer " + token,
  };
}
