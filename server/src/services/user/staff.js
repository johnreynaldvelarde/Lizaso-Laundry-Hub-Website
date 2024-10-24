import { haversineDistance } from "../../helpers/distanceComputing.js";
// POST

export const handleSetMessagesSenderIsStaff = async (req, res, connection) => {
  const { sender_id, receiver_id, message } = req.body; // sender_id = staff ID, receiver_id = customer ID
  try {
    // Begin transaction
    await connection.beginTransaction();

    const findConversationQuery = `
      SELECT id FROM Conversations 
      WHERE (user_sender_id IS NULL AND customer_sender_id = ? AND user_receiver_id = ?) OR 
            (customer_sender_id IS NULL AND user_sender_id = ? AND customer_receiver_id = ?)
      LIMIT 1
    `;

    const [conversationRows] = await connection.query(findConversationQuery, [
      receiver_id, // Customer ID who started the conversation
      sender_id, // User (staff) ID who is replying
      sender_id, // User (staff) ID who is replying
      receiver_id, // Customer ID who is receiving the reply
    ]);

    let conversation_id;

    // If no conversation exists, create a new one
    if (conversationRows.length === 0) {
      const insertConversationQuery = `
        INSERT INTO Conversations (user_sender_id, customer_sender_id, user_receiver_id, customer_receiver_id, last_message, last_message_date, created_at, updated_at)
        VALUES (?, NULL, NULL, ?, ?, NOW(), NOW(), NOW())
      `;

      const [newConversationResult] = await connection.query(
        insertConversationQuery,
        [sender_id, receiver_id, message]
      );
      conversation_id = newConversationResult.insertId; // Get the new conversation ID
      console.log("Created new conversation with ID:", conversation_id); // Debugging: Log new conversation ID
    } else {
      conversation_id = conversationRows[0].id; // Use the existing conversation ID
      console.log("Using existing conversation with ID:", conversation_id); // Debugging: Log existing conversation ID
    }

    // Insert the new message into the Messages table
    const insertMessageQuery = `
      INSERT INTO Messages (conversation_id, sender_id, receiver_id, sender_type, receiver_type, message, created_at, isRead) 
      VALUES (?, ?, ?, 'User', 'Customer', ?, NOW(), 0)
    `;

    await connection.query(insertMessageQuery, [
      conversation_id,
      sender_id,
      receiver_id,
      message,
    ]);

    const updateConversationQuery = `
      UPDATE Conversations 
      SET last_message = ?, last_message_date = NOW() 
      WHERE id = ?
    `;
    await connection.query(updateConversationQuery, [message, conversation_id]);

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error while sending message:", error);
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
          a.address_line,
          a.latitude AS customer_latitude,
          a.longitude AS customer_longitude,
          store_address.latitude AS store_latitude,
          store_address.longitude AS store_longitude
        FROM 
          Service_Request sr
        INNER JOIN 
          Service_Type st ON sr.service_type_id = st.id
        INNER JOIN 
          User_Account c ON sr.customer_id = c.id
        INNER JOIN 
          Addresses a ON c.address_id = a.id
        INNER JOIN 
          Stores s ON sr.store_id = s.id
        INNER JOIN 
          Addresses store_address ON s.address_id = store_address.id 
        WHERE 
          sr.store_id = ? 
          AND sr.request_status IN ('Pending Pickup', 'Ongoing Pickup', 'Canceled')
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

// export const handleGetLaundryPickup = async (req, res, connection) => {
//   const { id } = req.params;
//   const { user_id } = req.query;

//   try {
//     await connection.beginTransaction();

//     const query = `
//         SELECT
//           sr.id AS request_id,
//           c.id AS customer_id,
//           sr.customer_fullname,
//           sr.request_date,
//           sr.pickup_date,
//           sr.delivery_date,
//           sr.request_status,
//           st.service_name,
//           st.default_price,
//           a.address_line,
//           a.latitude AS customer_latitude,
//           a.longitude AS customer_longitude,
//           store_address.latitude AS store_latitude,
//           store_address.longitude AS store_longitude,
//           (
//             SELECT COUNT(*)
//             FROM Messages m
//             INNER JOIN Conversations conv ON conv.id = m.conversation_id
//             WHERE
//               (conv.user_sender_id = ? AND conv.customer_receiver_id = c.id) OR
//               (conv.customer_sender_id = c.id AND conv.user_receiver_id = ?)
//               AND m.isRead = 0
//           ) AS unread_messages
//         FROM
//           Service_Request sr
//         INNER JOIN
//           Service_Type st ON sr.service_type_id = st.id
//         INNER JOIN
//           Customer c ON sr.customer_id = c.id
//         INNER JOIN
//           Addresses a ON c.address_id = a.id
//         INNER JOIN
//           Stores s ON sr.store_id = s.id
//         INNER JOIN
//           Addresses store_address ON s.address_id = store_address.id
//         WHERE
//           sr.store_id = ?
//           AND sr.request_status IN ('Pending Pickup', 'Ongoing Pickup', 'Canceled')
//           AND st.isArchive = 0
//           AND c.isArchive = 0
//       `;

//     const [rows] = await connection.execute(query, [user_id, user_id, id]);

//     // Compute distances for each row
//     const resultsWithDistance = rows.map((row) => {
//       const distance = haversineDistance(
//         row.store_latitude,
//         row.store_longitude,
//         row.customer_latitude,
//         row.customer_longitude
//       );
//       const formattedDistance = `${distance.toFixed(2)} km`;
//       return {
//         ...row,
//         distance: formattedDistance,
//       };
//     });

//     await connection.commit();

//     res.status(200).json({
//       success: true,
//       data: resultsWithDistance,
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching service requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching data.",
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// };

// PUT
//#PENDING CANCEL
export const handleUpdateServiceRequestCancel = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    await connection.beginTransaction();

    const updateQuery = `
        UPDATE Service_Request
        SET request_status = 'Canceled',  user_id = ?
        WHERE id = ?`;

    const [result] = await connection.execute(updateQuery, [user_id, id]);

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

//#PENDING TO ONGOING
export const handleUpdateServiceRequestOngoing = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    await connection.beginTransaction();

    const updateQuery = `
      UPDATE Service_Request
      SET request_status = 'Ongoing Pickup', user_id = ?
      WHERE id = ?`;

    await connection.execute(updateQuery, [user_id, id]);

    const updateProgressQuery = `
      UPDATE Service_Progress
      SET completed = true,
          status_date = NOW()
      WHERE service_request_id = ? AND stage = 'Ongoing Pickup'`;

    await connection.execute(updateProgressQuery, [id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Request status updated to Ongoing Pickup.",
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the request.",
    });
  } finally {
    connection.release();
  }
};

//#ONGOING TO PENDING
export const handleUpdateServiceRequestBackToPending = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    await connection.beginTransaction();

    const updateQuery = `
          UPDATE Service_Request
          SET request_status = 'Pending Pickup', user_id = NULL
          WHERE id = ?`;

    await connection.execute(updateQuery, [id]);

    const updateProgressQuery = `
      UPDATE Service_Progress
      SET completed = false,
          status_date = NULL
      WHERE service_request_id = ? AND stage = 'Ongoing Pickup'`;

    await connection.execute(updateProgressQuery, [id]);

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

//#ONGOING TO COMPLETED
export const handleUpdateServiceRequestFinishPickup = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const updateQuery = `
          UPDATE Service_Request
          SET request_status = 'Completed Pickup',
            pickup_date = NOW(),
            isPickup = TRUE
          WHERE id = ?`;

    await connection.execute(updateQuery, [id]);

    const updateProgressQuery = `
      UPDATE Service_Progress
      SET completed = true,
          status_date = NOW()
      WHERE service_request_id = ? AND stage = 'Completed Pickup'`;

    await connection.execute(updateProgressQuery, [id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Request status updated to Completed Pickup.",
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

//#SCAN QRCODE
export const handleUpdateServiceRequestUsingQrCode = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;
  const { code, user_id } = req.body;

  console.log(user_id);

  try {
    await connection.beginTransaction();

    // Step 1: Check if the tracking code exists in the Service_Request table
    const [existingRequest] = await connection.execute(
      `SELECT request_status, isPickup, isDelivery FROM Service_Request WHERE id = ? AND tracking_code = ?`,
      [id, code]
    );

    if (existingRequest.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "Service request not found." });
    }

    const { request_status, isPickup, isDelivery } = existingRequest[0];

    // Step 2: Check the request_status to determine availability
    if (
      request_status === "Canceled" ||
      request_status === "Completed Delivery"
    ) {
      return res.status(200).json({
        success: false,
        message: "This service request is not available anymore.",
      });
    }

    // Step 3: Check if isPickup is false and update the status to "Completed Pickup"
    if (
      !isPickup &&
      (request_status === "Pending Pickup" ||
        request_status === "Ongoing Pickup")
    ) {
      await connection.execute(
        `UPDATE Service_Request SET user_id = ?, request_status = ?,  pickup_date = NOW(), isPickup = ? WHERE id = ?`,
        [user_id, "Completed Pickup", true, id]
      );

      await connection.execute(
        `UPDATE Service_Progress 
         SET completed = true,
             status_date = NOW()
         WHERE service_request_id = ? AND (stage = 'Ongoing Pickup' OR stage = 'Completed Pickup')`,
        [id]
      );
    }
    // New Step: If isPickup is true and request_status is "Completed Pickup"
    else if (
      isPickup && // Only check if pickup is completed
      (request_status === "Ready for Delivery" ||
        request_status === "Out for Delivery")
    ) {
      await connection.execute(
        `UPDATE Service_Request SET request_status = ?,  delivery_date = NOW(), isDelivery = ? WHERE id = ?`,
        ["Completed Delivery", true, id]
      );

      await connection.execute(
        `UPDATE Service_Progress 
         SET completed = true,
             status_date = NOW()
         WHERE service_request_id = ? AND (stage = 'Out for Delivery' OR stage = 'Completed Delivery')`,
        [id]
      );
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid request status or pickup/delivery already completed.",
      });
    }

    // Step 4: Commit the transaction if everything is fine
    await connection.commit();
    res.status(200).json({
      success: true,
      message: "Service request updated successfully.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Database operation error:", error);
    res.status(500).json({ message: "Error updating service request." });
  } finally {
    if (connection) connection.release();
  }
};

// export const handleSetMessagesSenderIsStaff = async (req, res, connection) => {
//   const { sender_id, receiver_id, message } = req.body; // sender_id = staff ID, receiver_id = customer ID
//   try {
//     // Begin transaction
//     await connection.beginTransaction();

//     console.log("Incoming message details:", {
//       sender_id,
//       receiver_id,
//       message,
//     });

//     // Check if a conversation already exists
//     const findConversationQuery = `
//       SELECT id FROM Conversations
//       WHERE (user_sender_id IS NULL AND customer_sender_id = ? AND user_receiver_id = ?) OR
//             (customer_sender_id IS NULL AND user_sender_id = ? AND customer_receiver_id = ?)
//       LIMIT 1
//     `;

//     const [conversationRows] = await connection.query(findConversationQuery, [
//       receiver_id, // Customer ID who started the conversation
//       sender_id, // User (staff) ID who is replying
//       sender_id, // User (staff) ID who is replying
//       receiver_id, // Customer ID who is receiving the reply
//     ]);

//     console.log("Conversation Rows:", conversationRows); // Debugging: Log conversation rows

//     let conversation_id;

//     // If no conversation exists, create a new one
//     if (conversationRows.length === 0) {
//       const insertConversationQuery = `
//         INSERT INTO Conversations (user_sender_id, customer_sender_id, user_receiver_id, customer_receiver_id, last_message, last_message_date, created_at, updated_at)
//         VALUES (?, NULL, NULL, ?, ?, NOW(), NOW(), NOW())
//       `;

//       const [newConversationResult] = await connection.query(
//         insertConversationQuery,
//         [sender_id, receiver_id, message]
//       );
//       conversation_id = newConversationResult.insertId; // Get the new conversation ID
//       console.log("Created new conversation with ID:", conversation_id); // Debugging: Log new conversation ID
//     } else {
//       conversation_id = conversationRows[0].id; // Use the existing conversation ID
//       console.log("Using existing conversation with ID:", conversation_id); // Debugging: Log existing conversation ID
//     }

//     // Insert the new message into the Messages table
//     const insertMessageQuery = `
//       INSERT INTO Messages (conversation_id, sender_id, receiver_id, sender_type, receiver_type, message, created_at, isRead)
//       VALUES (?, ?, ?, 'User', 'Customer', ?, NOW(), 0)
//     `;

//     await connection.query(insertMessageQuery, [
//       conversation_id,
//       sender_id,
//       receiver_id,
//       message,
//     ]);

//     const updateConversationQuery = `
//       UPDATE Conversations
//       SET last_message = ?, last_message_date = NOW()
//       WHERE id = ?
//     `;
//     await connection.query(updateConversationQuery, [message, conversation_id]);

//     await connection.commit();

//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully.",
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error while sending message:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while sending the message.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// export const handleSetMessagesSenderIsStaff = async (req, res, connection) => {
//   const { sender_id, receiver_id, message } = req.body;
//   console.log(req.body);
//   try {
//     // Begin transaction
//     await connection.beginTransaction();

//     const findConversationQuery = `
//       SELECT id FROM Conversations
//       WHERE (user_sender_id IS NULL AND customer_sender_id = ? AND user_receiver_id = ?) OR
//             (customer_sender_id IS NULL AND user_sender_id = ? AND customer_receiver_id = ?)
//       LIMIT 1
//     `;

//     const [conversationRows] = await connection.query(findConversationQuery, [
//       sender_id, // User (staff) ID who is replying
//       receiver_id, // Customer ID who is receiving the reply
//       receiver_id, // Customer ID who started the conversation
//       sender_id, // User (staff) ID who is replying
//     ]);

//     console.log("Conversation Rows:", conversationRows);

//     let conversation_id;

//     console.log(conversationRows);

//     // If no conversation exists, create a new one
//     if (conversationRows.length === 0) {
//       const insertConversationQuery = `
//         INSERT INTO Conversations (user_sender_id, customer_sender_id, user_receiver_id, customer_receiver_id, last_message, last_message_date, created_at, updated_at)
//         VALUES (?, NULL, NULL, ?, ?, NOW(), NOW(), NOW())
//       `;

//       const [newConversationResult] = await connection.query(
//         insertConversationQuery,
//         [sender_id, receiver_id, message]
//       );
//       conversation_id = newConversationResult.insertId; // Get the new conversation ID
//     } else {
//       conversation_id = conversationRows[0].id;
//     }

//     // Insert the new message into the Messages table
//     const insertMessageQuery = `
//       INSERT INTO Messages (conversation_id, sender_id, receiver_id, sender_type, receiver_type, message, created_at, isRead)
//       VALUES (?, ?, ?, 'User', 'Customer', ?, NOW(), 0)
//     `;

//     await connection.query(insertMessageQuery, [
//       conversation_id,
//       sender_id,
//       receiver_id,
//       message,
//     ]);

//     const updateConversationQuery = `
//       UPDATE Conversations
//       SET last_message = ?, last_message_date = NOW()
//       WHERE id = ?
//     `;
//     await connection.query(updateConversationQuery, [message, conversation_id]);

//     await connection.commit();

//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully.",
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error while sending message:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while sending the message.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// export const handlePostNewMessages = async (req, res, connection) => {
//   const { id } = req.params; // assuming this is either sender's user/customer id
//   const { receiverId, text, senderType, receiverType } = req.body;

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

// export const handleGetStaffMessages = async (req, res, connection) => {
//   const { id } = req.params; // 'id' is the User_Account ID (e.g., staff ID)

//   try {
//     await connection.beginTransaction();

//     const query = `
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
//           WHEN m.recipient_customer_id IS NOT NULL THEN CONCAT(c.c_firstname, ' ', c.c_middlename, ' ', c.c_lastname)
//           WHEN m.recipient_user_account_id IS NOT NULL THEN CONCAT(u.first_name, ' ', u.middle_name, ' ', u.last_name)
//         END AS recipient_full_name
//       FROM Message m
//       LEFT JOIN Customer c ON m.sender_customer_id = c.id OR m.recipient_customer_id = c.id
//       LEFT JOIN User_Account u ON m.sender_user_account_id = u.id OR m.recipient_user_account_id = u.id
//       WHERE (
//         m.sender_user_account_id = ? OR
//         m.recipient_user_account_id = ?
//       )
//       ORDER BY m.date_sent DESC
//     `;

//     const [rows] = await connection.execute(query, [id, id]);

//     await connection.commit();

//     res.status(200).json({
//       success: true,
//       data: rows,
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching staff messages:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching the staff messages.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// export const handleGetStaffConvo = async (req, res, connection) => {
//   const { id } = req.params; // This is the staff ID
//   const { id } = req.body;

//   try {
//     await connection.beginTransaction();

//     const [rows] = await connection.query(
//       `
//           SELECT
//               m.id,
//               m.message,
//               m.isRead,
//               m.date_sent,
//               COALESCE(CONCAT(ua_sender.first_name, ' ', ua_sender.middle_name, ' ', ua_sender.last_name),
//                        CONCAT(c_sender.c_firstname, ' ', c_sender.c_middlename, ' ', c_sender.c_lastname)) AS sender_fullname,
//               COALESCE(CONCAT(ua_recipient.first_name, ' ', ua_recipient.middle_name, ' ', ua_recipient.last_name),
//                        CONCAT(c_recipient.c_firstname, ' ', c_recipient.c_middlename, ' ', c_recipient.c_lastname)) AS recipient_fullname
//           FROM
//               Message m
//           LEFT JOIN
//               User_Account ua_sender ON m.sender_user_account_id = ua_sender.id
//           LEFT JOIN
//               User_Account ua_recipient ON m.recipient_user_account_id = ua_recipient.id
//           LEFT JOIN
//               Customer c_sender ON m.sender_customer_id = c_sender.id
//           LEFT JOIN
//               Customer c_recipient ON m.recipient_customer_id = c_recipient.id
//           WHERE
//               m.sender_user_account_id = ? OR m.recipient_user_account_id = ?
//           ORDER BY
//               m.date_sent DESC
//           `,
//       [id, id]
//     );

//     await connection.commit();

//     // Transform rows into inbox-like structure
//     const inbox = {};

//     rows.forEach((message) => {
//       const recipientId =
//         message.recipient_user_account_id || message.recipient_customer_id;
//       const recipientName = message.recipient_fullname;

//       if (!inbox[recipientId]) {
//         inbox[recipientId] = {
//           recipient_id: recipientId,
//           recipient_fullname: recipientName,
//           messages: [],
//         };
//       }

//       inbox[recipientId].messages.push({
//         id: message.id,
//         sender_fullname: message.sender_fullname,
//         message: message.message,
//         isRead: message.isRead,
//         date_sent: message.date_sent,
//       });
//     });

//     // Convert the inbox object to an array
//     const inboxArray = Object.values(inbox);

//     res.status(200).json({
//       success: true,
//       data: inboxArray,
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching staff messages:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching the staff messages.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// export const handleGetStaffMessages = async (req, res, connection) => {
//   const { id } = req.params; // This is the staff ID

//   try {
//     await connection.beginTransaction();

//     const [rows] = await connection.query(
//       `
//           SELECT
//               m.id,
//               m.message,
//               m.isRead,
//               m.date_sent,
//               COALESCE(CONCAT(ua_sender.first_name, ' ', ua_sender.middle_name, ' ', ua_sender.last_name),
//                        CONCAT(c_sender.c_firstname, ' ', c_sender.c_middlename, ' ', c_sender.c_lastname)) AS sender_fullname,
//               COALESCE(CONCAT(ua_recipient.first_name, ' ', ua_recipient.middle_name, ' ', ua_recipient.last_name),
//                        CONCAT(c_recipient.c_firstname, ' ', c_recipient.c_middlename, ' ', c_recipient.c_lastname)) AS recipient_fullname
//           FROM
//               Message m
//           LEFT JOIN
//               User_Account ua_sender ON m.sender_user_account_id = ua_sender.id
//           LEFT JOIN
//               User_Account ua_recipient ON m.recipient_user_account_id = ua_recipient.id
//           LEFT JOIN
//               Customer c_sender ON m.sender_customer_id = c_sender.id
//           LEFT JOIN
//               Customer c_recipient ON m.recipient_customer_id = c_recipient.id
//           WHERE
//               m.sender_user_account_id = ? OR m.recipient_user_account_id = ?
//           ORDER BY
//               m.date_sent DESC
//           `,
//       [id, id]
//     );

//     await connection.commit();

//     // Transform rows into inbox-like structure
//     const inbox = {};

//     rows.forEach((message) => {
//       const recipientId =
//         message.recipient_user_account_id || message.recipient_customer_id;
//       const recipientName = message.recipient_fullname;

//       if (!inbox[recipientId]) {
//         inbox[recipientId] = {
//           recipient_id: recipientId,
//           recipient_fullname: recipientName,
//           messages: [],
//         };
//       }

//       inbox[recipientId].messages.push({
//         id: message.id,
//         sender_fullname: message.sender_fullname,
//         message: message.message,
//         isRead: message.isRead,
//         date_sent: message.date_sent,
//       });
//     });

//     // Convert the inbox object to an array
//     const inboxArray = Object.values(inbox);

//     res.status(200).json({
//       success: true,
//       data: inboxArray,
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching staff messages:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching the staff messages.",
//     });
//   } finally {
//     connection.release();
//   }
// };
