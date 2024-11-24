import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [error, setError] = useState(null); // Handle socket errors

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {});

    newSocket.on("connect_error", (error) => {
      setError("Connection failed: " + error.message);
      console.error("Socket connection error:", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { socket, notifications, error };
};

export default useSocket;
