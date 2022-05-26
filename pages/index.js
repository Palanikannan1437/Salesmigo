import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Login from "../components/Login";
import styled from "styled-components";
import BasicSection from "../components/LandingPage/BasicSection";
import Cta from "../views/HomePage/Cta";
import Features from "../views/HomePage/Features";
import Hero from "../views/HomePage/Hero";
import Partners from "../views/HomePage/Partners";
import Head from "next/head";
import Link from "next/link";
import SectionTitle from "../components/PageStructureComponents/SectionTitle";

export default function Home(props) {
  const { data: session } = useSession();
  
  return (
    <>
      <Head>
        <title>Salesamigo</title>
        <meta name="description" content="Improve sales using face detection" />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <SectionTitle>How will the workflow be like?</SectionTitle>

          <BasicSection
            imageUrl="/mainIllustration.jpg"
            title="Customer enters your Store"
            overTitle="Step 1"
            angle={0}
          >
            <p>
              As soon as customers enter, the camera recognizes them from the
              existing customer database with little to no delay at all,
              regardless of the size of the customer base. If they are
              first-time customers, they can easily register themselves with the
              camera, and their entry is automatically recorded. The recognition
              and recording process is done with minimized effort and
              expenditure from your side, allowing for smooth and effective
              translation.
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
              cater to them with utmost accuracy, precision and efficiency,
              based on what they require. This ensures that the customers
              receive uninterrupted, customized, and instantaneous support to
              make their shopping trip proceed with complete ease and
              comfortability.
            </p>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
        </DarkerBackgroundContainer>
        <Features />
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(26, 32, 44);

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;
