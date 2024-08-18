import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt, { decode } from 'jsonwebtoken';
// import verifyToken from './middleware/authMiddleware.js'

// Import routes
import authRoutes from './routes/authRoutes.js';

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
  // allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(cookieParser());

// Use routes
app.use('/api', authRoutes);

const verifyUser = (req , res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.json({Message: "we need token please provide it"})
  }
  else{
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) =>{
      if(err){
        return res.json({Message: "Authentication Error."})
      }
      else{
        req.username = decode.username;
        next();
      }
    })
  }
}

app.get('/', verifyUser, (req, res) => {
  return res.json({Status: "Success", username: req.username})
})


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

// // Protect specific routes with middleware
// app.use('/api/protected-route', verifyToken, (req, res) => {
//   res.send('This is a protected route');
// });