import { useSession } from "next-auth/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FaceDetection from "../components/FaceDetection/FaceDetection";
import AuthContext from "../store/auth-context";
import { SocketContext } from "../utils/socket";

import 'react-toastify/dist/ReactToastify.css';

const CustomerRecognitionPage = (props) => {
  const { data: session } = useSession();
  const socket = useContext(SocketContext);
  const authCtx = useContext(AuthContext);

  const [roomData, setRoomData] = useState();
  const [joined, setJoined] = useState(false);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setSocketId(socket.id);
  //     toast("connection established!");
  //   });
  //   socket.on("disconnect", () => {
  //     toast("disconnected");
  //   });
  //   return () => {
  //     socket.off("connect", () => {
  //       toast("connection established!");
  //     });
  //     socket.off("disconnect", () => {
  //       toast("disconnected");
  //     });
  //     // setTimeout(() => {
  //     //   socket.disconnect();
  //     // }, 1000);
  //   };
  // }, [socket]);

  useEffect(() => {
    if (session) {
      socket.emit("joinRoom", {
        name: session?.user.name,
        email: session?.user.email,
        type: authCtx.designation,
        teamID: authCtx.teamID,
        photoUrl: session?.user.image,
      });
    }
  }, [session?.user.email]);

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

  const emit = () => {
    socket.emit("customer", `palanikannan m_pk@gmail.com${Math.random()}`);
    console.log("emitted");
  };

  console.log("roomData", roomData);

  if (session) {
    return (
      <>
        {/* <button onClick={sendUserData}>Join Room</button> */}
        <button onClick={emit}>Emit</button>
        {joined && socket.connected ? (
          <h2>You're Online</h2>
        ) : (
          <h2>You're Offline: Please try again by refreshing</h2>
        )}
        <FaceDetection socket={socket} />
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
