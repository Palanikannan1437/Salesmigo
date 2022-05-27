import React from "react";
import styled from "styled-components";
import AutofitGrid from "../../components/PageStructureComponents/AutofitGrid";
import BasicCard from "../../components/CardComponents/BasicCard";
import Container from "../../components/PageStructureComponents/Container";
import OverTitle from "../../components/PageStructureComponents/OverTitle";
import SectionTitle from "../../components/PageStructureComponents/SectionTitle";
import { media } from "../../utils/media";

const FEATURES = [
  {
    imageUrl: "/grid-icons/asset-1.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
  {
    imageUrl: "/grid-icons/asset-2.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
  {
    imageUrl: "/grid-icons/asset-3.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
  {
    imageUrl: "/grid-icons/asset-4.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
  {
    imageUrl: "/grid-icons/asset-5.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
  {
    imageUrl: "/grid-icons/asset-6.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
  {
    imageUrl: "/grid-icons/asset-7.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
  {
    imageUrl: "/grid-icons/asset-8.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
  {
    imageUrl: "/grid-icons/asset-9.svg",
    title: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?",
  },
];

export default function Features() {
  return (
    <Container>
      <Content>
        <OverTitle>features</OverTitle>
        <SectionTitle>What are you signing in for?</SectionTitle>
      </Content>

      <CustomAutofitGrid>
        {FEATURES.map((singleFeature, idx) => (
          <BasicCard key={singleFeature.title + idx} {...singleFeature} />
        ))}
      </CustomAutofitGrid>
    </Container>
  );
}

const Content = styled.div`
  margin-top: 15rem;
  margin-bottom: 5rem;
  & > *:not(:first-child) {
    margin-top: 2rem;
  }
  text-align: center;
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media("<=tablet")} {
    --autofit-grid-item-size: 30rem;
  }

  ${media("<=phone")} {
    --autofit-grid-item-size: 100%;
  }
`;
