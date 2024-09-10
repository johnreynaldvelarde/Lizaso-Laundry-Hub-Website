import express from 'express';
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

// Update User Status to offline isStatus to 0
// router.post('/update-status', withDatabaseConnection(async (req, res, connection) => {
//     await handleUpdateUserStatus(req, res, connection);
// }));


// router.put('/customers/:id/start', withDatabaseConnection(async (req, res, connection) => {
//   await handleUpdateCustomerBasicInformation(req, res, connection);
// }));

// router.put('/user/:id/update-assignment', withDatabaseConnection(async (req, res, connection) => {
//   await handlePutAssignment(req, res, connection);
// }));


// router.put('/update-start-customer', withDatabaseConnection(async (req, res, connection) => {
//   await handleUpdateCustomerBasicInformation(req, res, connection);
// }));

export default router;
  