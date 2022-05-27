import React, { useCallback, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import AuthContext from "../../store/auth-context";
import RoomUsersCustomerWithChoice from "./RoomUsersCustomersWithChoice";
import Button from "../HelperComponents/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { media } from "../../utils/media";
import styled from "@emotion/styled";

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

  const totalUsers = useCallback((data) => {
    setRoomData(data);
  }, []);
  const receivedCustomerData = useCallback((data) => {
    setCustomerRoomData((prevData) => [...prevData, data]);
  }, []);

  //listening to all socket events
  useEffect(() => {
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
        authCtx.setTeamID(data.teamData[0]._id);
      })
      .catch((err) => console.log(err));
  }, [authCtx.teamID]);

  //send data of a worker to inform others that have joined
  const sendUserData = () => {
    if (session) {
      for (let i = 0; i < customerNumber; i++) {
        socket.emit("joinRoom", {
          name: session?.user.name,
          email: session?.user.email,
          type: authCtx.designation,
          teamID: authCtx.teamID,
          photoUrl: session?.user.image,
        });
      }
    }
  };

  const [customerNumber, setCustomerNumber] = React.useState(0);

  const handleChange = (event) => {
    setCustomerNumber(event.target.value);
  };

  useEffect(() => {
    socket.on("customersOfWorker", (data) => {
      console.log(data);
      setCustomerRoomData(data[0]);
    });
  }, [socket]);
  return (
    <div>
      <ToastContainer />
      <ButtonGroup>
        <Button onClick={sendUserData}>I can cater </Button>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Number of Customers
          </InputLabel>
          <Select
            autoWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={customerNumber}
            label="Number of Customers"
            onChange={handleChange}
            sx={{ marginLeft: "10px", position: "relative", top: "5px" }}
          >
            <MenuItem value={0}>No Customers</MenuItem>
            <MenuItem value={1}>One Customers</MenuItem>
            <MenuItem value={2}>Two Customers</MenuItem>
            <MenuItem value={3}>Three Customers</MenuItem>
            <MenuItem value={4}>Four Customers</MenuItem>
          </Select>
        </FormControl>
      </ButtonGroup>
      <RoomUsersCustomerWithChoice
        roomUsers={customerRoomData}
        isCustomer={true}
      />
    </div>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  width: 300px;

  flex-direction: row;
  & > * {
    flex: 1;
  }

  ${media("<=tablet")} {
    flex-direction: column;
    & > *:first-child {
      margin-right: 0rem;
      margin-bottom: 2rem;
    }
  }
`;

export default WorkerAllocation;
