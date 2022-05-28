import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Input from "../HelperComponents/Input";
import { media } from "../../utils/media";
import { Autocomplete, Button, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BillingForm = (props) => {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputLocationRef = useRef();
  const inputItemPurchasedRef = useRef();
  const inputPriceRef = useRef();

  const [itemsFromInventory, setItemsFromInventory] = useState([]);

  const addBill = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredEmail = inputEmailRef.current.value;
    const enteredLocation = inputLocationRef.current.value;
    const enteredProduct = inputItemPurchasedRef.current.value;
    const enteredPrice = inputPriceRef.current.value;
    const billData = {
      customer_name: enteredName,
      emailId: enteredEmail,
      customer_location: enteredLocation,
      itemId: enteredProduct,
      price: enteredPrice,
    };

    fetch(`${process.env.NEXT_PUBLIC_SERVER}/aisles/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billData),
    })
      .then((response) => {
        if (response.status === 404) {
          router.push("/error-page");
        }
        return response.json();
      })
      .then((status) => {
        toast(`${status.status} ${inputItemPurchasedRef.current.value}`);
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get all FromInventory from inventory
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/aisles/items`)
      .then((response) => {
        if (response.status === 404) {
          router.push("/error-page");
        }
        return response.json();
      })
      .then((data) => {
        setItemsFromInventory(
          data.items.map((item) => {
            return item.split(/(?=[A-Z])/).join(" ");
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Wrapper>
        <ToastContainer />
        <Form onSubmit={addBill}>
          <InputGroup>
            <InputStack>
              <Input
                placeholder="Customer's Name"
                id="name"
                ref={inputNameRef}
              />
            </InputStack>
            <InputStack>
              <Input
                type="email"
                placeholder="Customer's Email"
                id="email"
                ref={inputEmailRef}
              />
            </InputStack>
          </InputGroup>
          <InputGroup>
            <InputStack>
              <Input
                placeholder="Customer's Location"
                id="location"
                ref={inputLocationRef}
              />
            </InputStack>
            <InputStack>
              <Input
                type="number"
                placeholder="Price of Product with Discount"
                id="location"
                ref={inputPriceRef}
              />
            </InputStack>
          </InputGroup>
          <InputGroup>
            <InputStack>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={itemsFromInventory}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    inputRef={inputItemPurchasedRef}
                    {...params}
                    label="Select Billing Item"
                  />
                )}
              />
            </InputStack>
          </InputGroup>
          <Button
            variant="contained"
            sx={{
              padding: "1.3rem 2.25rem",
              fontSize: " 1.2rem",
            }}
            type="submit"
          >
            Submit
          </Button>
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

export default BillingForm;
