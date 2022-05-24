import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useRef } from "react";

const RegisterWorker = () => {
  const router = useRouter();
  const inputNameRef = useRef();
  const inputEmailRef = useRef();

  const registerWorkerHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredEmail = inputEmailRef.current.value;
    const userData = {
      employee_name: enteredName,
      employee_email: enteredEmail,
    };
    console.log("first", userData);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/employees/worker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("google-jwt")}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if ((response.status = 404)) {
          router.push("/error-page");
        }
        return response.json();
      })
      .then((userData) => {
        console.log("userData", userData.employee);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={registerWorkerHandler}>
        <div>
          <TextField
            inputRef={inputNameRef}
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
          <TextField
            inputRef={inputEmailRef}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterWorker;
