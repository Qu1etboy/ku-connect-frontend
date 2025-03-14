import { createClient } from "@/lib/supabase/client";

export const upload = async (file: File, path: string, bucket: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) {
    throw error;
  }

  return data;
};
