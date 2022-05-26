import NextLink from "next/link";
// import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share';
import styled from "styled-components";
import Container from "../PageStructureComponents/Container";
import { media } from "../../utils/media";

const footerItems = [
  {
    title: "Company",
    items: [
      { title: "Privacy Policy", href: "/" },
      { title: "Cookies Policy", href: "/" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Features", href: "/features" },
      { title: "Pricing", href: "/pricing" },
      { title: "Something else", href: "/" },
      { title: "And something else", href: "/" },
    ],
  },
  {
    title: "Knowledge",
    items: [
      { title: "Contact", href: "/contact" },
      { title: "Blog", href: "/" },
      { title: "FAQ", href: "/pricing" },
      { title: "Help Center", href: "/" },
    ],
  },
  {
    title: "Something",
    items: [
      { title: "Workflow", href: "/" },
      { title: "Coming Soon", href: "/" },
      { title: "Coming Soon", href: "/" },
      { title: "Coming Soon", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <ListContainer>
          {footerItems.map((singleItem) => (
            <FooterList key={singleItem.title} {...singleItem} />
          ))}
        </ListContainer>
        <BottomBar>
          <Copyright>&copy; Copyright 2021 Salesmigo</Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

function FooterList({ title, items }) {
  return (
    <ListWrapper>
      <ListHeader>{title}</ListHeader>
      {items.map((singleItem) => (
        <ListItem key={singleItem.href} {...singleItem} />
      ))}
    </ListWrapper>
  );
}

function ListItem({ title, href }) {
  return (
    <ListItemWrapper>
      <NextLink href={href} passHref>
        <a>{title}</a>
      </NextLink>
    </ListItemWrapper>
  );
}

const FooterWrapper = styled.div`
  padding-top: 10rem;
  padding-bottom: 4rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListHeader = styled.p`
  font-weight: bold;
  font-size: 2.25rem;
  margin-bottom: 2.5rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  margin-right: 5rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  ${media("<=tablet")} {
    flex: 0 40%;
    margin-right: 1.5rem;
  }

  ${media("<=phone")} {
    flex: 0 100%;
    margin-right: 0rem;
  }
`;

const ListItemWrapper = styled.p`
  font-size: 1.6rem;

  a {
    text-decoration: none;
    color: rgba(var(--textSecondary), 0.75);
  }
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

const BottomBar = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media("<=tablet")} {
    flex-direction: column;
  }
`;
