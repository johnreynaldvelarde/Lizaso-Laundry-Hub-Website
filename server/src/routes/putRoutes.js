import express from "express";
import { handleCreateStore } from "../services/admin/useStore.js";
import {
  handleCreateUnits,
  handlePutAssignment,
  handlePutRemoveInQueue,
} from "../services/admin/useUnits.js";
import { getPool } from "../db/dbConfig.js";
import {
  handleDeleteServiceType,
  handleUpdateServiceType,
} from "../services/admin/useSettings.js";

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

router.post(
  "/update-status",
  withDatabaseConnection(async (req, res, connection) => {
    await handleUpdateUserStatus(req, res, connection);
  })
);

// UNIT MONITORED SECTION
router.put(
  "/user/:id/update-assignment",
  withDatabaseConnection(async (req, res, connection) => {
    await handlePutAssignment(req, res, connection);
  })
);
router.put(
  "/user/:id/remove-request",
  withDatabaseConnection(async (req, res, connection) => {
    await handlePutRemoveInQueue(req, res, connection);
  })
);

// USER MANAGEMENT SECTION
// #For role and permisson
router.put(
  "/usermanage/:id/update-role-permission",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      // await handleSetRolesPermissions(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// #For user
router.put(
  "/usermanage/:id/update-user",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      // await handleSetRolesPermissions(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/usermanage/:id/delete-user",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      // await handleSetRolesPermissions(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// SETTINGS SECTION
// #For tab dashboard config

// #For tab services type
router.put(
  "/settings/:id/update-service-types",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateServiceType(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/settings/:id/delete-service-types",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleDeleteServiceType(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

export default router;
