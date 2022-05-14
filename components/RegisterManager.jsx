import React, { useRef } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";

const RegisterManager = () => {
  const router = useRouter();
  const inputNameRef = useRef();
  const inputEmailRef = useRef();

  const registerManagerHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredEmail = inputEmailRef.current.value;
    const userData = {
      employee_name: enteredName,
      employee_email: enteredEmail,
    };
    
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/employees/manager`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      <form onSubmit={registerManagerHandler}>
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

export default RegisterManager;
