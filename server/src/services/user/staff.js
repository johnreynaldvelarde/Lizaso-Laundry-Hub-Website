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

export const handleGetStaffMessages = async (req, res, connection) => {
  const { id } = req.params; // This is the staff ID

  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      `
          SELECT 
              m.id,
              m.message,
              m.isRead,
              m.date_sent,
              COALESCE(CONCAT(ua_sender.first_name, ' ', ua_sender.middle_name, ' ', ua_sender.last_name), 
                       CONCAT(c_sender.c_firstname, ' ', c_sender.c_middlename, ' ', c_sender.c_lastname)) AS sender_fullname,
              COALESCE(CONCAT(ua_recipient.first_name, ' ', ua_recipient.middle_name, ' ', ua_recipient.last_name), 
                       CONCAT(c_recipient.c_firstname, ' ', c_recipient.c_middlename, ' ', c_recipient.c_lastname)) AS recipient_fullname
          FROM 
              Message m
          LEFT JOIN 
              User_Account ua_sender ON m.sender_user_account_id = ua_sender.id
          LEFT JOIN 
              User_Account ua_recipient ON m.recipient_user_account_id = ua_recipient.id
          LEFT JOIN 
              Customer c_sender ON m.sender_customer_id = c_sender.id
          LEFT JOIN 
              Customer c_recipient ON m.recipient_customer_id = c_recipient.id
          WHERE 
              m.sender_user_account_id = ? OR m.recipient_user_account_id = ?
          ORDER BY 
              m.date_sent DESC
          `,
      [id, id]
    );

    await connection.commit();

    // Transform rows into inbox-like structure
    const inbox = {};

    rows.forEach((message) => {
      const recipientId =
        message.recipient_user_account_id || message.recipient_customer_id;
      const recipientName = message.recipient_fullname;

      if (!inbox[recipientId]) {
        inbox[recipientId] = {
          recipient_id: recipientId,
          recipient_fullname: recipientName,
          messages: [],
        };
      }

      inbox[recipientId].messages.push({
        id: message.id,
        sender_fullname: message.sender_fullname,
        message: message.message,
        isRead: message.isRead,
        date_sent: message.date_sent,
      });
    });

    // Convert the inbox object to an array
    const inboxArray = Object.values(inbox);

    res.status(200).json({
      success: true,
      data: inboxArray,
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

// export const handleGetStaffsMessages = async (req, res, connection) => {
//   const { id } = req.params; // This is the staff ID

//   try {
//     await connection.beginTransaction();

//     const [rows] = await connection.query(
//       `
//       SELECT
//         m.id,
//         m.message,
//         m.isRead,
//         m.date_sent,
//         ua_sender.username AS sender_username,
//         ua_recipient.username AS recipient_username,
//         c_sender.c_username AS sender_customer_username,
//         c_recipient.c_username AS recipient_customer_username
//       FROM
//         Message m
//       LEFT JOIN
//         User_Account ua_sender ON m.sender_user_account_id = ua_sender.id
//       LEFT JOIN
//         User_Account ua_recipient ON m.recipient_user_account_id = ua_recipient.id
//       LEFT JOIN
//         Customer c_sender ON m.sender_customer_id = c_sender.id
//       LEFT JOIN
//         Customer c_recipient ON m.recipient_customer_id = c_recipient.id
//       WHERE
//         m.sender_user_account_id = ? OR m.recipient_user_account_id = ?
//       ORDER BY
//         m.date_sent DESC
//     `,
//       [id, id]
//     );

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

// PUT

// export const handleGetStaffsMessages = async (req, res, connection) => {
//   const { id } = req.params; // this is id of staff

//   try {
//     await connection.beginTransaction();

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

// export const handleGetStaffMessages = async (req, res, connection) => {
//   const { id } = req.params; // This is the staff ID
// };

// try {
//   await connection.beginTransaction();

//   const [rows] = await connection.query(
//     `
//     SELECT
//       m.id,
//       m.message,
//       m.isRead,
//       m.date_sent,
//       CONCAT(ua_sender.first_name, ' ', ua_sender.middle_name, ' ', ua_sender.last_name) AS sender_fullname,
//       ua_sender.id AS sender_id,
//       CONCAT(ua_recipient.first_name, ' ', ua_recipient.middle_name, ' ', ua_recipient.last_name) AS recipient_fullname,
//       ua_recipient.id AS recipient_id,
//       CONCAT(c_sender.c_firstname, ' ', c_sender.c_middlename, ' ', c_sender.c_lastname) AS sender_customer_fullname,
//       c_sender.id AS sender_customer_id,
//       CONCAT(c_recipient.c_firstname, ' ', c_recipient.c_middlename, ' ', c_recipient.c_lastname) AS recipient_customer_fullname,
//       c_recipient.id AS recipient_customer_id
//     FROM
//       Message m
//     LEFT JOIN
//       User_Account ua_sender ON m.sender_user_account_id = ua_sender.id
//     LEFT JOIN
//       User_Account ua_recipient ON m.recipient_user_account_id = ua_recipient.id
//     LEFT JOIN
//       Customer c_sender ON m.sender_customer_id = c_sender.id
//     LEFT JOIN
//       Customer c_recipient ON m.recipient_customer_id = c_recipient.id
//     WHERE
//       m.sender_user_account_id = ? OR m.recipient_user_account_id = ?
//     ORDER BY
//       m.date_sent DESC
//   `,
//     [id, id]
//   );

//   await connection.commit();

//   res.status(200).json({
//     success: true,
//     data: rows,
//   });
// } catch (error) {
//   await connection.rollback();
//   console.error("Error fetching staff messages:", error);
//   res.status(500).json({
//     success: false,
//     message: "An error occurred while fetching the staff messages.",
//   });
// } finally {
//   connection.release();
// }
