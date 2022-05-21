import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "../../utils/socket";
import { useSession } from "next-auth/react";
import Sub from "./sub";
import AuthContext from "../store/auth-context";

const CustomerAllocation = ({ socket }) => {
  const { data: session } = useSession();
  const authCtx = useContext(AuthContext);

  console.log(session?.user.name);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/teams/${authCtx.teamID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  //send data of a worker to inform others that have joined
  const sendUserData = () => {
    if (session) {
      socket.emit("joinRoom", {
        name: session?.user.name,
        email: session?.user.email,
        type: authCtx.designation,
        teamID: authCtx.teamID,
      });
    }
  };

  return (
    <div>
      <button onClick={sendUserData}>Join Room</button>
      <Sub socket={socket} />
      <ToastContainer />
    </div>
  );
};

export default CustomerAllocation;
