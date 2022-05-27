import { Avatar, Paper, Stack, Tooltip } from "@mui/material";
import React from "react";

const OccupiedWorkers = ({ roomUsers }) => {
  return (
    <div>
      <Paper
        style={{
          maxHeight: "80vh",
          overflow: "auto",
          width: "100vw",
          marginTop: "50vh",
          marginBottom: "20vh",
        }}
      >
        <Stack direction="row" spacing={2}>
          {roomUsers?.map((user, index) => {
            if (
              user.type !== "Manager" &&
              user.status === "Occupied" &&
              user.username
            ) {
              return (
                <Tooltip title={user.username} key={index}>
                  <Avatar
                    sx={{ width: 80, height: 80 }}
                    alt={user.username}
                    src={user.photoUrl}
                  />
                </Tooltip>
              );
            }
          })}
        </Stack>
      </Paper>
    </div>
  );
};

export default OccupiedWorkers;
