import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000";

const useSocket = () => {
  const [socket] = useState(() => io(SOCKET_SERVER_URL));
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for new messages
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = (msg) => {
    socket.emit("sendMessage", msg);
  };

  return { messages, sendMessage };
};

export default useSocket;
