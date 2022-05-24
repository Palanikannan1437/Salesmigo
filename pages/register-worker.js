import { useSession } from "next-auth/react";
import Head from "next/head";
import Login from "../components/Login";
import RegisterWorker from "../components/RegisterWorker";

export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      props.handleNavItems(3, "SIGN OUT", true);
    }
  }, [session]);

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
