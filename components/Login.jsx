import React from "react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { setCookies } from "cookies-next";

const Login = () => {
  const { data: session } = useSession();

  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);

  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/employees/login-google`, {
        method: "POST",
        body: JSON.stringify({
          idToken: session.idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === "Login Successful") {
            setIsGoogleLoggedIn(true);
            setCookies("google-verified-jwtToken", data.googleToken);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session]);

  if (isGoogleLoggedIn) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Login;
