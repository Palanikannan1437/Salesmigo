import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PhoneInput from "react-phone-number-input";
import styled from "styled-components";
import Button from "../components/HelperComponents/Button";
import Input from "../components/HelperComponents/Input";
import { media } from "../utils/media";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegisterCustomer = (props) => {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputLocationRef = useRef();

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const registerCustomerHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredEmail = inputEmailRef.current.value;
    const enteredLocation = inputLocationRef.current.value;
    const enteredPhoneNumber = phoneNumber;
    const customerData = {
      customer_name: enteredName,
      customer_email: enteredEmail,
      customer_location: enteredLocation,
      customer_phoneNumber: enteredPhoneNumber,
      customer_dateOfBirth: dateOfBirth,
      customer_images: props.filesToUpload,
    };

    fetch(`${process.env.NEXT_PUBLIC_SERVER}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => {
        if (response.status === 404) {
          router.push("/error-page");
        }
        return response.json();
      })
      .then((customerData) => {
        toast("Successfully registered");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Wrapper>
        <Form>
          <InputGroup>
            <InputStack>
              <Input placeholder="Customer's Name" id="name" ref={inputNameRef} />
            </InputStack>
            <InputStack>
              <Input placeholder="Customer's Email" id="email" ref={inputEmailRef} />
            </InputStack>
          </InputGroup>
          <InputGroup>
            <InputStack>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(newValue) => {
                    setDateOfBirth(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </InputStack>
            <InputStack>
              <Input
                placeholder="Customer's Location"
                id="location"
                ref={inputLocationRef}
              />
            </InputStack>
          </InputGroup>
          <InputGroup>
            <PhoneInput
              placeholder="Customer's phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="IN"
            />
          </InputGroup>
          <Button onClick={registerCustomerHandler}>Submit</Button>
        </Form>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  flex: 2;
`;

const Form = styled.form`
  & > * {
    margin-bottom: 2rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;

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

export default RegisterCustomer;
