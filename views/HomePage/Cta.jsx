import NextLink from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "../../components/HelperComponents/Button";
import ButtonGroup from "../../components/HelperComponents/ButtonGroup";
import Container from "../../components/PageStructureComponents/Container";
import OverTitle from "../../components/PageStructureComponents/OverTitle";
import SectionTitle from "../../components/PageStructureComponents/SectionTitle";
import { media } from "../../utils/media";

export default function Cta() {
  return (
    <CtaWrapper>
      <Container>
        <Stack>
          <OverTitle>Lorem ipsum dolor sit amet</OverTitle>
          <SectionTitle>
            Have Any Queries Related to Pricing and Features?
          </SectionTitle>
          <Description>
            Feel free to reach out to us at akashmalinimurugu@gmail.com
          </Description>
          <ButtonGroup>
            <NextLink href="/workflow" passHref>
              <Button>
                Check out our workflow<span>&rarr;</span>
              </Button>
            </NextLink>
            <NextLink href="/features" passHref>
              <OutlinedButton transparent>
                Features <span>&rarr;</span>
              </OutlinedButton>
            </NextLink>
          </ButtonGroup>
        </Stack>
      </Container>
    </CtaWrapper>
  );
}

const Description = styled.div`
  font-size: 1.8rem;
  color: rgba(var(--textSecondary), 0.8);
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12.5rem 0;
  color: rgb(var(--textSecondary));
  text-align: center;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) {
    max-width: 80%;
    margin-top: 4rem;
  }

  ${media("<=tablet")} {
    text-align: center;

    & > *:not(:first-child) {
      max-width: 100%;
      margin-top: 2rem;
    }
  }
`;

const OutlinedButton = styled(Button)`
  border: 1px solid rgb(var(--textSecondary));
  color: rgb(var(--textSecondary));
`;

const CtaWrapper = styled.div`
  background: rgb(var(--secondary));
`;
