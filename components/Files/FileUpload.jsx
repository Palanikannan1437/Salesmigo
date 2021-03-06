import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import SingleFileProgress from "./SingleFileProgress";

const FileUpload = (props) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((prevFiles) => [...prevFiles, ...mappedAcc, ...rejFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onUpload = (file, url) => {
    setFiles((currFiles) =>
      currFiles.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url: url, status: "uploaded" };
        }
        return { ...fw };
      })
    );
  };

  useEffect(() => {
    props.updateFilesToSend(files);
  }, [files]);

  const onDelete = (file) => {
    setFiles((currFiles) => currFiles.filter((fw) => fw.file !== file));
  };

  return (
    <div
      {...getRootProps()}
      style={{
        color: "black",
        border: "solid",
        height: "20rem",
        width: "40rem",
      }}
    >
      <input {...getInputProps()} />

      <h3>Upload any 3 Photos of the Customer By Dragging photos to here</h3>

      {files.map((fileWrapper, indx) => {
        return (
          <SingleFileProgress
            onDelete={onDelete}
            onUpload={onUpload}
            file={fileWrapper.file}
            key={indx}
          />
        );
      })}
    </div>
  );
};

export default FileUpload;
