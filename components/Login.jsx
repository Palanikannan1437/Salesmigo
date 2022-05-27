import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import AuthContext from "../store/auth-context";

const Login = () => {
  const { data: session } = useSession();
  const authCtx = useContext(AuthContext);

  if (isGoogleLoggedIn) {
    return (
      <>
        {/* Signed in as {session.user.email} <br /> */}
      </>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
    </>
  );
};

export default Login;
