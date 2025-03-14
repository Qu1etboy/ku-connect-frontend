import { config } from "@/config";

const BASE_URL = config.CLIENT_URL;

export function getUrl(pathname: string) {
  return BASE_URL + pathname;
}

export function getProfileImageUrl(path: string) {
  // if path starts with http, return it
  if (path.startsWith("http")) {
    return path;
  }

  return config.SUPABASE_STORAGE_URL + "/avatars/" + path;
}
