import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import GestureDetection from "../components/FaceDetection/GestureDetection";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";

const GestureRecognitionPage = (props) => {
  const { data: session } = useSession();

  const [aisles, setAisles] = useState([
    { aisleName: "", fashionItem: "", priceRange: "", _id: "1" },
  ]);

  const updateCustomerGesture = (
    current_gesture,
    customer_email,
    aisleName
  ) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/customers/gesture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_gesture,
        customer_email,
        aisleName,
      }),
    })
      .then((response) => {
        if (response.status === 404) {
          router.push("/error-page");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.status);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(current_gesture, customer_email, aisleName);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/aisles`)
      .then((response) => response.json())
      .then((data) => {
        setAisles(data.aisles);
      });
  }, []);

  if (session) {
    return (
      <>
        <SectionTitle>Gesture Detection In The Store</SectionTitle>
        {aisles.map((aisle, idx) => {
          return (
            <GestureDetection
              key={aisle._id + idx}
              aisleName={aisle.aisleName}
              fashionItem={aisle.fashionItem}
              updateCustomerGesture={updateCustomerGesture}
            />
          );
        })}
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

export default GestureRecognitionPage;
