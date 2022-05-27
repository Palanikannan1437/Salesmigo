import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import FileUpload from "../components/Files/FileUpload";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";
import RegisterCustomer from "../components/RegisterCustomer";
import { media } from "../utils/media";

const RegisterCustomerPage = () => {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const { data: session } = useSession();

  const updateFileToSend = (files) => {
    setFilesToUpload(files);
  };

  if (session) {
    return (
      <>
        <ToastContainer />
        <SectionTitle>Enter Customer Details</SectionTitle>
        <ContactContainer>
          <RegisterCustomer filesToUpload={filesToUpload} />
          <FileContainer>
            <FileUpload updateFilesToSend={updateFileToSend} />
          </FileContainer>
        </ContactContainer>
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
const FileContainer = styled.div`
  position: relative;
  left: 30px;
  top: 10px;
  ${media("<=tablet")} {
    flex-direction: column;
  }
`;

const ContactContainer = styled.div`
  display: flex;
  position: relative;
  top: 60px;
  left: 20%;
  ${media("<=tablet")} {
    flex-direction: column;
  }
`;
export default RegisterCustomerPage;
