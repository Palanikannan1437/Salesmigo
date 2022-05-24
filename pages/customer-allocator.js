import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomerAllocation from "../components/CustomerAllocation/CustomerAllocation";
import ProgressBar from "../components/HelperComponents/ProgressBar";

import { SocketContext } from "../utils/socket";

const CustomerAllocatorPage = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const socket = useContext(SocketContext);
  const [socketStatus, setSocketStatus] = useState(false);

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
      if (session) {
        console.log("session = true");
      } else {
        console.log("first");
        router.push("/");
      }
    } else {
      setIsLoading(true);
    }
  }, [router, session]);

  useEffect(() => {
    console.log("useeffect called");

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
      }, 1000);
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
