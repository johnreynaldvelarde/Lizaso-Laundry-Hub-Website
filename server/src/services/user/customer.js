import QRCode from "qrcode";
import { generateTrackingCode } from "../../helpers/generateCode.js";
import { progress } from "../../helpers/_progress.js";
// POST
export const handleSetCustomerServiceRequest = async (req, res, connection) => {
  const { id } = req.params; // Customer ID
  const { store_id, service_type_id, customer_name, notes, payment_method } =
    req.body;

  const missingFields = [];
  if (!store_id) missingFields.push("store_id");
  if (!customer_name) missingFields.push("customer_name");
  if (!service_type_id) missingFields.push("service_type_id");

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      fields: missingFields,
    });
  }

  try {
    await connection.beginTransaction();

    const trackingCode = generateTrackingCode();

    const query = `
      INSERT INTO Service_Request (
          store_id,
          customer_id,
          service_type_id,
          customer_fullname,
          customer_type,
          notes,
          request_date,
          request_status,
          tracking_code,  
          qr_code_generated,
          payment_method
        ) 
      VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)`;

    const [result] = await connection.execute(query, [
      store_id,
      id,
      service_type_id,
      customer_name,
      "Online",
      notes,
      "Pending Pickup",
      trackingCode,
      0,
      payment_method,
    ]);

    // Get the ID of the newly created service request
    const newRequestId = result.insertId;

    // Generate a unique QR code based on the service request ID
    const qrCodeData = `SR-${newRequestId}-${trackingCode}`; // Unique string for QR code (e.g., Service Request ID and timestamp)

    const qrCodeString = await QRCode.toDataURL(qrCodeData);

    // Update the Service_Request table with the generated QR code
    const updateQuery = `
      UPDATE Service_Request 
      SET qr_code = ?, qr_code_generated = 1
      WHERE id = ?`;

    await connection.execute(updateQuery, [qrCodeData, newRequestId]);

    // Insert initial progress entry into Service_Progress table
    const progressQuery = `
      INSERT INTO Service_Progress (
          service_request_id,
          stage,
          description,
          status_date,
          completed,
          false_description
        ) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    for (const item of progress) {
      await connection.execute(progressQuery, [
        newRequestId,
        item.stage,
        item.description,
        item.completed ? new Date() : null,
        item.completed,
        item.falseDescription,
      ]);
    }

    await connection.commit();

    res.status(201).json({
      message: "Service request created!",
      service_request_id: newRequestId,
      qr_code: qrCodeData,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating service request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) connection.release();
  }
};

// #CUSTOMER MESSAGE THE DELIVERY STAFF
export const handleSetMessagesSenderIsCustomer = async (
  req,
  res,
  connection
) => {
  const { sender_id, receiver_id, message } = req.body; // Extract necessary data from the request body

  try {
    // Begin transaction
    await connection.beginTransaction();

    // Check if a conversation already exists
    const findConversationQuery = `
      SELECT id FROM Conversations 
      WHERE (customer_sender_id = ? AND user_receiver_id = ?) OR 
            (user_sender_id = ? AND customer_receiver_id = ?)
      LIMIT 1
    `;

    const [conversationRows] = await connection.query(findConversationQuery, [
      sender_id, // Customer ID who is sending the message
      receiver_id, // User (staff) ID who is receiving the message
      receiver_id, // User (staff) ID who is receiving the message
      sender_id, // Customer ID who is sending the message
    ]);

    // const findConversationQuery = `
    //   SELECT id FROM Conversations
    //   WHERE (user_sender_id = ? AND customer_receiver_id = ?) OR
    //         (customer_sender_id = ? AND user_receiver_id = ?)
    //   LIMIT 1
    // `;

    // const [conversationRows] = await connection.query(findConversationQuery, [
    //   sender_id,
    //   receiver_id,
    //   sender_id,
    //   receiver_id,
    // ]);

    let conversation_id;

    // If no conversation exists, create a new one
    if (conversationRows.length === 0) {
      const insertConversationQuery = `
        INSERT INTO Conversations (user_sender_id, customer_sender_id, user_receiver_id, customer_receiver_id, last_message, last_message_date, created_at, updated_at)
        VALUES (NULL, ?, ?, NULL, ?, NOW(), NOW(), NOW())
      `;

      const [newConversationResult] = await connection.query(
        insertConversationQuery,
        [sender_id, receiver_id, message]
      );
      conversation_id = newConversationResult.insertId; // Get the new conversation ID
    } else {
      conversation_id = conversationRows[0].id; // Use the existing conversation ID
    }

    // Insert the new message into the Messages table
    const insertMessageQuery = `
      INSERT INTO Messages (conversation_id, sender_id, receiver_id, sender_type, receiver_type, message, created_at, isRead) 
      VALUES (?, ?, ?, 'Customer', 'User', ?, NOW(), 0)
    `;

    // Execute the insert query
    await connection.query(insertMessageQuery, [
      conversation_id,
      sender_id,
      receiver_id,
      message,
    ]);

    // Update the last message and last message date in the Conversations table
    const updateConversationQuery = `
      UPDATE Conversations 
      SET last_message = ?, last_message_date = NOW() 
      WHERE id = ?
    `;
    await connection.query(updateConversationQuery, [message, conversation_id]);

    // Commit the transaction
    await connection.commit();

    // Send a successful response
    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await connection.rollback();
    console.error("Error while sending message:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the message.",
    });
  } finally {
    // Release the database connection
    connection.release();
  }
};

// GET
export const handleGetServiceTypeAndPromotions = async (
  req,
  res,
  connection
) => {
  const { id } = req.params; // store id from the request params

  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        st.id AS service_id,
        st.service_name,
        st.description,
        st.default_price,
        sp.id AS promotion_id,
        sp.discount_percentage,
        sp.discount_price,
        sp.valid_days,
        sp.start_date,
        sp.end_date,
        sp.isActive
      FROM 
        Service_Type st
      LEFT JOIN 
        Service_Promo sp ON st.id = sp.service_id 
          AND sp.isActive = 1 
          AND sp.isArchive = 0 
          AND (sp.start_date IS NULL OR sp.start_date <= CURDATE())
          AND (sp.end_date IS NULL OR sp.end_date >= CURDATE())
      WHERE 
        st.store_id = ? 
        AND st.isArchive = 0
    `;

    const [rows] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching services and promotions:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
    });
  } finally {
    if (connection) connection.release();
  }
};

export const handleGetCustomerConvo = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT
        m.id AS message_id,
        m.conversation_id,
        m.sender_id,
        m.receiver_id,
        m.sender_type,
        m.receiver_type,
        m.message,
        m.created_at,
        c.last_message,
        c.last_message_date
      FROM
        Messages m
      JOIN
        Conversations c ON m.conversation_id = c.id
      WHERE
        c.customer_sender_id = ? OR c.customer_receiver_id = ?
      ORDER BY
        m.created_at ASC
    `;

    const [rows] = await connection.execute(query, [id, id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching messages.",
    });
  } finally {
    connection.release();
  }
};

//# TRACKING ORDER
export const handleGetCustomerTrackOrderAndProgress = async (
  req,
  res,
  connection
) => {
  const { id } = req.params; // customer id

  try {
    await connection.beginTransaction();

    // SQL query to get service requests along with progress
    const query = `
      SELECT 
        sr.id AS service_request_id,
        sr.store_id,
        IF(sr.user_id IS NULL, false, sr.user_id) AS user_id,
        sr.customer_id,
        sr.tracking_code,
        sr.customer_fullname,
        sr.customer_type,
        sr.notes,
        COALESCE(CONCAT(ua.first_name, ' ', ua.middle_name, ' ', ua.last_name), 'Waiting...') AS username,
        sr.request_date,
        COALESCE(sr.pickup_date, 'Waiting...') AS pickup_date,
        COALESCE(sr.delivery_date, 'Waiting...') AS delivery_date,
        sr.request_status,
        sr.qr_code,
        sr.qr_code_generated, 
        sr.isPickup,
        sr.isDelivery,
        sp.id AS progress_id,
        sp.stage,
        sp.description,
        sp.completed,
        sp.false_description,
        sp.status_date,
        st.service_name,
        st.default_price,
        COALESCE(lu.unit_name, 'Waiting...') AS unit_name
      FROM 
        Service_Request sr
      LEFT JOIN 
        Service_Progress sp ON sr.id = sp.service_request_id
      LEFT JOIN 
        User_Account ua ON sr.user_id = ua.id
      LEFT JOIN 
        Service_Type st ON sr.service_type_id = st.id
      LEFT JOIN 
        Laundry_Assignment la ON sr.id = la.service_request_id
      LEFT JOIN 
        Laundry_Unit lu ON la.unit_id = lu.id
      WHERE 
        sr.customer_id = ? 
        AND sr.request_status != 'Canceled'
      ORDER BY 
        sr.request_date DESC;
    `;

    const [rows] = await connection.execute(query, [id]);

    // Structure the response data
    const result = rows.reduce((acc, row) => {
      // Check if the service request already exists in the accumulator
      let serviceRequest = acc.find(
        (req) => req.service_request.id === row.service_request_id
      );

      // If it doesn't exist, create a new entry
      if (!serviceRequest) {
        serviceRequest = {
          service_request: {
            id: row.service_request_id,
            store_id: row.store_id,
            user_id: row.user_id,
            user_name: row.username,
            customer_id: row.customer_id,
            service_type_id: row.service_type_id,
            service_name: row.service_name,
            service_default_price: row.default_price,
            tracking_code: row.tracking_code,
            customer_fullname: row.customer_fullname,
            customer_type: row.customer_type,
            notes: row.notes,
            request_date: row.request_date,
            pickup_date: row.pickup_date,
            delivery_date: row.delivery_date,
            request_status: row.request_status,
            qr_code: row.qr_code,
            qr_code_generated: row.qr_code_generated,
            isPickup: row.isPickup,
            isDelivery: row.isDelivery,
            unit_name: row.unit_name,
          },
          progress: [], // Initialize the progress array
        };
        acc.push(serviceRequest);
      }

      // Add the progress information for this service request
      serviceRequest.progress.push({
        id: row.progress_id,
        stage: row.stage,
        description: row.description,
        completed: row.completed,
        status_date: row.status_date,
        false_description: row.false_description,
      });

      return acc;
    }, []);

    result.forEach((serviceRequest) => {
      serviceRequest.progress.sort((a, b) => a.id - b.id);
    });

    await connection.commit();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error customer track order and progress:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
    });
  } finally {
    if (connection) connection.release();
  }
};

// PUT
export const handleUpdateCustomerBasicInformation = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;
  const {
    store_id,
    c_email,
    c_number,
    a_address_line1,
    a_address_line2,
    a_country,
    a_province,
    a_city,
    a_postal_code,
    a_latitude,
    a_longitude,
  } = req.body;

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Insert the new address into the Addresses table
    const [addressResult] = await connection.execute(
      `INSERT INTO Addresses (address_line1, address_line2, country, province, city, postal_code, latitude, longitude, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        a_address_line1,
        a_address_line2,
        a_country,
        a_province,
        a_city,
        a_postal_code,
        a_latitude,
        a_longitude,
      ]
    );

    const addressId = addressResult.insertId;

    // Update the Customer table with the new address_id and store_id
    await connection.execute(
      `UPDATE Customer
         SET store_id = ?, address_id = ?, c_email = ?, c_number = ?
         WHERE id = ?`,
      [store_id, addressId, c_email, c_number, id]
    );

    // Commit the transaction
    await connection.commit();

    // Return success response
    res
      .status(200)
      .json({ success: true, message: "Your info is now up-to-date!" });
  } catch (error) {
    // Rollback transaction on error
    await connection.rollback();
    console.error("Database operation error:", error);
    res.status(500).json({ message: "Error updating customer information" });
  } finally {
    // Release the database connection
    connection.release();
  }
};

// export const handleGetCustomerTrackOrderAndProgress = async (
//   req,
//   res,
//   connection
// ) => {
//   const { id } = req.params; // customer id
//   console.log(id);

//   try {
//     await connection.beginTransaction();

//     // const query = `

//     // `;

//     // const [rows] = await connection.execute(query, [id]);

//     // await connection.commit();

//     // res.status(200).json({
//     //   success: true,
//     //   data: rows,
//     // });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error customer track order and progress:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching data.",
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// };

// export const handleGetMessagesForCustomers = async (req, res, connection) => {
//   try {
//     await connection.beginTransaction();

//     const query = `

//     `;

//     const [rows] = await connection.execute(query);

//     await connection.commit();

//     res.status(200).json({
//       success: true,
//       messages: rows,
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fees.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// export const handleUpdateServiceRequestUsingQrCode = async (
//   req,
//   res,
//   connection
// ) => {
//   const { id } = req.params;
//   const { code } = req.body;

//   try {
//     await connection.beginTransaction();

//     // const [] = await connection.execute();
//   } catch (error) {
//     await connection.rollback();
//     console.error("Database operation error:", error);
//     res.status(500).json({ message: "Error " });
//   } finally {
//     if (connection) connection.release();
//   }
// };

// export const handleSetCustomerServiceRequest = async (req, res, connection) => {
//   const { id } = req.params; // Customer ID
//   const { store_id, service_type_id, customer_name, notes } = req.body;

//   // Validate required fields
//   const missingFields = [];
//   if (!store_id) missingFields.push("store_id");
//   if (!customer_name) missingFields.push("customer_name");
//   if (!service_type_id) missingFields.push("service_type_id");

//   if (missingFields.length > 0) {
//     return res.status(400).json({
//       error: "Missing required fields",
//       fields: missingFields,
//     });
//   }

//   try {
//     // Start the transaction
//     await connection.beginTransaction();

//     const query = `
//       INSERT INTO Service_Request (
//           store_id,
//           customer_id,
//           service_type_id,
//           customer_fullname,
//           notes,
//           request_date,
//           request_status,
//           qr_code_generated
//         )
//        VALUES (?, ?, ?, ?, ?, NOW(), ?, 0)`;

//     const [result] = await connection.execute(query, [
//       store_id,
//       id,
//       service_type_id,
//       customer_name,
//       notes,
//       "In Queue",
//     ]);

//     // Get the ID of the newly created service request
//     const newRequestId = result.insertId;

//     // Commit the transaction
//     await connection.commit();

//     // Respond with the created service request ID and success message
//     res.status(201).json({
//       message: "Service request created!",
//       service_request_id: newRequestId,
//     });
//   } catch (error) {
//     // Rollback the transaction if any error occurs
//     await connection.rollback();

//     console.error("Error creating service request:", error);

//     // Differentiate between database errors and other types of errors
//     if (error.code === "ER_BAD_NULL_ERROR") {
//       return res
//         .status(400)
//         .json({ error: "Bad Request: Null value not allowed." });
//     }

//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // POST
// export const handleCustomerServiceRequest = async (req, res, connection) => {
//   const { id } = req.params;
//   const { store_id, service_type_id, customer_name, notes } = req.body;

//   if (!store_id || !customer_name || !service_type_id) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const [result] = await connection.execute(
//       `INSERT INTO Service_Request (
//           store_id,
//           customer_id,
//           service_type_id,
//           customer_fullname,
//           notes,
//           request_date,
//           request_status
//         ) VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
//       [store_id, id, service_type_id, customer_name, notes, "In Queue"]
//     );

//     // 'Pending Pickup'

//     // Get the ID of the newly created service request
//     const newRequestId = result.insertId;

//     // Respond with the created service request ID and success message
//     res.status(201).json({
//       message: "Service request created successfully",
//       service_request_id: newRequestId,
//     });
//   } catch (error) {
//     console.error("Error creating service request:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const handleUpdateCustomerBasicInformation = async (
//   req,
//   res,
//   connection
// ) => {
//   const { id } = req.params;
//   const {
//     store_id,
//     c_email,
//     c_number,
//     a_address_line1,
//     a_address_line2,
//     a_country,
//     a_province,
//     a_city,
//     a_postal_code,
//     a_latitude,
//     a_longitude,
//   } = req.body;

//   try {
//     // Start a transaction
//     await connection.beginTransaction();

//     // Insert the new address into the Addresses table
//     const [addressResult] = await connection.execute(
//       `INSERT INTO Addresses (address_line1, address_line2, country, province, city, postal_code, latitude, longitude, updated_at)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
//       [
//         a_address_line1,
//         a_address_line2,
//         a_country,
//         a_province,
//         a_city,
//         a_postal_code,
//         a_latitude,
//         a_longitude,
//       ]
//     );

//     const addressId = addressResult.insertId;

//     // Update the Customer table with the new address_id and store_id
//     await connection.execute(
//       `UPDATE Customer
//        SET store_id = ?, address_id = ?, c_email = ?, c_number = ?
//        WHERE id = ?`,
//       [store_id, addressId, c_email, c_number, id]
//     );

//     // Commit the transaction
//     await connection.commit();

//     // Return success response
//     res
//       .status(200)
//       .json({ success: true, message: "Your info is now up-to-date!" });
//   } catch (error) {
//     // Rollback transaction on error
//     await connection.rollback();
//     console.error("Database operation error:", error);
//     res.status(500).json({ message: "Error updating customer information" });
//   } finally {
//     // Release the database connection
//     connection.release();
//   }
// };

// export const handleGetServiceTypeAndPromotions = async (
//   req,
//   res,
//   connection
// ) => {
//   const { id } = req.params; // store id from the request params

//   try {
//     await connection.beginTransaction();
//   } catch (error) {
//     await connection.rollback();
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching data.",
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// };

// export const handlePostNewMessages = async (req, res, connection) => {
//   const { id } = req.params;
//   const {} = req.body;

//   try {
//     await connection.beginTransaction();
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error upda", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the request.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// export const handleGetCustomerMessages = async (req, res, connection) => {
//   const { id } = req.params; // 'id' is the Customer ID (e.g., customer ID)

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
//           WHEN m.recipient_customer_id IS NOT NULL THEN CONCAT(c2.c_firstname, ' ', c2.c_middlename, ' ', c2.c_lastname)
//           WHEN m.recipient_user_account_id IS NOT NULL THEN CONCAT(u2.first_name, ' ', u2.middle_name, ' ', u2.last_name)
//         END AS recipient_full_name
//       FROM Message m
//       LEFT JOIN Customer c ON m.sender_customer_id = c.id OR m.recipient_customer_id = c.id
//       LEFT JOIN User_Account u ON m.sender_user_account_id = u.id OR m.recipient_user_account_id = u.id
//       WHERE (
//         m.sender_customer_id = ? OR
//         m.recipient_customer_id = ?
//       )
//       ORDER BY m.date_sent DESC
//     `;

//     const [rows] = await connection.execute(query, [id, id]);

//     await connection.commit();

//     res.status(200).json({
//       success: true,
//       messages: rows,
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching customer messages:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching the customer messages.",
//     });
//   } finally {
//     connection.release();
//   }
// };
