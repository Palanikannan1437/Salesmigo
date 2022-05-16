import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FileUpload from "../components/Files/FileUpload";
import RegisterCustomer from "../components/RegisterCustomer";

const RegisterCustomerPage = () => {
  const [filesToUpload, setFilesToUpload] = useState([]);

  const updateFileToSend = (files) => {
    setFilesToUpload(files);
  };

  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <RegisterCustomer filesToUpload={filesToUpload} />
        <FileUpload updateFilesToSend={updateFileToSend} />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default RegisterCustomerPage;
