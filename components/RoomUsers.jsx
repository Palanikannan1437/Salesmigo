import { Paper, Stack } from "@mui/material";
import React from "react";
import Worker from "./Worker";

const RoomUsers = ({ roomUsers }) => {
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
            if (
              user.type !== "Manager" &&
              user.status === "Available" &&
              user.username
            ) {
              return (
                <Worker
                  name={user.username}
                  photoUrl={user.photoUrl}
                  id={index}
                  key={index}
                />
              );
            }
          })}
        </Stack>
      </Paper>
    </div>
  );
};

export default RoomUsers;
