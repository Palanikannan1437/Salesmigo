import { Avatar, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useDrag } from "react-dnd";

const Worker = (props) => {
  const [type, setType] = useState("yes");
  //useDrag hook react DnD
  const [{ isDragging }, drag] = useDrag({
    type: type,
    item: { name: props.name, id: props.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      className="question-div"
      style={{
        color: props.color,
      }}
    >
      {!isDragging ? (
        <div ref={drag} style={{ cursor: "pointer" }}>
          <Tooltip title={props.name}>
            <Avatar
              sx={{ width: 80, height: 80 }}
              alt={props.name}
              src={props.photoUrl}
            />
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default Worker;
