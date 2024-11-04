import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // Import http to create an HTTP server

// Import routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import getRoutes from "./routes/getRoutes.js";
import putRoutes from "./routes/putRoutes.js";
import checkRoutes from "./routes/checkRoutes.js";
import mobileRoutes from "./routes/mobile/mobileRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

// Import File Function
import {
  ensureMainStoreExists,
  createDefaultAdmin,
} from "./services/default.js";

// Database Connection
import { getPool } from "./db/dbConfigSample.js";
import setupSocketIO from "./socket/socket.js";

const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-production-frontend-url.com",
];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV === "production") {
        if (allowedOrigins.includes(origin) || !origin) {
          // Allow requests with no origin (like mobile apps or Postman)
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      } else {
        // In development, allow localhost
        callback(null, true);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(
  "/api",
  authRoutes,
  postRoutes,
  getRoutes,
  putRoutes,
  checkRoutes,
  customerRoutes,
  mobileRoutes
);

// Create an HTTP server
const server = http.createServer(app);

const io = setupSocketIO(server);

// Ensure main store exists and start the server
const initServer = async () => {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();
    try {
      await ensureMainStoreExists(connection);
      await createDefaultAdmin(connection);
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Failed to initialize server:", err);
    process.exit(1);
  }
};

initServer();
