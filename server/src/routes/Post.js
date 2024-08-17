import express from 'express';
import { getPool } from '../db/dbConfig.js';
import { handleRegister, handleLogin } from '../services/authService.js';