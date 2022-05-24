import { useSession } from "next-auth/react";
import Head from "next/head";
import Login from "../components/Login";
import RegisterWorker from "../components/RegisterWorker";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <RegisterWorker />
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
