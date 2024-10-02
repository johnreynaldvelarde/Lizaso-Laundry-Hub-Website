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

export const handleCustomerServiceRequest = async (req, res, connection) => {
  const { id } = req.params;
  const { store_id, customer_name, notes, service_type } = req.body;

  if (!store_id || !customer_name || !service_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await connection.execute(
      `INSERT INTO Service_Request (
          store_id,
          user_id,  -- Assuming you want to assign the delivery person later
          customer_id,
          customer_fullname,
          notes,
          service_type,
          request_date,
          request_status
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)`,
      [store_id, null, id, customer_name, notes, service_type, "In Queue"]
    );

    // 'Pending Pickup'

    // Get the ID of the newly created service request
    const newRequestId = result.insertId;

    // Respond with the created service request ID and success message
    res.status(201).json({
      message: "Service request created successfully",
      service_request_id: newRequestId,
    });
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
