import express from "express";
import {
  handleGetLaundryPickup,
  handleGetStaffMessages,
  handlePostNewMessages,
  handleUpdateServiceRequestBackToPending,
} from "../../services/user/staff.js";
import { getPool } from "../../db/dbConfig.js";
import {
  handleUpdateServiceRequestCancel,
  handleUpdateServiceRequestOngoing,
} from "../../services/user/staff.js";
import {
  handleGetCustomerMessages,
  handleUpdateServiceRequestUsingQrCode,
} from "../../services/user/customer.js";

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
// CUSTOMER SECTIOn
// #POST
// #GET
// #PUT

// STAFF SECTION
// #POST
router.post(
  "/message/:id/set-new-messages",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handlePostNewMessages(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// #GET
router.get(
  "/staff/:id/get-laundry-pickup",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetLaundryPickup(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/staff/:id/get-staff-list-convo",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetStaffMessages(req, res, connection);
    } catch (error) {
      console.error("Error retrieving staff message request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/customer/:id/get-customer-list-convo",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetCustomerMessages(req, res, connection);
    } catch (error) {
      console.error("Error retrieving customer request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// #PUT
router.put(
  "/staff/:id/update-request-cancel",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateServiceRequestCancel(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/staff/:id/update-request-ongoing",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateServiceRequestOngoing(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/staff/:id/update-request-back-pending",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateServiceRequestBackToPending(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/staff/:id/update-request-qr-code",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateServiceRequestUsingQrCode(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

export default router;

// Update User Status to offline isStatus to 0
// router.post('/update-status', withDatabaseConnection(async (req, res, connection) => {
//     await handleUpdateUserStatus(req, res, connection);
// }));

// router.put('/customers/:id/start', withDatabaseConnection(async (req, res, connection) => {
//   await handleUpdateCustomerBasicInformation(req, res, connection);
// }));

// router.put('/user/:id/update-assignment', withDatabaseConnection(async (req, res, connection) => {
//   await handlePutAssignment(req, res, connection);
// }));

// router.put('/update-start-customer', withDatabaseConnection(async (req, res, connection) => {
//   await handleUpdateCustomerBasicInformation(req, res, connection);
// }));
