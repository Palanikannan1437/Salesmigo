import React, { useEffect, useState } from "react";
import EmotionDetection from "../components/FaceDetection/EmotionDetection";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";

//page for detecting customer emotions from various camera feeds from the store
const AisleEmotionDetection = () => {
  const [aisles, setAisles] = useState([
    { aisleName: "", fashionItem: "", priceRange: "", _id: "1" },
  ]);

  //updating customer emotion data from various aisles of the store in real time
  //for further analysis to show relevant suggestions to them
  const updateCustomerEmotion = (
    current_emotion,
    customer_email,
    aisleName
  ) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/customers/emotion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_emotion,
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
    console.log(current_emotion, customer_email, aisleName);
  };

  //getting number of aisles from db
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/aisles`)
      .then((response) => response.json())
      .then((data) => {
        setAisles(data.aisles);
      });
  }, []);

  return (
    <div>
      <SectionTitle>Aisles of the Shop</SectionTitle>
      {aisles.map((aisle) => {
        return (
          <EmotionDetection
            key={aisle._id}
            aisleName={aisle.aisleName}
            fashionItem={aisle.fashionItem}
            updateCustomerEmotion={updateCustomerEmotion}
          />
        );
      })}
    </div>
  );
};

export default AisleEmotionDetection;
