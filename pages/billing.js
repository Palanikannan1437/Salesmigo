import styled from "@emotion/styled";
import BillingForm from "../components/Dashboard/BillingForm";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";
import { media } from "../utils/media";
const Billing = () => {
  return (
    <div>
      <SectionTitle>Enter Billing Details</SectionTitle>
      <ContactContainer>
        <BillingForm />
      </ContactContainer>
    </div>
  );
};
const ContactContainer = styled.div`
  display: flex;
  position: relative;
  top: 60px;
  left: 35%;
  ${media("<=tablet")} {
    flex-direction: column;
  }
`;

export default Billing;
