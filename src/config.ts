export const config = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000",
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  ENV: process.env.NEXT_PUBLIC_NODE_ENV || "development",
  CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
};
