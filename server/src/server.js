import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

// Import File Function 
import { createDefaultAdmin, handleLogin } from './services/authService.js';

// Database Connection
import { connectToDatabase } from './db/dbConfig.js';
const db = connectToDatabase();

// Ensure the main store exists and create default admin if necessary
// ensureMainStoreExists(db);
// createDefaultAdmin(db);





const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.listen(3002, () =>{
    console.log("Runnin.....")
})