import express from 'express';
import { getPool } from '../db/dbConfig.js';
import { handleRegister, handleLogin } from '../services/authService.js';

const router = express.Router();


// for login
router.post('/login', async (req, res) => {
  const pool = await getPool();
  const connection = await pool.getConnection();
  try {
    await handleLogin(req, res, connection);
  } catch (error) {
    console.error('Error handling login:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.release();
  }
});

const veriftyUser = (req, res, next) => {
  const token = req.coookies.token
}

// for verfiying the user
router.get('/', veriftyUser, async (req, res) => {
  const pool = await getPool();
  const connection = await pool.getConnection();
  try {
    await handleLogin(req, res, connection);
  } catch (error) {
    console.error('Error handling login:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.release();
  }
});



// for register
router.post('/register', async (req, res) => {
  const pool = await getPool();
  const connection = await pool.getConnection();
  try {
    await handleRegister(req, res, connection);
  } catch (error) {
    console.error('Error handling register:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.release();
  }
});



// admin side

// customer side

// update customer information
router.post('/update-customer', async (req, res) => {
  const pool = await getPool();
  const connection = await pool.getConnection();
  try {
    
  } catch (error) {
    console.error('Error handling update customer information:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.release();
  }
});
















export default router;
