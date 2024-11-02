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

export const handleGetCustomerList = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        ua.id AS customer_id,
        ua.username,
        ua.email,
        ua.mobile_number,
        ua.first_name,
        ua.middle_name,
        ua.last_name,
        ua.date_created,
        a.address_line,
        a.country,
        a.province,
        a.city,
        a.postal_code
      FROM 
        User_Account ua
      LEFT JOIN 
        Addresses a ON ua.address_id = a.id
      WHERE 
        ua.store_id = ? AND ua.user_type = 'Customer' AND ua.isArchive = 0
    `;

    const [rows] = await connection.execute(query, [id]);

    await connection.commit();

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No customers found." });
    }

    const customers = rows.map((row) => {
      const fullName = [row.first_name, row.middle_name, row.last_name]
        .filter(Boolean)
        .join(" ");
      return {
        customer_id: row.customer_id,
        username: row.username,
        email: row.email,
        mobile_number: row.mobile_number,
        full_name: fullName,
        date_created: row.date_created,
        address: {
          address_line: row.address_line,
          country: row.country,
          province: row.province,
          city: row.city,
          postal_code: row.postal_code,
        },
      };
    });

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// export const handleGetCustomerList = async (req, res, connection) => {
//   const { id } = req.params; // store id

//   console.log(id);

//   try {
//     await connection.beginTransaction();
//   } catch (error) {
//     console.error("", error);
//     res.status(500).json({ error: "" });
//   }
// };

// export const handleCustomerServiceRequest = async (req, res, connection) => {
//   const { id } = req.params;
//   const {
//     store_id,
//     service_type

//   } = req.body;

//   await connection.execute();
// };
