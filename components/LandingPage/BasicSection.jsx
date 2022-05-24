import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { media } from "../../utils/media";
import Container from "../PageStructureComponents/Container";
import OverTitle from "../PageStructureComponents/OverTitle";
import RichText from "../PageStructureComponents/RichText";

export default function BasicSection({
  imageUrl,
  title,
  overTitle,
  reversed,
  children,
}) {
  return (
    <BasicSectionWrapper reversed={reversed}>
      <ImageContainer>
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </ImageContainer>
      <ContentContainer>
        <CustomOverTitle>{overTitle}</CustomOverTitle>
        <Title>{title}</Title>
        <RichText>{children}</RichText>
      </ContentContainer>
    </BasicSectionWrapper>
  );
}

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media("<=tablet")} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`;

const ImageContainer = styled.div`
  flex: 1;

  position: relative;
  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: calc((9 / 16) * 100%);
  }

  & > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  ${media("<=desktop")} {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const BasicSectionWrapper = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: ${(p) => (p.reversed ? "row-reverse" : "row")};

  ${ImageContainer} {
    margin: ${(p) => (p.reversed ? "0 0 0 5rem" : "0 5rem 0 0")};
  }

  ${media("<=desktop")} {
    flex-direction: column;

    ${ImageContainer} {
      margin: 0 0 2.5rem 0;
    }
  }
`;
