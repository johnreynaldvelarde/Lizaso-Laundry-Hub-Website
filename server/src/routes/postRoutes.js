import express from 'express';
import { handleCreateStore } from '../services/useStore.js';
import { getPool } from '../db/dbConfig.js';


const router = express.Router();

const withDatabaseConnection = (handler) => async (req, res) => {
    const pool = await getPool();
    const connection = await pool.getConnection();
    try {
      await handler(req, res, connection);
    } catch (error) {
      console.error('Database operation error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  };

// Store Section
router.post('/create-store', withDatabaseConnection(async (req, res, connection) => {
    await handleCreateStore(req, res, connection);
}));


export default router;
  