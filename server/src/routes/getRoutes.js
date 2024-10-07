import express from "express";
import { handleViewStore } from "../services/admin/useStore.js";
import {
  handleGetCountLaundryAssignment,
  handleGetCountRequestInQueue,
  handleGetLaundryAssignments,
  handleGetSelectedCustomer,
  handleGetServiceInQueue,
  handleGetServiceType,
  handleGetUnitListAvaiable,
  handleViewUnits,
} from "../services/admin/useUnits.js";
import { handleGenerateUnitName } from "../services/checkService.js";
import {
  handleGetCategory,
  handleViewInventory,
  handleViewListCategory,
} from "../services/admin/useInventory.js";
import { getPool } from "../db/dbConfig.js";
import {
  handleAdminGetUser,
  handleGetRolesPermissions,
} from "../services/admin/useUser.js";
import { handleGetServiceTypeAndStore } from "../services/admin/useSettings.js";

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

// Store Section
router.get(
  "/view-store",
  withDatabaseConnection(async (req, res, connection) => {
    await handleViewStore(req, res, connection);
  })
);

// Laundry Unit Section
router.get(
  "/user/:id/count-inqueue",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetCountRequestInQueue(req, res, connection);
  })
);

router.get(
  "/user/:id/count-assignment",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetCountLaundryAssignment(req, res, connection);
  })
);

router.get(
  "/user/:id/get-customer",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetSelectedCustomer(req, res, connection);
  })
);

router.get(
  "/user/:id/get-assignment",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetLaundryAssignments(req, res, connection);
  })
);

router.get(
  "/user/:id/unit-available",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetUnitListAvaiable(req, res, connection);
  })
);

router.get(
  "/view-units",
  withDatabaseConnection(async (req, res, connection) => {
    await handleViewUnits(req, res, connection);
  })
);

router.get(
  "/get-unitname",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGenerateUnitName(req, res, connection);
  })
);

router.get(
  "/unit/:id/get-service-types",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetServiceType(req, res, connection);
  })
);

router.get(
  "/user/:id/get-inqueue",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetServiceInQueue(req, res, connection);
  })
);

// INVENTORY SECTION
router.get(
  "/get-category",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetCategory(req, res, connection);
  })
);

router.get(
  "/view-inventory",
  withDatabaseConnection(async (req, res, connection) => {
    await handleViewInventory(req, res, connection);
  })
);

router.get(
  "/view-category",
  withDatabaseConnection(async (req, res, connection) => {
    await handleViewListCategory(req, res, connection);
  })
);

// USER MANAGEMENT SECTION
router.get(
  "/user/:id/admin-get-user",
  withDatabaseConnection(async (req, res, connection) => {
    await handleAdminGetUser(req, res, connection);
  })
);

router.get(
  "/user/:id/admin-get-role-permissions",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetRolesPermissions(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// SETTINGS SECTION
// -> TAB DASHBOARD CONFIG <-
// router.post('/settings/set-dashboard-config', withDatabaseConnection(async (req, res, connection) => {
// }));

// -> TAB SERVICE TYPES <-
router.get(
  "/settings/:id/get-service-types",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetServiceTypeAndStore(req, res, connection);
  })
);

// console.log("Ako")
// User management Section

export default router;
