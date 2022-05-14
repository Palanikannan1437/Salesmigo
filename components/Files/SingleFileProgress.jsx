import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileHeader from "./FileHeader";

const fileUpload = (file, onProgress) => {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  const key = "docs_upload_example_us_preset";
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (event) => rej(event);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);

    xhr.send(formData);
  });
};

const SingleFileProgress = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = async () => {
      try {
        const url = await fileUpload(props.file, setProgress);
        console.log(url);
        props.onUpload(props.file, url);
      } catch (error) {
        console.log(error);
      }
    };
    upload();
  }, []);
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FileHeader file={props.file} onDelete={props.onDelete} />
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            progress
          )}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default SingleFileProgress;
