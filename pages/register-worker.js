import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";
import RegisterWorker from "../components/RegisterWorker";
import { media } from "../utils/media";
export default function RegisterWorkerPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <SectionTitle>Enter Worker Details</SectionTitle>
        <ContactContainer>
          <RegisterWorker />
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
  top: 60px;
  left: 35%;
  ${media("<=tablet")} {
    flex-direction: column;
  }
`;
