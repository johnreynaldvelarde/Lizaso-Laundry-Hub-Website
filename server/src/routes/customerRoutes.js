import express from "express";
import { getPool } from "../db/dbConfig.js";
import {
  handleGetServiceTypeAndPromotions,
  handleSetCustomerServiceRequest,
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
router.post(
  "/customers/:id/set-service-request",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleSetCustomerServiceRequest(req, res, connection);
    } catch (error) {
      console.error("Error creating service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// GET
router.get(
  "/customers/:id/get-service-types",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetServiceTypeAndPromotions(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service types:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// PUT
router.put(
  "/customers/:id/start",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateCustomerBasicInformation(req, res, connection);
    } catch (error) {
      console.error("Error updating customer information:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

export default router;
