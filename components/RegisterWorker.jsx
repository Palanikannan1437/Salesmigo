import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { media } from "../utils/media";
import Button from "../components/HelperComponents/Button";
import Input from "../components/HelperComponents/Input";
import { useSession } from "next-auth/react";

const RegisterWorker = () => {
  const { data: session } = useSession();

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
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/employees/worker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 404) {
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
      <form>
        <div>
          <InputGroup>
            <InputStack>
              <Input placeholder="Worker's Name" id="name" ref={inputNameRef} />
            </InputStack>
            <InputStack>
              <Input
                placeholder="Worker's Email"
                id="email"
                ref={inputEmailRef}
              />
            </InputStack>
          </InputGroup>
          <Button onClick={registerWorkerHandler}>Submit</Button>
        </div>
      </form>
    </div>
  );
};
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  & > *:first-child {
    margin-right: 2rem;
  }

  & > * {
    flex: 1;
  }

  ${media("<=tablet")} {
    flex-direction: column;
    & > *:first-child {
      margin-right: 0rem;
      margin-bottom: 2rem;
    }
  }
`;

const InputStack = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

export default RegisterWorker;
