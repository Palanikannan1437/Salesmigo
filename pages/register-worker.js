import { useSession } from "next-auth/react";
import { useEffect } from "react";
import RegisterWorker from "../components/RegisterWorker";

export default function RegisterWorkerPage() {
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
