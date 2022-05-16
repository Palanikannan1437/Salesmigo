import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import React from "react";
import FaceDetection from "../components/FaceDetection/FaceDetection";

const CustomerRecognitionPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <FaceDetection />
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

export default CustomerRecognitionPage;
