import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ProgressBar from "../components/HelperComponents/ProgressBar";
import RoomUsers from "../components/RoomUsers";
import WorkerAllocation from "../components/WorkerAllocation/WorkerAllocation";
import { SocketContext } from "../utils/socket";
import "react-toastify/dist/ReactToastify.css";

const WorkerAllocationsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const socket = useContext(SocketContext);
  const { data: session } = useSession();

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
  console.log(socket);

  useEffect(() => {
    socket.emit("workerFree", session?.user.email);
  }, []);

  return (
    <div>
      <ProgressBar open={isLoading} />
      <WorkerAllocation socket={socket} />

      {socket.connected ? (
        <h2 style={{ color: "grey" ,textAlign: "center", marginTop: "20px" }}>
          {"You're Online"}
        </h2>
      ) : (
        <h2 style={{ color: "grey" ,textAlign: "center", marginTop: "20px" }}>
          {"You're Offline: Please try again by refreshing"}
        </h2>
      )}
      {/* <RoomUsers roomUsers={roomData.users} /> */}
      <ToastContainer />
    </div>
  );
};

export default WorkerAllocationsPage;
