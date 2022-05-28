import React, { useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Input from "../components/HelperComponents/Input";
import styled from "@emotion/styled";
import { media } from "../utils/media";
import Button from "../components/HelperComponents/Button";
import 'react-toastify/dist/ReactToastify.css';


const RegisterManager = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputTeamNameRef = useRef();

  const registerManagerHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredEmail = inputEmailRef.current.value;
    const enteredTeamName = inputTeamNameRef.current.value;

    const userData = {
      employee_name: enteredName,
      employee_email: enteredEmail,
      team_name: enteredTeamName,
    };

    fetch(`${process.env.NEXT_PUBLIC_SERVER}/employees/manager`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
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
        toast(userData.status);
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
              <Input
                placeholder="Manager's Name"
                id="name"
                ref={inputNameRef}
              />
            </InputStack>
            <InputStack>
              <Input
                placeholder="Manager's Email"
                id="email"
                ref={inputEmailRef}
              />
            </InputStack>
          </InputGroup>
          <InputGroup>
            <InputStack>
              <Input
                placeholder="Your Store's Name"
                id="teamname"
                ref={inputTeamNameRef}
              />
            </InputStack>
          </InputGroup>

          <Button onClick={registerManagerHandler}>Submit</Button>
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

export default RegisterManager;
