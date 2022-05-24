import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ProgressBar from "../components/HelperComponents/ProgressBar";
import RoomUsers from "../components/RoomUsers";
import WorkerAllocation from "../components/WorkerAllocation/WorkerAllocation";
import { SocketContext } from "../utils/socket";

const WorkerAllocationsPage = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const [roomData, setRoomData] = useState({
    users: [
      { id: "", username: "", room: "", email: "", photoUrl: "", type: "" },
    ],
    room: "",
  });
  const [roomDataCustomers, setRoomDataCustomers] = useState({
    users: [{ username: "" }],
    room: "",
  });

  const socket = useContext(SocketContext);

  useEffect(() => {
    const socketConnected = () => {
      toast("connection established");
    };

    const socketDisconnected = () => {
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
      console.log("customer found data", data);
      // setRoomDataCustomers(..)
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
      <ProgressBar open={isLoading} />
      <WorkerAllocation socket={socket} />
      <RoomUsers roomUsers={roomData.users} />
      <ToastContainer />
    </div>
  );
};

export default WorkerAllocationsPage;
