import QRCode from "qrcode";
// POST
export const handleSetCustomerServiceRequest = async (req, res, connection) => {
  const { id } = req.params; // Customer ID
  const { store_id, service_type_id, customer_name, notes } = req.body;

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
    const query = `
      INSERT INTO Service_Request (
          store_id,
          customer_id,
          service_type_id,
          customer_fullname,
          notes,
          request_date,
          request_status,
          qr_code_generated
        ) 
      VALUES (?, ?, ?, ?, ?, NOW(), ?, 0)`;

    const [result] = await connection.execute(query, [
      store_id,
      id,
      service_type_id,
      customer_name,
      notes,
      "In Queue",
    ]);

    // Get the ID of the newly created service request
    const newRequestId = result.insertId;

    // Generate a unique QR code based on the service request ID
    const qrCodeData = `SR-${newRequestId}-${Date.now()}`; // Unique string for QR code (e.g., Service Request ID and timestamp)

    const qrCodeString = await QRCode.toDataURL(qrCodeData); // Generates a data URL for the QR code

    // Update the Service_Request table with the generated QR code
    const updateQuery = `
      UPDATE Service_Request 
      SET qr_code = ?, qr_code_generated = 1
      WHERE id = ?`;

    await connection.execute(updateQuery, [qrCodeString, newRequestId]);

    // Commit the transaction
    await connection.commit();

    // Respond with the created service request ID and success message
    res.status(201).json({
      message: "Service request created!",
      service_request_id: newRequestId,
      qr_code: qrCodeString,
    });
  } catch (error) {
    // Rollback the transaction if any error occurs
    await connection.rollback();

    console.error("Error creating service request:", error);

    res.status(500).json({ error: "Internal Server Error" });
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
        Service_Promotions sp ON st.id = sp.service_id 
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
