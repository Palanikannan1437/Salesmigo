import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";

const Sub = (props) => {

  const emit = () => {
    props.socket.emit("customer");
    console.log("emitted");
  };
  return (
    <div>
      <button onClick={emit}>Emit</button>
    </div>
  );
};

export default Sub;
