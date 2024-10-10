import { haversineDistance } from "../../helpers/distanceComputing.js";
// POST
export const handlePostNewMessages = async (req, res, connection) => {
  const { id } = req.params; // assuming this is either sender's user/customer id
  const { receiverId, text, senderType, receiverType } = req.body;

  try {
    await connection.beginTransaction();
    // Determine sender and receiver based on type
    let senderCustomerId = null;
    let senderUserAccountId = null;
    let recipientCustomerId = null;
    let recipientUserAccountId = null;
    if (senderType === "Customer") {
      senderCustomerId = id; // If the sender is a customer
    } else if (senderType === "Staff") {
      senderUserAccountId = id; // If the sender is a staff member
    }
    if (receiverType === "Customer") {
      recipientCustomerId = receiverId; // If the receiver is a customer
    } else if (receiverType === "Staff") {
      recipientUserAccountId = receiverId; // If the receiver is a staff member
    }
    // Insert new message into the Message table using execute
    const query = `
      INSERT INTO Message
      (sender_customer_id, sender_user_account_id, recipient_customer_id, recipient_user_account_id, message, sender_type, receiver_type, isRead, date_sent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    await connection.execute(query, [
      senderCustomerId,
      senderUserAccountId,
      recipientCustomerId,
      recipientUserAccountId,
      text,
      senderType,
      receiverType,
      false, // isRead is false by default
    ]);
    await connection.commit();
    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the message.",
    });
  } finally {
    connection.release();
  }
};

// GET
export const handleGetLaundryPickup = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
        SELECT 
          sr.id AS request_id,
          c.id AS customer_id,
          sr.customer_fullname,
          sr.request_date,
          sr.pickup_date,
          sr.delivery_date,
          sr.request_status,
          st.service_name,
          st.default_price,
          a.address_line1,
          a.latitude AS customer_latitude,
          a.longitude AS customer_longitude,
          store_address.latitude AS store_latitude,
          store_address.longitude AS store_longitude
        FROM 
          Service_Request sr
        INNER JOIN 
          Service_Type st ON sr.service_type_id = st.id
        INNER JOIN 
          Customer c ON sr.customer_id = c.id
        INNER JOIN 
          Addresses a ON c.address_id = a.id
        INNER JOIN 
          Stores s ON sr.store_id = s.id
        INNER JOIN 
          Addresses store_address ON s.address_id = store_address.id 
        WHERE 
          sr.store_id = ? 
          AND sr.request_status IN ('Pending Pickup', 'Ongoing Pickup', 'Cancelled')
          AND st.isArchive = 0
          AND c.isArchive = 0
      `;

    const [rows] = await connection.execute(query, [id]);

    // Compute distances for each row
    const resultsWithDistance = rows.map((row) => {
      const distance = haversineDistance(
        row.store_latitude,
        row.store_longitude,
        row.customer_latitude,
        row.customer_longitude
      );
      const formattedDistance = `${distance.toFixed(2)} km`;
      return {
        ...row,
        distance: formattedDistance,
      };
    });

    await connection.commit();

    res.status(200).json({
      success: true,
      data: resultsWithDistance,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching service requests:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
    });
  } finally {
    if (connection) connection.release();
  }
};

export const handleGetStaffMessages = async (req, res, connection) => {
  const { id } = req.params; // 'id' is the User_Account ID (e.g., staff ID)

  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        m.id,
        m.message,
        m.sender_type,
        m.receiver_type,
        m.isRead,
        m.date_sent,
        CASE
          WHEN m.sender_customer_id IS NOT NULL THEN CONCAT(c.c_firstname, ' ', c.c_middlename, ' ', c.c_lastname)
          WHEN m.sender_user_account_id IS NOT NULL THEN CONCAT(u.first_name, ' ', u.middle_name, ' ', u.last_name)
        END AS sender_full_name,
        CASE
          WHEN m.recipient_customer_id IS NOT NULL THEN CONCAT(c2.c_firstname, ' ', c2.c_middlename, ' ', c2.c_lastname)
          WHEN m.recipient_user_account_id IS NOT NULL THEN CONCAT(u2.first_name, ' ', u2.middle_name, ' ', u2.last_name)
        END AS recipient_full_name
      FROM Message m
      LEFT JOIN Customer c ON m.sender_customer_id = c.id OR m.recipient_customer_id = c.id
      LEFT JOIN User_Account u ON m.sender_user_account_id = u.id OR m.recipient_user_account_id = u.id
      WHERE (
        m.sender_user_account_id = ? OR
        m.recipient_user_account_id = ?
      )
      ORDER BY m.date_sent DESC
    `;

    const [rows] = await connection.execute(query, [id, id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      messages: rows,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching staff messages:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the staff messages.",
    });
  } finally {
    connection.release();
  }
};

// PUT
//#PENDING CANCEL
export const handleUpdateServiceRequestCancel = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const updateQuery = `
        UPDATE Service_Request
        SET request_status = 'Cancelled'
        WHERE id = ?`;

    const [result] = await connection.execute(updateQuery, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }
    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Request status updated to cancelled.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the request.",
    });
  } finally {
    connection.release();
  }
};

//#PENDING ONGOING
export const handleUpdateServiceRequestOngoing = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const updateQuery = `
        UPDATE Service_Request
        SET request_status = 'Ongoing Pickup'
        WHERE id = ?`;

    const [result] = await connection.execute(updateQuery, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }
    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Request status updated to Ongoing Pickup.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the request.",
    });
  } finally {
    connection.release();
  }
};

//#BACK TO PENDING
export const handleUpdateServiceRequestBackToPending = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const updateQuery = `
          UPDATE Service_Request
          SET request_status = 'Pending Pickup'
          WHERE id = ?`;

    const [result] = await connection.execute(updateQuery, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }
    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Request status updated to Pending Pickup.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the request.",
    });
  } finally {
    connection.release();
  }
};

// export const handlePostNewMessages = async (req, res, connection) => {
//   const { id } = req.params;
//   const { recieverId, text, senderType, receiverType } = req.body;

//   console.log(recieverId);
//   console.log(text);
//   console.log(senderType);
//   console.log(receiverType);

//   try {
//     await connection.beginTransaction();
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error updating service request status:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the request.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// export const handleGetStaffMessages = async (req, res, connection) => {
//   const { id } = req.params;

//   try {
//     // Begin the transaction
//     await connection.beginTransaction();

//     // SQL query to fetch messages based on the user's role (either customer or staff)
//     let query = `
//       SELECT
//         m.id,
//         m.message,
//         m.sender_type,
//         m.receiver_type,
//         m.isRead,
//         m.date_sent,
//         CASE
//           WHEN m.sender_customer_id IS NOT NULL THEN CONCAT(c.c_firstname, ' ', c.c_middlename, ' ', c.c_lastname)
//           WHEN m.sender_user_account_id IS NOT NULL THEN CONCAT(u.first_name, ' ', u.middle_name, ' ', u.last_name)
//         END AS sender_full_name,
//         CASE
//           WHEN m.recipient_customer_id IS NOT NULL THEN CONCAT(c2.c_firstname, ' ', c2.c_middlename, ' ', c2.c_lastname)
//           WHEN m.recipient_user_account_id IS NOT NULL THEN CONCAT(u2.first_name, ' ', u2.middle_name, ' ', u2.last_name)
//         END AS recipient_full_name
//       FROM Message m
//       LEFT JOIN Customer c ON m.sender_customer_id = c.id
//       LEFT JOIN User_Account u ON m.sender_user_account_id = u.id
//       LEFT JOIN Customer c2 ON m.recipient_customer_id = c2.id
//       LEFT JOIN User_Account u2 ON m.recipient_user_account_id = u2.id
//       WHERE (m.sender_customer_id = ? OR m.sender_user_account_id = ? OR m.recipient_customer_id = ? OR m.recipient_user_account_id = ?)
//     `;

//     // Execute the query, passing 'id' for both customer and staff (user) fields
//     const [rows] = await connection.execute(query, [id, id, id, id]);

//     // Commit the transaction
//     await connection.commit();

//     // Send the list of messages as a response
//     res.status(200).json({
//       success: true,
//       data: rows,
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching messages:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching the messages.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// export const handleGetMessages = async (req, res, connection) => {
//   const { id } = req.params; // assuming this is either sender's user/customer id

//   try {
//     await connection.beginTransaction();
//     // Determine sender and receiver based on type
//     let senderCustomerId = null;
//     let senderUserAccountId = null;
//     let recipientCustomerId = null;
//     let recipientUserAccountId = null;
//     if (senderType === "Customer") {
//       senderCustomerId = id; // If the sender is a customer
//     } else if (senderType === "Staff") {
//       senderUserAccountId = id; // If the sender is a staff member
//     }
//     if (receiverType === "Customer") {
//       recipientCustomerId = receiverId; // If the receiver is a customer
//     } else if (receiverType === "Staff") {
//       recipientUserAccountId = receiverId; // If the receiver is a staff member
//     }
//     // Insert new message into the Message table using execute
//     const query = `
//       INSERT INTO Message
//       (sender_customer_id, sender_user_account_id, recipient_customer_id, recipient_user_account_id, message, sender_type, receiver_type, isRead, date_sent)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
//     `;
//     await connection.execute(query, [
//       senderCustomerId,
//       senderUserAccountId,
//       recipientCustomerId,
//       recipientUserAccountId,
//       text,
//       senderType,
//       receiverType,
//       false, // isRead is false by default
//     ]);
//     await connection.commit();
//     res.status(200).json({
//       success: true,
//       message: "Message sent successfully!",
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error sending message:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while sending the message.",
//     });
//   } finally {
//     connection.release();
//   }
// };
