import express from 'express';
import { handleCreateStore } from '../services/useStore.js';
import { handleCreateUnits, handlePutAssignment, handlePutRemoveInQueue } from '../services/useUnits.js';
import { handleUpdateCustomerBasicInformation } from '../services/useCustomer.js';
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

router.post('/update-status', withDatabaseConnection(async (req, res, connection) => {
    await handleUpdateUserStatus(req, res, connection);
}));


router.put('/customers/:id/start', withDatabaseConnection(async (req, res, connection) => {
  await handleUpdateCustomerBasicInformation(req, res, connection);
}));

router.put('/user/:id/update-assignment', withDatabaseConnection(async (req, res, connection) => {
  await handlePutAssignment(req, res, connection);
}));


router.put('/user/:id/remove-request', withDatabaseConnection(async (req, res, connection) => {
  await handlePutRemoveInQueue(req, res, connection);
}));







// router.put('/update-start-customer', withDatabaseConnection(async (req, res, connection) => {
//   await handleUpdateCustomerBasicInformation(req, res, connection);
// }));

export default router;
  