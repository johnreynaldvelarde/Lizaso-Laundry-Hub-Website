import express from 'express';
import { handleCreateStore } from '../services/useStore.js';
import { handleCreateUnits } from '../services/useUnits.js';
import { handleCreateItem,handleCreateItemCategory } from '../services/useInventory.js';
import { handleCustomerServiceRequest } from '../services/useCustomer.js';
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


// Laundry Unit Section
router.post('/create-unit', withDatabaseConnection(async (req, res, connection) => {
  await handleCreateUnits(req, res, connection);
}));


// For Inventory Section
router.post('/create-item', withDatabaseConnection(async (req, res, connection) => {
  await handleCreateItem(req, res, connection);
}));

router.post('/create-category-item', withDatabaseConnection(async (req, res, connection) => {
  await handleCreateItemCategory(req, res, connection);
}));


router.post('/customers/:id/service-requests', withDatabaseConnection(async (req, res, connection) => {
  await handleCustomerServiceRequest(req, res, connection);
}));



// Activity Log Section
// router.post('/activity/:id/post-log', withDatabaseConnection(async (req, res, connection) => {
//   await handleSetActivityLog(req, res, connection);
// }));

export default router;
  