import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomerAllocation from "../components/CustomerAllocation/CustomerAllocation";
import ProgressBar from "../components/HelperComponents/ProgressBar";

import { SocketContext } from "../utils/socket";

const CustomerAllocatorPage = (props) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      props.handleNavItems(3, "SIGN OUT", true);
    }
  }, [session]);

  const socket = useContext(SocketContext);
  const [socketStatus, setSocketStatus] = useState(false);

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
      // setTimeout(() => {
      //   socket.disconnect();
      // }, 100);
    };
  }, [socket]);

  return (
    <div>
      <ProgressBar open={isLoading} />
      <CustomerAllocation socket={socket} />
      <ToastContainer />
    </div>
  );
};

export default CustomerAllocatorPage;
