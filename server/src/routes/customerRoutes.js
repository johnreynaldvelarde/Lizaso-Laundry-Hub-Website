import express from "express";
import { getPool } from "../db/dbConfig.js";
import {
  handleGetCalculatedTransactionForCustomer,
  handleGetCustomerConvo,
  handleGetCustomerTrackOrderAndProgress,
  handleGetPaymentHistory,
  handleGetServicePromoList,
  handleGetServiceTypeAndPromotions,
  handleSetCustomerServiceRequest,
  handleSetFeedbackAndReview,
  handleUpdateCustomerBasicInformationWeb,
} from "../services/user/customer.js";
import { handleCheckCustomerDetails } from "../services/useCheck.js";
import {
  handleGetMessages,
  handleSetNewMessages,
  handleUpdateMessageIsRead,
} from "../services/useMessages.js";

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
  "/customers/:id/check-customer-details",
  withDatabaseConnection(async (req, res, connection) => {
    await handleCheckCustomerDetails(req, res, connection);
  })
);

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

router.post(
  "/customers/set-new-messsages",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleSetNewMessages(req, res, connection);
    } catch (error) {
      console.error("Error creating service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.post(
  "/customers/set-feedback-review",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleSetFeedbackAndReview(req, res, connection);
    } catch (error) {
      console.error("Error creating service request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// GET
router.get(
  "/customers/:id/get-service-promo-list",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetServicePromoList(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service types:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

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

router.get(
  "/customers/:id/get-customer-convo",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetCustomerConvo(req, res, connection);
    } catch (error) {
      console.error("Error retrieving service types:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/customers/:id/get-track-order",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetCustomerTrackOrderAndProgress(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/customers/:id/get-calculated-transaction",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetCalculatedTransactionForCustomer(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/customers/:user_one_id/:user_two_id/get-messages",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetMessages(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/customers/:id/get-payment-history",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleGetPaymentHistory(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// PUT
router.put(
  "/customers/:user_one_id/:user_two_id/put-update-message",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateMessageIsRead(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.put(
  "/customers/:id/start",
  withDatabaseConnection(async (req, res, connection) => {
    try {
      await handleUpdateCustomerBasicInformationWeb(req, res, connection);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

export default router;
