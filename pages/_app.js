import { getSession, SessionProvider } from "next-auth/react";
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
  const [globalSession, setglobalSession] = useState(null);

  const handleNavItems = (id, text, isSignedIn) => {
    setNavItems((prevData) =>
      prevData.map((el, index) => {
        return index === id
          ? { ...el, title: text, isSignedIn: isSignedIn }
          : el;
      })
    );
  };

  useEffect(() => {
    const getMySession = async () => {
      const session = await getSession();
      setglobalSession(session);
    };
    getMySession();
  }, []);

  useEffect(() => {
    if (globalSession) {
      handleNavItems(3, "SIGN OUT");
    }
  }, [globalSession]);

  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);

  useEffect(() => {
    if (globalSession) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/employees/login-google`, {
        method: "POST",
        body: JSON.stringify({
          idToken: globalSession.idToken,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${globalSession.idToken}`,
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 404 || response.status === 500) {
            // router.push(`/error-page/${response.status}`);
            signOut();
          }
          return response.json();
        })
        .then((data) => {
          console.log("from backend", data);
          if (data.status === "Login Successful") {
            setIsGoogleLoggedIn(true);
            localStorage.setItem("teamID", data.employee.teamId);
            localStorage.setItem("id", data.employee.id);
            localStorage.setItem("designation", data.employee.designation);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [globalSession]);

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
        <Navbar items={navItems} isGoogleLoggedIn={isGoogleLoggedIn} />
        <SessionProvider session={session}>
          <AuthContextProvider>
            <SocketContext.Provider value={socket}>
              <Component
                {...pageProps}
                handleNavItems={handleNavItems}
                isGoogleLoggedIn={isGoogleLoggedIn}
              />
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
