import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import PhoneInput from "react-phone-number-input";

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

    fetch(`${process.env.NEXT_PUBLIC_SERVER}/customers/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    })
      .then((response) => {
        if ((response.status = 404)) {
          router.push("/error-page");
        }
        return response.json();
      })
      .then((customerData) => {
        console.log("customerData", customerData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={registerCustomerHandler}>
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
          <TextField
            inputRef={inputLocationRef}
            id="outlined-basic"
            label="Location"
            variant="outlined"
          />
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
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="IN"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCustomer;
