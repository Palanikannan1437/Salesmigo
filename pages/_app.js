import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { socket, SocketContext } from "../utils/socket";
import { AuthContextProvider } from "../components/store/auth-context";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <SocketContext.Provider value={socket}>
          <Component {...pageProps} />
        </SocketContext.Provider>
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
