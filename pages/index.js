import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoginBtn from "../app/components/loginBtn/loginBtn";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    session && status === "authenticated" && router.push("./home");
  }, [session, status]); 

  return (
    <div>
      <div>
        {!session ? (
          <LoginBtn />
        ) : (
          <p >Loading...</p>
        )}
      </div>
    </div>
  );
}
