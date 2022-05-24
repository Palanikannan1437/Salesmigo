import { Avatar, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useDrop } from "react-dnd";

const CustomerBoardBox = (props) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "yes",
    drop: (item) => {
      props.removeWorkerAndCustomer(props.id, item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} key={props.id}>
      <Tooltip title={props.name}>
        <Avatar
          sx={{
            bgcolor: props.color,
            width: 80,
            height: 80,
            fontSize: 40,
          }}
          src={"/customer.png"}
          alt={props.name}
          variant="square"
        />
      </Tooltip>
    </div>
  );
};

export default CustomerBoardBox;
