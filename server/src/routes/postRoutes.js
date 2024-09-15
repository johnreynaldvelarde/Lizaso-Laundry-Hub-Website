import express from 'express';
import { handleCreateStore } from '../services/useStore.js';
import { handleCreateUnits, handleSetLaundryAssignment, handleSetWalkInRequest } from '../services/useUnits.js';
import { handleCreateItem,handleCreateItemCategory } from '../services/useInventory.js';
import { handleCustomerServiceRequest } from '../services/useCustomer.js';
import { getPool } from '../db/dbConfig.js';
import { handleSetNewServiceType } from '../services/useSettings.js';


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

// Unit Monitored Section
router.post('/create-unit', withDatabaseConnection(async (req, res, connection) => {
  await handleCreateUnits(req, res, connection);
}));

router.post('/unit-monitor/:id/set-assignment', withDatabaseConnection(async (req, res, connection) => {
  await handleSetLaundryAssignment(req, res, connection);
}));

router.post('/unit-monitor/:id/set-walkin', withDatabaseConnection(async (req, res, connection) => {
  await handleSetWalkInRequest(req, res, connection);
}));

router.post('/unit-monitor/:id/set-completed', withDatabaseConnection(async (req, res, connection) => {
  
}));

// Store Section
router.post('/create-store', withDatabaseConnection(async (req, res, connection) => {
    await handleCreateStore(req, res, connection);
}));

// For Inventory Section
router.post('/create-item', withDatabaseConnection(async (req, res, connection) => {
  await handleCreateItem(req, res, connection);
}));

router.post('/create-category-item', withDatabaseConnection(async (req, res, connection) => {
  await handleCreateItemCategory(req, res, connection);
}));


// SETTINGS SECTION

// -> TAB DASHBOARD CONFIG <-
router.post('/settings/set-dashboard-config', withDatabaseConnection(async (req, res, connection) => {
}));

// -> TAB SERVICE TYPES <-
router.post('/settings/set-service-types', withDatabaseConnection(async (req, res, connection) => {
  await handleSetNewServiceType(req, res, connection);
}));






// Customers Side 
router.post('/customers/:id/service-requests', withDatabaseConnection(async (req, res, connection) => {
  await handleCustomerServiceRequest(req, res, connection);
}));

export default router;
  