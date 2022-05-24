import { useSession } from "next-auth/react";
import { useEffect } from "react";
import RegisterWorker from "../components/RegisterWorker";

export default function RegisterWorkerPage() {
  const { data: session } = useSession();
  
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
