import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = (userDetails) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [error, setError] = useState(null); // Handle socket errors

  useEffect(() => {
    // if (!userDetails?.userId || !userDetails?.storeId) {
    //   return;
    // }

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      // if (userDetails?.userId && userDetails?.storeId) {
      //   newSocket.emit("register", {
      //     userId: userDetails.userId,
      //     storeId: userDetails.storeId,
      //     userType: userDetails.roleName,
      //   });
      //   console.log("1");
      // } else {
      //   console.log("2");
      // }
      // if (userDetails?.userId && userDetails?.storeId) {
      //   newSocket.emit("register", {
      //     userId: userDetails.userId,
      //     storeId: userDetails.storeId,
      //     userType: userDetails.user_type,
      //   });
      //   console.log("User registered with socket");
      // }
    });

    newSocket.on("connect_error", (error) => {
      setError("Connection failed: " + error.message);
      console.error("Socket connection error:", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userDetails]);

  return { socket, notifications, error };
};

export default useSocket;
