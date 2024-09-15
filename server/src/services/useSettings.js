
// <----- Service Type Section ----->
// Set new service type
export const handleSetNewServiceType = async (req, res, connection) => {
  const { store_id, service_name, default_price } = req.body;

  try {
    // Start transaction
    await connection.beginTransaction();

    // Check if the service_name already exists for the given store_id
    const checkQuery = `
        SELECT id FROM Service_Type 
        WHERE store_id = ? AND service_name = ? AND isArchive = 0
      `;
    const [existingService] = await connection.query(checkQuery, [
      store_id,
      service_name,
    ]);

    // If service name exists, send a message
    if (existingService.length > 0) {
      return res
        .status(200)
        .json({ success: false, message: "Service name already exists." });
    }

    // If service name does not exist, insert the new service type
    const insertQuery = `
        INSERT INTO Service_Type (store_id, service_name, default_price, date_created, isArchive)
        VALUES (?, ?, ?, NOW(), 0)
      `;

    await connection.query(insertQuery, [
      store_id,
      service_name,
      default_price,
    ]);

    // Commit transaction
    await connection.commit();

    res.status(200).json({success: true, message: "Service type created successfully." });
  } catch (error) {
    // Rollback transaction in case of error
    await connection.rollback();
    res
      .status(500)
      .json({ error: "An error occurred while creating the service type." });
  }
};

// Get the service type
export const handleGetServiceTypeAndStore = async (req, res, connection) => {
  const { id } = req.params; // its based on user id of user

}


// Update the details of service type


// Delete the service type



// <----- ----- ----->






// export const handleSetNewServiceType = async (req, res, connection) => {
//     const {store_id, service_name, default_price,} = req.body;

//     try {
//       await connection.beginTransaction();

//       const query = `

//       `;

//       res.status(200).json({  });
//     } catch (error) {
//       await connection.rollback();
//       res.status(500).json({ error: "" });
//     }
//   };
