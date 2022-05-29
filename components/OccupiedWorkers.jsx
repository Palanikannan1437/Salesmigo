import { Avatar, Paper, Stack, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

const OccupiedWorkers = ({ roomUsers }) => {
  const [removedDuplicateInstances, setRemovedDuplicateInstances] =
    useState(roomUsers);

  useEffect(() => {
    setRemovedDuplicateInstances((duplicateUsers) => {
      return roomUsers.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.email === value.email)
      );
    });
  }, [roomUsers]);

  console.log(removedDuplicateInstances);
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
          {removedDuplicateInstances?.map((user, index) => {
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
