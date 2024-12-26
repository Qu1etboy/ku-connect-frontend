const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

export function getUrl(pathname: string) {
  return BASE_URL + pathname;
}
