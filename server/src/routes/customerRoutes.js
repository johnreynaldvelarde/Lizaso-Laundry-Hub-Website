import express from "express";
import { getPool } from "../db/dbConfig.js";
import {
  handleGetServiceTypeAndPromotions,
  handleUpdateCustomerBasicInformation,
} from "../services/customer/customer.js";

const router = express.Router();

const withDatabaseConnection = (handler) => async (req, res) => {
  const pool = await getPool();
  const connection = await pool.getConnection();
  try {
    await handler(req, res, connection);
  } catch (error) {
    console.error("Database operation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    connection.release();
  }
};

// POST

// GET
router.get(
  "/customers/:id/get-service-types",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetServiceTypeAndPromotions(req, res, connection);
  })
);

// PUT
router.put(
  "/customers/:id/start",
  withDatabaseConnection(async (req, res, connection) => {
    await handleUpdateCustomerBasicInformation(req, res, connection);
  })
);

export default router;
