import { useSession } from "next-auth/react";
import Head from "next/head";
import Login from "../components/Login";
import RegisterManager from "../components/RegisterManager";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <RegisterManager />
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
