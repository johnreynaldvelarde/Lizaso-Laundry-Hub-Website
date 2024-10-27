import { Server } from "socket.io";

const setupSocketIO = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle adding a new item
    socket.on("addItem", (item) => {
      io.emit("newItem", item); // Notify all clients of the new item
    });

    // Handle sending a message
    socket.on("sendMessage", (message) => {
      io.emit("newMessage", message); // Notify all clients of the new message
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export default setupSocketIO;
