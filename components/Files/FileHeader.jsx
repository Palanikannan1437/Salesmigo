import { Button } from "@mui/material";
import React from "react";

const FileHeader = (props) => {
  return (
    <div>
      {props.file.name}
      <Button size="small" onClick={() => props.onDelete(props.file)}>Delete</Button>
    </div>
  );
};

export default FileHeader;
