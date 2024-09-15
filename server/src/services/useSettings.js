
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
  const { id } = req.params; // User ID from the request params

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Get the user's store ID and role
    const userQuery = 'SELECT store_id, isRole FROM User_Account WHERE id = ?';
    const [userResults] = await connection.execute(userQuery, [id]);

    if (userResults.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const { store_id, isRole } = userResults[0];

    if (isRole === 0) {
      // Admin or Manager: Get all stores and their service types

      // Get all stores
      const storesQuery = 'SELECT * FROM Stores WHERE isArchive = 0';
      const [stores] = await connection.execute(storesQuery);

      // Get service types for these stores
      const storeIds = stores.map(store => store.id);
      const serviceTypesQuery = `
        SELECT * FROM Service_Type 
        WHERE isArchive = 0 
        AND store_id IN (${storeIds.map(id => `'${id}'`).join(',')})
      `;
      const [serviceTypes] = await connection.execute(serviceTypesQuery);

      await connection.commit();
      return res.json({
        success: true,
        stores,
        serviceTypes,
      });
    } else if (isRole === 1) {
      // User: Get service types based on the store_id
      const serviceTypesQuery = 'SELECT * FROM Service_Type WHERE store_id = ? AND isArchive = 0';
      const [serviceTypes] = await connection.execute(serviceTypesQuery, [store_id]);

      await connection.commit();
      return res.json({
        success: true,
        serviceTypes,
      });
    } else {
      await connection.rollback();
      return res.status(403).json({ success: false, message: "Access forbidden." });
    }
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching service types and stores:", error);
    res.status(500).json({ success: false, message: "An error occurred while fetching data." });
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
};

// export const handleGetServiceTypeAndStore = async (req, res, connection) => {
//   const { id } = req.params; // its based on user id of user

//   try {
//     await connection.beginTransaction();

//     const query = `
      
//     `;

//     const [results] = await connection.execute();

//     await connection.commit();

//     res.status(200).json(results);
//   } catch (error) {
//     await connection.rollback();
//     console.error(");
//     res
//       .status(500)
//       .json({ error: " });
//   }
  
// }


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
