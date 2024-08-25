import express from 'express';
import cors from 'cors';
import jwt, { decode } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// Import routes and middleware
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js'
import getRoutes from './routes/getRoutes.js'
import  putRoutes from './routes/postRoutes.js'
import { authenticateToken } from './middleware/authMiddleware.js';

// Import File Function
import { ensureMainStoreExists, createDefaultAdmin } from './services/default.js'; 


// Database Connection
import { getPool } from './db/dbConfig.js';

const app = express();
const port = process.env.PORT ;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(cookieParser());

// Public routes
app.use('/api', authRoutes, postRoutes, getRoutes, putRoutes);

// Protected routes
app.use('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


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
      console.error('Failed to initialize server:', err);
      process.exit(1);
    }
  };
  
initServer();
