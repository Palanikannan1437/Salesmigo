import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FaceDetection from "../components/FaceDetection/FaceDetection";
import AuthContext from "../store/auth-context";
import { SocketContext } from "../utils/socket";

const CustomerRecognitionPage = (props) => {
  const { data: session } = useSession();
  const [socketId, setSocketId] = useState("");
  const socket = useContext(SocketContext);
  const authCtx = useContext(AuthContext);

  const [roomData, setRoomData] = useState();

  useEffect(() => {
    if (session) {
      props.handleNavItems(3, "SIGN OUT", true);
    }
  }, [session]);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log(socket.id, "chotu page");
      toast("connection established!");
    });
    socket.on("disconnect", () => {
      toast("disconnected");
    });
    return () => {
      socket.off("connect", () => {
        toast("connection established!");
      });
      socket.off("disconnect", () => {
        toast("disconnected");
      });
      setTimeout(() => {
        socket.disconnect();
      }, 1000);
    };
  }, [socket]);

  const sendUserData = () => {
    if (session) {
      socket.emit("joinRoom", {
        name: session?.user.name,
        email: session?.user.email,
        type: authCtx.designation,
        teamID: authCtx.teamID,
        photoUrl: session?.user.image,
      });
    }
  };

  useEffect(() => {
    const totalUsers = (data) => {
      console.log(data);
      setRoomData(data);
    };

    socket.on("roomUsers", totalUsers);

    return () => {
      socket.off("roomUsers", totalUsers);
    };
  }, [socket]);

  const emit = () => {
    socket.emit("customer", "palanikannan m_pk@gmail.com");
    console.log("emitted");
  };

  if (session) {
    return (
      <>
        <h1 style={{ color: "black" }}>My socket id is: {socketId}</h1>
        <button onClick={sendUserData}>Join Room</button>
        <button onClick={emit}>Emit</button>

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
