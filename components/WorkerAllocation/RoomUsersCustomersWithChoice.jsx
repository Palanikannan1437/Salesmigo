import { Avatar, Paper, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const RoomUsersCustomerWithChoice = ({ roomUsers, isCustomer }) => {
  const router = useRouter();

  return (
    <div>
      <Paper
        style={{
          maxHeight: "80vh",
          overflow: "auto",
          width: 85,
          margin: "auto",
          marginTop: "30px",
        }}
      >
        <Stack direction="column" spacing={2}>
          {roomUsers?.map((user, index) => {
            if (isCustomer && user.username) {
              return (
                <Tooltip title={user.username}>
                  <Avatar
                    sx={{
                      bgcolor: stringToColor(user.username),
                      width: 80,
                      height: 80,
                      fontSize: 40,
                    }}
                    src={"/customer.png"}
                    alt={user.username}
                    variant="square"
                    onClick={() => {
                      router.push(
                        `/customer-dashboard/${user.username.split("_")[1]}`
                      );
                    }}
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

export default RoomUsersCustomerWithChoice;
