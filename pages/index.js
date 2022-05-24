import { useSession } from "next-auth/react";
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

export default function Home(props) {
  const { data: session } = useSession();
  console.log(props);
  useEffect(() => {
    if (session) {
      props.handleNavItems(3, "SIGN OUT", true);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Salesamigo</title>
        <meta name="description" content="Improve sales using face detection" />
      </Head>
      <Login />
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          {/* <Partners /> */}
          <BasicSection
            imageUrl="/demo-illustration-1.svg"
            title="Lorem ipsum dolor sit amet consectetur."
            overTitle="sit amet gogo"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              quidem error incidunt a doloremque voluptatem porro inventore
              voluptate quo deleniti animi laboriosam.{" "}
              <Link href="/help-center">
                Possimus ullam velit rem itaque consectetur, in distinctio?
              </Link>{" "}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
              repellendus quia quos obcaecati nihil. Laudantium non accusantium,
              voluptate eum nesciunt at suscipit quis est soluta?
            </p>
          </BasicSection>
          <BasicSection
            imageUrl="/demo-illustration-2.svg"
            title="Lorem ipsum dolor sit."
            overTitle="lorem ipsum"
            reversed
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              quidem error incidunt a doloremque voluptatem porro inventore{" "}
              <strong>voluptate quo deleniti animi laboriosam</strong>. Possimus
              ullam velit rem itaque consectetur, in distinctio?
            </p>
            <ul>
              <li>Professional point 1</li>
              <li>Professional remark 2</li>
              <li>Professional feature 3</li>
            </ul>
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
