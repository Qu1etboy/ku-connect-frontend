import { createClient } from "@/lib/supabase/client";
import { getUrl } from "@/utils/url";
import { UserMetadata } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type LoginOption = {
  redirectTo: string;
};

export function useUser() {
  const supabase = createClient();
  const [user, setUser] = useState<UserMetadata | null>();
  const [isLoading, setIsLoading] = useState(true);

  const login = (options: LoginOption = { redirectTo: "/" }) => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          // BUG: When login with @ku.th it result in `Google Workspace -
          // This account cannot be accessed because your credentials were not verified.`
          // Workaround is to sign in with google to google chrome first then it will be
          // able to sign in with @ku.th through this app

          // hd: "ku.th",
          prompt: "select_account",
        },
        redirectTo: getUrl("/api/auth/callback?next=" + options.redirectTo),
      },
    });
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      throw error;
    }
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      console.log(data);
      setUser(data?.session?.user.user_metadata);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return { user, login, logout, isLoading };
}
