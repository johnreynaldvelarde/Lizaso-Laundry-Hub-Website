import express from "express";
import {
  handleViewStore,
  handleViewStoreByAdmin,
} from "../services/admin/useStore.js";
import {
  handleGetCalculatedTransaction,
  handleGetCountLaundryAssignment,
  handleGetCountRequestInQueue,
  handleGetInventoryLaundryItem,
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
  handleGetBasedUser,
  handleGetRolesPermissions,
  handleGetStoresBasedAdmin,
} from "../services/admin/useUser.js";
import { handleGetServiceTypeAndStore } from "../services/admin/useSettings.js";
import {
  handleGetInboxOnlyAdmin,
  handleGetMessagesOnlyWeb,
} from "../services/useMessages.js";
import {
  handleGetScheduleServiceRequest,
  handleGetScheduleStatsByUser,
  handleGetSelectedStaff,
} from "../services/admin/useSchedule.js";

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

// UNIT MONITORED SECTION
router.get(
  "/monitored-unit/:id/get-calculated-transaction",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetCalculatedTransaction(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/monitored-unit/:id/get-laundry-item",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetInventoryLaundryItem(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/monitored-unit/:id/count-inqueue",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetCountRequestInQueue(req, res, connection);
  })
);

router.get(
  "/monitored-unit/:id/count-assignment",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetCountLaundryAssignment(req, res, connection);
  })
);

router.get(
  "/monitored-unit/:id/get-customer",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetSelectedCustomer(req, res, connection);
  })
);

router.get(
  "/monitored-unit/:id/get-assignment",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetLaundryAssignments(req, res, connection);
  })
);

router.get(
  "/monitored-unit/:id/unit-available",
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
  "/monitored-unit/:id/get-inqueue",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetServiceInQueue(req, res, connection);
  })
);

// VIEW SCHEDULE SECTION
router.get(
  "/schedules/admin-get-stores",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleViewStoreByAdmin(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/schedules/:id/user-get-schedules-stats",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetScheduleStatsByUser(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/schedules/:id/user-get-schedules",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetScheduleServiceRequest(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/schedules/:id/get-assign-staff",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetSelectedStaff(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// #STORE MANAGEMENT SECTION
router.get(
  "/stores/admin-get-stores",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleViewStoreByAdmin(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// #INVENTORY SECTION
router.get(
  "/get-category",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetCategory(req, res, connection);
  })
);

router.get(
  "/inventory/view-inventory/",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleViewInventory(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/view-category",
  withDatabaseConnection(async (req, res, connection) => {
    await handleViewListCategory(req, res, connection);
  })
);

// #USER MANAGEMENT SECTION
router.get(
  "/user/:id/admin-get-user",
  withDatabaseConnection(async (req, res, connection) => {
    await handleAdminGetUser(req, res, connection);
  })
);

// For role and permission
router.get(
  "/usermanage/:id/admin-get-role-permissions",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetRolesPermissions(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// For stores and user
router.get(
  "/usermanage/:id/admin-get-store",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetStoresBasedAdmin(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/usermanage/:id/admin-get-user",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetBasedUser(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// INBOX SECTION ADMIN AND MANAGER
router.get(
  "/inbox/:id/get-inbox",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetInboxOnlyAdmin(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/inbox/:id/get-messages",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetMessagesOnlyWeb(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// REVIEWS SECTION
router.get(
  "/reviews/:id/get-reviews",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetBasedUser(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// SETTINGS SECTION
// -> TAB SERVICE TYPES <-
router.get(
  "/settings/:id/get-service-types",
  withDatabaseConnection(async (req, res, connection) => {
    await handleGetServiceTypeAndStore(req, res, connection);
  })
);

export default router;
