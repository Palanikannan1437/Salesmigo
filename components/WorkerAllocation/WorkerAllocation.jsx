import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import AuthContext from "../../store/auth-context";
import RoomUsersCustomer from "../RoomUsersCustomers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import RoomUsersCustomerWithChoice from "./RoomUsersCustomersWithChoice";

const WorkerAllocation = ({ socket }) => {
  const { data: session } = useSession();
  const authCtx = useContext(AuthContext);
  const [roomData, setRoomData] = useState({
    users: [
      {
        id: "",
        username: "",
        room: "",
        email: "",
        photoUrl: "",
        type: "",
        status: "",
      },
    ],
    room: "",
  });

  const [customerRoomData, setCustomerRoomData] = useState([{ username: "" }]);

  //listening to all socket events
  useEffect(() => {
    const totalUsers = (data) => {
      console.log("from socket!!!!!!!!", data);
      setRoomData(data);
    };
    const receivedCustomerData = (data) => {
      console.log("received customer", data);
      setCustomerRoomData((prevData) => [...prevData, data]);
    };
    socket.on("roomUsers", totalUsers);
    socket.on("customerToWorker", receivedCustomerData);
    return () => {
      socket.off("roomUsers", totalUsers);
      socket.off("customerToWorker", receivedCustomerData);
    };
  }, [socket]);

  //getting the team details of the user
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/teams/${authCtx.teamID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [authCtx.teamID]);

  //send data of a worker to inform others that have joined
  const sendUserData = () => {
    if (session) {
      socket.emit("joinRoom", {
        name: session?.user.name,
        email: session?.user.email,
        type: authCtx.designation,
        teamID: authCtx.teamID,
        photoUrl: session?.user.image,
      });
    }
  };
  console.log(customerRoomData);
  return (
    <div>
      <ToastContainer />
      <RoomUsersCustomerWithChoice
        roomUsers={customerRoomData}
        isCustomer={true}
      />
      <button onClick={sendUserData}>Join Room</button>
    </div>
  );
};

export default WorkerAllocation;
