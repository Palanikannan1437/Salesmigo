import styled from "styled-components";
import BasicSection from "../components/LandingPage/BasicSection";
import Page from "../components/PageStructureComponents/Page";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";

export default function PricingPage() {
  return (
    <Page
      title="Workflow"
      description="Cupidatat et reprehenderit ullamco aute ullamco anim tempor."
    >
      <SectionTitle style={{ marginBottom: "6rem" }}>
        How will the workflow be like?
      </SectionTitle>
      <WhiteBackgroundContainer>
        <BasicSection
          imageUrl="/mainIllustration.jpg"
          title="Customer enters your Store"
          overTitle="Step 1"
          angle={0}
        >
          <p>
            As soon as customers enter, the camera recognizes them from the
            existing customer database with little to no delay at all,
            regardless of the size of the customer base. If they are first-time
            customers, they can easily register themselves with the camera, and
            their entry is automatically recorded. The recognition and recording
            process is done with minimized effort and expenditure from your
            side, allowing for smooth and effective translation.
          </p>
        </BasicSection>

        <BasicSection
          imageUrl="/mainIllustration1.jpg"
          title="The store manager gets customers' data"
          overTitle="Step 2"
          reversed
          angle={0}
        >
          While the customers enter and are recognized in real-time, their
          information is immediately transferred to the manager, who can then
          easily allocate and assign available workers to those corresponding
          customers with negligible effort through this platform all in real
          time. This negates any hindrances in providing assistance to the
          customers, as the platform can easily handle and organize that.
        </BasicSection>
        <BasicSection
          imageUrl="/mainIllustration2.jpg"
          title="Your workers can now cater the customers"
          overTitle="Step 3"
          angle={0}
        >
          <p>
            The workers, who are instantly equipped with the details of their
            assigned customers like recommended purchases based on previous
            shopping experience,bill history,location and much more and can
            cater to them with utmost accuracy, precision and efficiency, based
            on what they require. This ensures that the customers receive
            uninterrupted, customized, and instantaneous support to make their
            shopping trip proceed with complete ease and comfortability.
          </p>
        </BasicSection>
      </WhiteBackgroundContainer>
    </Page>
  );
}

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;
