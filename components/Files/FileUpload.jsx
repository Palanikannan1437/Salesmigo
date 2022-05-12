import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SingleFileProgress from "./SingleFileProgress";

function FileUpload() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((accFiles, rejFiles) => {
    console.log("yo");
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((prevFiles) => [...prevFiles, ...mappedAcc, ...rejFiles]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onUpload = (file, url) => {
    console.log("safkjasdflkah ");
    setFiles((currFiles) =>
      currFiles.filter((fw) => {
        if (fw.file === file) {
          return { ...fw, url: url };
        } else {
          return fw;
        }
      })
    );
    console.log(files);
  };

  const onDelete = (file) => {
    setFiles((currFiles) => currFiles.map((fw) => fw.file !== file));
  };
  return (
    <div {...getRootProps()} style={{ color: "black" }}>
      <input {...getInputProps()} />

      <p>Drag 'n' drop some files here, or click to select files</p>

      {JSON.stringify(files)}
      {files.map((fileWrapper, indx) => {
        console.log("first");
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
}

export default FileUpload;
