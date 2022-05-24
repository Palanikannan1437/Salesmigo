import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AuthContext from "../store/auth-context";
import RoomUsersCustomer from "../RoomUsersCustomers";
import RoomUsers from "../RoomUsers";
import OccupiedWorkers from "../OccupiedWorkers";

const CustomerAllocation = ({ socket }) => {
  const { data: session } = useSession();
  const authCtx = useContext(AuthContext);

  const [allocatedCustomer, setAllocatedCustomer] = useState();
  const [allocatedWorker, setAllocatedWorker] = useState();
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

  //allocating customers to a worker
  const removeWorkerAndCustomer = (customerId, workerId) => {
    setRoomData((prevRoomData) => {
      prevRoomData.users.forEach((worker, index) => {
        if (index !== workerId) {
          worker.status = "Occupied";
          setAllocatedWorker(worker);
        }
      });
      return { ...prevRoomData };
    });
    setCustomerRoomData((prevCustomerRoomData) =>
      prevCustomerRoomData.filter((customer, index) => {
        console.log(customer);
        if (index !== customerId) {
          setAllocatedCustomer(customer);
        }
        return index !== customerId;
      })
    );
  };

  //emitting an event when customer is allocated a worker
  useEffect(() => {
    console.log(allocatedWorker, allocatedCustomer, "allocated cust and work");
    socket.emit("AllocationOfCustomer", {
      worker: allocatedWorker,
      customer: allocatedCustomer,
    });
  }, [allocatedCustomer, allocatedWorker]);

  //listening to all socket events
  useEffect(() => {
    const totalUsers = (data) => {
      console.log("from socket!!!!!!!!", data);
      setRoomData(data);
    };

    const totalCustomers = (data) => {
      console.log(data);
      setCustomerRoomData(data);
    };

    socket.on("roomUsers", totalUsers);
    socket.on("customerFound", totalCustomers);
    return () => {
      socket.off("roomUsers", totalUsers);
      socket.off("customerFound", totalCustomers);
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
  console.log(roomData);
  return (
    <div>
      <ToastContainer />
      <button onClick={sendUserData}>Join Room</button>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex", width: "500px", border: "solid black" }}>
          <p>Available Customers</p>
          <RoomUsersCustomer
            roomUsers={customerRoomData}
            isCustomer={true}
            removeWorkerAndCustomer={removeWorkerAndCustomer}
          />
          <p>Available Workers</p>
          <RoomUsers roomUsers={roomData.users} />
        </div>
      </DndProvider>
      <OccupiedWorkers roomUsers={roomData.users} />
    </div>
  );
};

export default CustomerAllocation;
