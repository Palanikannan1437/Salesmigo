import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import styled from "styled-components";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { media } from "../../utils/media";
import Button from "../HelperComponents/Button";
import Container from "../PageStructureComponents/Container";
import Drawer from "../HelperComponents/Drawer";
import { HamburgerIcon } from "../IconComponents/HamburgerIcon";
import Logo from "../IconComponents/Logo";

import AuthContext from "../../store/auth-context";
import { removeCookies } from "cookies-next";

export default function Navbar({ items, isGoogleLoggedIn }) {
  const router = useRouter();
  const { toggle } = Drawer.useDrawer();

  const [scrollingDirection, setScrollingDirection] = useState("none");

  let lastScrollY = useRef(0);
  const lastRoute = useRef("");
  const stepSize = useRef(50);

  useScrollPosition(
    scrollPositionCallback,
    [router.asPath],
    undefined,
    undefined,
    50
  );

  function scrollPositionCallback({ currPos }) {
    const routerPath = router.asPath;
    const hasRouteChanged = routerPath !== lastRoute.current;

    if (hasRouteChanged) {
      lastRoute.current = routerPath;
      setScrollingDirection("none");
      return;
    }

    const currentScrollY = currPos.y;
    const isScrollingUp = currentScrollY > lastScrollY.current;
    const scrollDifference = Math.abs(lastScrollY.current - currentScrollY);
    const hasScrolledWholeStep = scrollDifference >= stepSize.current;
    const isInNonCollapsibleArea = lastScrollY.current > -50;

    if (isInNonCollapsibleArea) {
      setScrollingDirection("none");
      lastScrollY.current = currentScrollY;
      return;
    }

    if (!hasScrolledWholeStep) {
      lastScrollY.current = currentScrollY;
      return;
    }

    setScrollingDirection(isScrollingUp ? "up" : "down");
    lastScrollY.current = currentScrollY;
  }

  const isNavbarHidden = scrollingDirection === "down";
  const isTransparent = scrollingDirection === "none";

  return (
    <NavbarContainer hidden={isNavbarHidden} transparent={isTransparent}>
      <Content>
        <NextLink href="/" passHref>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </NextLink>
        <NavItemList>
          {items.map((singleItem, idx) => (
            <NavItem
              key={singleItem.href + idx}
              {...singleItem}
              isGoogleLoggedIn={isGoogleLoggedIn}
            />
          ))}
        </NavItemList>

        <HamburgerMenuWrapper>
          <HamburgerIcon aria-label="Toggle menu" onClick={toggle} />
        </HamburgerMenuWrapper>
      </Content>
    </NavbarContainer>
  );
}

const signOutEntirely = () => {
  localStorage.clear();
  removeCookies("google-jwt");
  signOut({
    callbackUrl: `${window.location.origin}`,
  });
};

function NavItem({ href, title, outlined, isGoogleLoggedIn }) {
  if (outlined) {
    return (
      <CustomButton onClick={isGoogleLoggedIn ? signOutEntirely : signIn}>
        {title}
      </CustomButton>
    );
  }

  return (
    <NavItemWrapper outlined={outlined}>
      <NextLink href={href} passHref>
        <a>{title}</a>
      </NextLink>
    </NavItemWrapper>
  );
}

const CustomButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  line-height: 1.8;
`;

const NavItemList = styled.div`
  display: flex;
  list-style: none;

  ${media("<desktop")} {
    display: none;
  }
`;

const HamburgerMenuWrapper = styled.div`
  ${media(">=desktop")} {
    display: none;
  }
`;

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;

  color: rgb(var(--logoColor));
`;

const NavItemWrapper = styled.li`
  background-color: ${(p) =>
    p.outlined ? "rgb(var(--primary))" : "transparent"};
  border-radius: 0.5rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;

  &:hover {
    background-color: ${(p) =>
      p.outlined ? "rgb(var(--primary), 0.8)" : "transparent"};
    transition: background-color 0.2s;
  }

  a {
    display: flex;
    color: ${(p) =>
      p.outlined ? "rgb(var(--textSecondary))" : "rgb(var(--text), 0.75)"};
    letter-spacing: 0.025em;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1.5rem 0;
  width: 100%;
  height: 8rem;
  z-index: var(--z-navbar);

  background-color: rgb(var(--navbarBackground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  visibility: ${(p) => (p.hidden ? "hidden" : "visible")};
  transform: ${(p) =>
    p.hidden
      ? `translateY(-8rem) translateZ(0) scale(1)`
      : "translateY(0) translateZ(0) scale(1)"};

  transition-property: transform, visibility, height, box-shadow,
    background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;

const Content = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
