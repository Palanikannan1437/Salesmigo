import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SingleFileProgress from "./SingleFileProgress";

const FileUpload = () => {
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

  const onDelete = (file) => {
    setFiles((currFiles) => currFiles.filter((fw) => fw.file !== file));
  };

  return (
    <div {...getRootProps()} style={{ color: "black" }}>
      <input {...getInputProps()} />

      <p>Drag 'n' drop some files here, or click to select files</p>

      {JSON.stringify(files)}

      {files.map((fileWrapper, indx) => {
        if (fileWrapper.status === "uploaded") {
          return null;
        } else {
          return (
            <SingleFileProgress
              onDelete={onDelete}
              onUpload={onUpload}
              file={fileWrapper.file}
              key={indx}
            />
          );
        }
      })}
    </div>
  );
};

export default FileUpload;
