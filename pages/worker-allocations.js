import React from "react";
import { ToastContainer } from "react-toastify";
import ProgressBar from "../components/HelperPages/ProgressBar";
import RoomUsers from "../components/RoomUsers";
import WorkerAllocation from "../components/WorkerAllocation/WorkerAllocation";

const WorkerAllocationsPage = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      props.handleNavItems(3, "SIGN OUT", true);
    }
  }, [session]);

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
      console.log("customer found data",data)
      setRoomDataCustomers(..)
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
