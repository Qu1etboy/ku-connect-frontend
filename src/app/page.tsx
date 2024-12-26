"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/user";

export default function Home() {
  const { user, login, logout, isLoading } = useUser();

  return (
    <main>
      <h1>Hello Mhoo Toey</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque,
        totam aspernatur perspiciatis minima officia cupiditate reiciendis,
        nostrum eos commodi soluta sint quidem. Quam ad adipisci vitae ex illo
        corporis amet!
      </p>
      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Button onClick={() => login()}>Login with Google</Button>
      )}
    </main>
  );
}
