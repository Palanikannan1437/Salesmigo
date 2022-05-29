import React, { useCallback, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AuthContext from "../../store/auth-context";
import RoomUsersCustomer from "../RoomUsersCustomers";
import RoomUsers from "../RoomUsers";
import OccupiedWorkers from "../OccupiedWorkers";
import styled from "@emotion/styled";
import SectionTitle from "../PageStructureComponents/SectionTitle";
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
    console.log(customerId, workerId, "removing indexes");
    setRoomData((prevRoomData) => {
      prevRoomData.users.forEach((worker, index) => {
        if (index === workerId) {
          console.log(worker, "removed worker");
          worker.status = "Occupied";
          setAllocatedWorker(worker);
        }
      });
      return { ...prevRoomData };
    });
    setCustomerRoomData((prevCustomerRoomData) =>
      prevCustomerRoomData.filter((customer, index) => {
        console.log(customer);
        if (index === customerId) {
          console.log(customer, "removed customer");
          setAllocatedCustomer(customer);
        }
        return index !== customerId;
      })
    );
  };
  console.log(customerRoomData, "room data of customers");

  //emitting an event when customer is allocated a worker
  useEffect(() => {
    console.log(allocatedWorker, allocatedCustomer, "allocated cust and work");
    socket.emit("AllocationOfCustomer", {
      worker: allocatedWorker,
      customer: allocatedCustomer,
    });
  }, [allocatedCustomer, allocatedWorker]);

  const totalUsers = useCallback((data) => {
    console.log("from socket!!!!!!!!", data);
    setRoomData(data);
  }, []);

  const totalCustomers = useCallback((data) => {
    console.log("customer found", data);
    setCustomerRoomData(data);
  }, []);
  //listening to all socket events
  useEffect(() => {
    socket.on("roomUsers", totalUsers);
    socket.on("customerFound", totalCustomers);
    return () => {
      socket.off("roomUsers", totalUsers);
      socket.off("customerFound", totalCustomers);
    };
  }, [socket]);

  //getting the team details of the user
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/teams/${
        typeof window !== "undefined" ? localStorage.getItem("teamID") : null
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [typeof window]);

  console.log(roomData);
  return (
    <div>
      <ToastContainer />
      <div>
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          {"MANAGER'S ROOM"} - {session?.user.name.split(" ")[0]}
        </h2>
      </div>
      <DndProvider backend={HTML5Backend}>
        <AllocationGroup>
          <AllocationSubGroup>
            <h1>Available Customers</h1>
            <RoomUsersCustomer
              roomUsers={customerRoomData}
              isCustomer={true}
              removeWorkerAndCustomer={removeWorkerAndCustomer}
              isDroppable="yes"
            />
          </AllocationSubGroup>
          <AllocationSubGroup>
            <h1>Available Worker Instances</h1>
            <RoomUsers roomUsers={roomData.users} />
          </AllocationSubGroup>
        </AllocationGroup>
      </DndProvider>
      {/* <OccupiedWorkers roomUsers={roomData.users} /> */}
    </div>
  );
};

const AllocationGroup = styled.div`
  display: flex;
  margin-top: 10px;
  width: 60vw;
  height: 70vh;
  border: solid black;
  position: relative;
  left: 20%;
  margin-bottom: 10px;
  & > *:first-child {
    margin-right: 2rem;
  }
`;

const AllocationSubGroup = styled.div`
  display: flex;
  margin-top: 10px;
  width: 60vw;
  height: 70vh;
  /* border: solid black; */
  position: relative;
  left: 10%;
  margin-bottom: 10px;
  & > *:first-child {
    margin-right: 2rem;
  }
`;

export default CustomerAllocation;
