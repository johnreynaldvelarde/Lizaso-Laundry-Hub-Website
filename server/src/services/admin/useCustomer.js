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

// export const handleGetCustomerRequest = async (req, res, connection) => {
//   const { id } = req.params;

//   try {
//     await connection.beginTransaction();

//   }
//   catch (error) {
//     console.error('', error);
//     res.status(500).json({ error: '' });
//   }

// }

// export const handleCustomerServiceRequest = async (req, res, connection) => {
//   const { id } = req.params;
//   const {
//     store_id,
//     service_type

//   } = req.body;

//   await connection.execute();
// };
