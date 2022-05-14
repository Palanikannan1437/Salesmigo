import React, { useEffect, useState } from "react";
import FileUpload from "../components/Files/FileUpload";
import RegisterCustomer from "../components/RegisterCustomer";

const RegisterCustomerPage = () => {
  const [filesToUpload, setFilesToUpload] = useState([]);

  const updateFileToSend = (files) => {
    setFilesToUpload(files);
  };
  return (
    <div>
      <RegisterCustomer filesToUpload={filesToUpload} />
      <FileUpload updateFilesToSend={updateFileToSend} />
    </div>
  );
};

export default RegisterCustomerPage;
