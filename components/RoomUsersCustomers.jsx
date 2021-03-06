import { Paper, Stack } from "@mui/material";
import React from "react";
import CustomerBoardBox from "./CustomerBoardBox";

const RoomUsersCustomer = ({
  roomUsers,
  isCustomer,
  removeWorkerAndCustomer,
  isDroppable,
}) => {
  return (
    <div>
      <Paper
        style={{
          maxHeight: "80%",
          overflow: "auto",
          width: 85,
          position: "absolute",
          top: "60px",
          left: "15%",
        }}
      >
        <Stack direction="column" spacing={2}>
          {roomUsers?.map((user, index) => {
            if (isCustomer && user.username) {
              return (
                <CustomerBoardBox
                  isDroppable={isDroppable}
                  name={user.username}
                  color={stringToColor(user.username)}
                  id={index}
                  key={index}
                  removeWorkerAndCustomer={removeWorkerAndCustomer}
                />
              );
            }
          })}
        </Stack>
      </Paper>
    </div>
  );
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export default RoomUsersCustomer;
