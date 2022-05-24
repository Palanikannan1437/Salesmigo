import { SessionProvider, useSession } from "next-auth/react";
import { socket, SocketContext } from "../utils/socket";
import { AuthContextProvider } from "../store/auth-context";
import GlobalStyles from "../components/GlobalStyles";
import Head from "next/head";
import Navbar from "../components/LandingPage/Navbar";
import { useEffect, useState } from "react";
import NavigationDrawer from "../components/LandingPage/NavigationDrawer";
import { GeneralModalContextProvider } from "../store/modal-context";
import "../styles/globals.css";
import WaveCta from "../components/LandingPage/WaveCta";
import Footer from "../components/LandingPage/Footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [navItems, setNavItems] = useState([
    { title: "Awesome SaaS Features", href: "/features" },
    { title: "Pricing", href: "/pricing" },
    { title: "Contact", href: "/contact" },
    { title: "Sign In", href: "/sign-up", outlined: true },
  ]);

  const handleNavItems = (id, text, isSignedIn) => {
    setNavItems((prevData) =>
      prevData.map((el, index) => {
        return index === id
          ? { ...el, title: text, isSignedIn: isSignedIn }
          : el;
      })
    );
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <GlobalStyles />
      <Providers navItems={navItems}>
        <Navbar items={navItems} />
        <SessionProvider session={session}>
          <AuthContextProvider>
            <SocketContext.Provider value={socket}>
              <Component {...pageProps} handleNavItems={handleNavItems} />
            </SocketContext.Provider>
          </AuthContextProvider>
        </SessionProvider>
        <WaveCta />
        <Footer />
      </Providers>
    </>
  );
}

function Providers({ children, navItems }) {
  return (
    <GeneralModalContextProvider>
      <NavigationDrawer items={navItems}>{children}</NavigationDrawer>
    </GeneralModalContextProvider>
  );
}

export default MyApp;
