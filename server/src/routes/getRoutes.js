import express from 'express';
import {handleViewStore } from '../services/useStore.js';
import { handleViewUnits } from '../services/useUnits.js';
import { handleGenerateUnitName } from '../services/checkService.js';
import { handleGetCategory, handleViewInventory, handleViewListCategory } from '../services/useInventory.js';
import { handleGetCustomerRequest } from '../services/useUnits.js';
import { getPool } from '../db/dbConfig.js';
import { handleAdminGetUser } from '../services/useUser.js';


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
router.get('/view-store', withDatabaseConnection(async (req, res, connection) => {
    await handleViewStore(req, res, connection);
}));


// Laundry Unit Section
router.get('/view-units', withDatabaseConnection(async (req, res, connection) => {
   await handleViewUnits(req, res, connection);
}));

router.get('/get-unitname', withDatabaseConnection(async (req, res, connection) => {
  await handleGenerateUnitName(req, res, connection);
}));

// Inventory Section
router.get('/get-category', withDatabaseConnection(async (req, res, connection) => {
  await handleGetCategory(req, res, connection);
}));

router.get('/view-inventory', withDatabaseConnection(async (req, res, connection) => {
   await handleViewInventory(req, res, connection);
}));

router.get('/view-category', withDatabaseConnection(async (req, res, connection) => {
  await handleViewListCategory(req, res, connection);
}));



router.get('/user/:id/get-request', withDatabaseConnection(async (req, res, connection) => {
  await handleGetCustomerRequest(req, res, connection);
}));

// Use Management Section
router.get('/user/:id/admin-get-user', withDatabaseConnection(async (req, res, connection) => {
  await handleAdminGetUser(req, res, connection);
}));

// console.log("Ako")
// User management Section



export default router;
  