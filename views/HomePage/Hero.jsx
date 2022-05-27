import NextLink from "next/link";
import styled from "styled-components";
import Button from "../../components/HelperComponents/Button";
import ButtonGroup from "../../components/HelperComponents/ButtonGroup";
import Container from "../../components/PageStructureComponents/Container";
import HeroIllustration from "../../components/IconComponents/HeroIllustation";
import OverTitle from "../../components/PageStructureComponents/OverTitle";
// import { useNewsletterModalContext } from "contexts/newsletter-modal.context";
import { media } from "../../utils/media";

export default function Hero() {
  // const { setIsModalOpened } = useNewsletterModalContext();

  return (
    <HeroWrapper>
      <Contents>
        <CustomOverTitle>
          The only Sales Solution You'll ever need
        </CustomOverTitle>
        <Heading>Let your sales thrive with Salesamigo</Heading>
        <Description>
          Salesmigo is your key to multiplying your sales and maximizing the
          profits you make! Elevate your workforce to bring out the best in
          them, to achieve all new levels of efficiency, productivity and
          accuracy!
        </Description>
        <CustomButtonGroup>
          <NextLink href="/workflow" passHref>
            <Button>
              Check out our workflow <span>&rarr;</span>
            </Button>
          </NextLink>

          <NextLink href="/features" passHref>
            <Button transparent>
              Features <span>&rarr;</span>
            </Button>
          </NextLink>
        </CustomButtonGroup>
      </Contents>
      <ImageContainer>
        <HeroIllustration />
      </ImageContainer>
    </HeroWrapper>
  );
}

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 5rem;

  ${media("<=desktop")} {
    padding-top: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const Contents = styled.div`
  flex: 1;
  max-width: 60rem;

  ${media("<=desktop")} {
    max-width: 100%;
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;

  svg {
    max-width: 45rem;
  }

  ${media("<=desktop")} {
    margin-top: 2rem;
    justify-content: center;
    svg {
      max-width: 80%;
    }
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media("<=desktop")} {
    font-size: 1.5rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 7.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media("<=tablet")} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;
