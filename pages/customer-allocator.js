import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomerAllocation from "../components/CustomerAllocation/CustomerAllocation";
import ProgressBar from "../components/HelperComponents/ProgressBar";
import AuthContext from "../store/auth-context";
import "react-toastify/dist/ReactToastify.css";

import { SocketContext } from "../utils/socket";

const CustomerAllocatorPage = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const socket = useContext(SocketContext);
  const [joined, setJoined] = useState(false);
  const [roomData, setRoomData] = useState();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
      if (session) {
        console.log("session = true");
      } else {
        console.log("first");
        router.push("/");
      }
    } else {
      setIsLoading(true);
    }
  }, [router, session]);

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
  console.log(
    typeof window !== "undefined" ? localStorage.getItem("teamID") : null
  );

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

  console.log("roomData", roomData);

  return (
    <div>
      <ProgressBar open={isLoading} />
      <CustomerAllocation socket={socket} />
      {joined && socket.connected ? (
        <h2 style={{ color: "grey", textAlign: "center", marginTop: "20px" }}>
          {"You're Online"}
        </h2>
      ) : (
        <h2 style={{ color: "grey", textAlign: "center", marginTop: "20px" }}>
          {"You're Offline : Please Retry By Refreshing"}
        </h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default CustomerAllocatorPage;
