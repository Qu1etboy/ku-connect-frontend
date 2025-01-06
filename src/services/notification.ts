import { createClient } from "@/lib/supabase/client";
import { instance } from "@/utils/axios";

export async function fetchMyNotification(page: number, size: number) {
  const supabase = createClient();
  const data = await supabase.auth.getSession();
  const token = data.data?.session?.access_token;
  const resp = await instance.get(
    `/api/notifications?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  console.log(resp, page, size);

  return resp.data;
}
