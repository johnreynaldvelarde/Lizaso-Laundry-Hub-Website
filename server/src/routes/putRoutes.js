import express from "express";
import { handleCreateStore } from "../services/admin/useStore.js";
import {
  handlePutAssignment,
  handlePutRemoveInQueue,
  handleUpdateProgressInqueueAndAtStore,
} from "../services/admin/useUnits.js";
import { getPool } from "../db/dbConfig.js";
import {
  handleDeleteServiceType,
  handleUpdateServiceType,
} from "../services/admin/useSettings.js";
import {
  handleUpdateAdminBasedUser,
  handleUpdatePermissions,
  handleUpdateRemoveRole,
  handleUpdateRemoveUser,
  handleUpdateRenameRole,
} from "../services/admin/useUser.js";
import {
  handleUpdateCategoryName,
  handleUpdateRemoveCategory,
} from "../services/admin/useInventory.js";

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

router.put(
  "/monitored-unit/:id/update-progress-inqueue-store",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateProgressInqueueAndAtStore(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

//#INVENTORY SECTION
router.put(
  "/inventory/:id/update-category-name",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateCategoryName(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/inventory/:id/update-remove-category",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateRemoveCategory(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// USER MANAGEMENT SECTION
// #For role and permisson
router.put(
  "/usermanage/:id/update-permissions",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdatePermissions(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/usermanage/:id/update-rename-role",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateRenameRole(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// #For user
router.put(
  "/usermanage/:id/update-admin-based-user",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateAdminBasedUser(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/usermanage/:id/update-manager-based-user",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      // await handleUpdateAdminBasedUser(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/usermanage/:id/update-remove-user",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateRemoveUser(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/usermanage/:id/update-remove-role",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateRemoveRole(req, res, connection);
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
