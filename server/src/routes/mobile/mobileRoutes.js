import express from "express";
import {
  handleGetLaundryPickup,
  handleGetStaffConvo,
  handleSetMessagesSenderIsStaff,
  handleUpdateServiceRequestBackToPending,
  handleUpdateServiceRequestFinishPickup,
  handleUpdateServiceRequestUsingQrCode,
} from "../../services/user/staff.js";
import { getPool } from "../../db/dbConfig.js";
import {
  handleUpdateServiceRequestCancel,
  handleUpdateServiceRequestOngoing,
} from "../../services/user/staff.js";
import {
  getUserMobileDetails,
  handleCheckCustomerDetailsMobile,
  handleLoginMobile,
  handleRegisterCustomer,
} from "../../services/authentication.js";

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
// CUSTOMER SECTION
// #POST
router.post(
  "/login-mobile",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleLoginMobile(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.post(
  "/register-mobile",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleRegisterCustomer(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/customers/:id/check-customer-details",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleCheckCustomerDetailsMobile(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/mobile-users/me",
  withDatabaseConnection(async (req, res, connection) => {
    await getUserMobileDetails(req, res, connection);
  })
);

// #GET
router.get(
  "/customer/:id/get-customer-list-convo",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetCustomerConvo(req, res, connection);
    } catch (error) {
      console.error("Error retrieving customer request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);
// #PUT

// ---STAFF SECTION---
// #POST
router.post(
  "/staff/set-messages-sender-staff",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleSetMessagesSenderIsStaff(req, res, connection);
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

// #GET STAFF MESSAGE
router.get(
  "/staff/:id/get-staff-convo",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetStaffConvo(req, res, connection);
    } catch (error) {
      console.error("Error retrieving staff message request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

//#PENDING TO CANCEL
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

//# PENDING TO ONGOING
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

//# ONGOING TO PENDING
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

//# ONGOING TO COMPLETED
router.put(
  "/staff/:id/update-request-finish-pickup",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateServiceRequestFinishPickup(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

//# SCAN QR CODE FOR PICKUP
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
