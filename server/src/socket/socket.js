import { Server } from "socket.io";

let io;
const userSockets = {};

const setupSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_FRONTEND_URL
          : process.env.DEVELOPMENT_FRONTEND_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("register", ({ userId, storeId, userType }) => {
      if (!userId || !storeId || !userType) {
        console.error(
          "Missing required fields for registration: userId, storeId, or userType."
        );
        socket.emit("registerFailed", {
          message: "Invalid registration details.",
        });
        return;
      }

      userSockets[userId] = {
        userId,
        socketId: socket.id,
        storeId,
        userType,
      };

      console.log(
        `User ${userId} registered with socket ID: ${socket.id}, store ID: ${storeId}, and user type: ${userType}`
      );

      socket.emit("registerSuccess", {
        message: `User ${userId} successfully registered.`,
        userId,
        storeId,
        userType,
      });
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      // Find and remove the user from the userSockets object
      for (let userId in userSockets) {
        if (userSockets[userId].socketId === socket.id) {
          delete userSockets[userId];
          console.log(`User ${userId} removed from socket list`);
          break;
        }
      }
    });
  });

  return io;
};

export { setupSocketIO, userSockets, io };

// import { Server } from "socket.io";

// let io;
// const userSockets = {};

// const setupSocketIO = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin:
//         process.env.NODE_ENV === "production"
//           ? process.env.PRODUCTION_FRONTEND_URL
//           : process.env.DEVELOPMENT_FRONTEND_URL,
//       methods: ["GET", "POST"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`A user connected: ${socket.id}`);

//     socket.on("register", (userId) => {
//       if (!userId) {
//         console.error("No userId provided for registration.");
//         return;
//       }

//       userSockets[userId] = socket.id;
//       console.log(`User ${userId} registered with socket ID: ${socket.id}`);

//       socket.emit("registerSuccess", {
//         message: `User ${userId} successfully registered.`,
//         userId,
//       });
//     });

//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);

//       for (let userId in userSockets) {
//         if (userSockets[userId] === socket.id) {
//           delete userSockets[userId];
//           console.log(`User ${userId} removed from socket list`);
//           break;
//         }
//       }
//     });
//   });

//   return io;
// };

// export { setupSocketIO, userSockets, io };
