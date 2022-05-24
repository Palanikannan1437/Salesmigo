import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import AuthContext from "../store/auth-context";

const Login = () => {
  const { data: session } = useSession();
  const authCtx = useContext(AuthContext);

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
          Authorization: `Bearer ${getCookie("google-jwt")}`,
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 404 || response.status === 500) {
            // router.push(`/error-page/${response.status}`);
            signOut();
          }
          return response.json();
        })
        .then((data) => {
          console.log("from backend", data);
          if (data.status === "Login Successful") {
            setIsGoogleLoggedIn(true);
            authCtx.setTeamID(data.employee.teamId);
            authCtx.login(data.employee.id, data.employee.designation);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session?.accessToken]);

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
