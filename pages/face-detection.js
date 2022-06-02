import { useSession } from "next-auth/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FaceDetection from "../components/FaceDetection/FaceDetection";
import AuthContext from "../store/auth-context";
import { SocketContext } from "../utils/socket";

import "react-toastify/dist/ReactToastify.css";

const CustomerRecognitionPage = (props) => {
  const { data: session } = useSession();
  const socket = useContext(SocketContext);
  const authCtx = useContext(AuthContext);

  const [roomData, setRoomData] = useState();
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (session) {
      socket.emit("joinRoom", {
        name: session?.user.name,
        email: session?.user.email,
        type: authCtx.designation,
        teamID:
          typeof window !== "undefined" ? localStorage.getItem("teamID") : null,
        photoUrl: session?.user.image,
      });
    }
  }, [session?.user.email, typeof window]);

  const totalUsers = useCallback((data) => {
    setJoined(true);
    setRoomData(data);
  }, []);

  useEffect(() => {
    socket.on("roomUsers", totalUsers);
    return () => {
      socket.off("roomUsers", totalUsers);
    };
  }, [socket]);

  if (session) {
    return (
      <>
        <FaceDetection socket={socket} />
        {joined && socket.connected ? (
          <h2 style={{ color: "grey", textAlign: "center", marginTop: "20px" }}>
            {"You're Online"}
          </h2>
        ) : (
          <h2 style={{ color: "grey", textAlign: "center", marginTop: "20px" }}>
            {"You're Offline: Please try again by refreshing"}
          </h2>
        )}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default CustomerRecognitionPage;
