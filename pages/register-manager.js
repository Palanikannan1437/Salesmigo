import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";
import RegisterManager from "../components/RegisterManager";
import { media } from "../utils/media";
export default function Home() {
  return (
    <>
      <ToastContainer />
      <SectionTitle>Enter Manager and Store Details</SectionTitle>
      <ContactContainer>
        <RegisterManager />
      </ContactContainer>
    </>
  );
}

const ContactContainer = styled.div`
  display: flex;
  position: relative;
  top: 40px;
  left: 35%;
  ${media("<=tablet")} {
    flex-direction: column;
  }
`;
