import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomerAllocation from "../components/CustomerAllocation/CustomerAllocation";
import { SocketContext } from "../utils/socket";

const CustomerAllocatorPage = (props) => {
  const { data: session } = useSession();

  const [socketStatus, setSocketStatus] = useState(false);
  //get team details of an employee
  const [roomData, setRoomData] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const socketConnected = () => {
      setSocketStatus(true);
      toast("connection established");
    };

    const socketDisconnected = () => {
      setSocketStatus(false);
      toast("disconnected");
    };
    socket.on("connect", socketConnected);
    socket.on("disconnect", socketDisconnected);

    return () => {
      socket.off("connect", socketConnected);
      socket.off("disconnect", socketDisconnected);
      setTimeout(() => {
        socket.disconnect();
      }, 100);
    };
  }, [socket]);

  useEffect(() => {
    const totalUsers = (data) => {
      console.log(data);
      setRoomData(data);
    };

    const foundUser = (data) => {
      toast(data);
    };

    socket.on("roomUsers", totalUsers);
    socket.on("customerFound", foundUser);
    return () => {
      socket.off("roomUsers", totalUsers);
      socket.off("customerFound", foundUser);
    };
  }, [socket]);
  return (
    <div>
      <CustomerAllocation socket={socket} />
      <ToastContainer />
    </div>
  );
};

export default CustomerAllocatorPage;
