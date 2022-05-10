import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  const token = getToken({ req, secret });
  console.log(token + "token!!!!");
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);
  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/login-google`, {
        method: "POST",
        body: JSON.stringify({
          session,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((d) => {
          if (d.data.isGoogleAuthenticated) {
            setIsGoogleLoggedIn(true);
          }
          console.log(data + "google auth successful");
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
}
