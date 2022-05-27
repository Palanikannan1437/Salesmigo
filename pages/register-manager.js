import styled from "@emotion/styled";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";
import RegisterManager from "../components/RegisterManager";
import { media } from "../utils/media";
export default function Home() {
  const { data: session } = useSession();

  if (session) {
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
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
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
