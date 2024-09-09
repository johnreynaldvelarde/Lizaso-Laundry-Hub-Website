export const handleCreateUnits = async (req, res, db) => {
  try {
    // Extract the fields from the request body
    const { store_id, unit_name, isUnitStatus } = req.body;

    // Log received data for debugging purposes
    // console.log('Received data:', { store_id, unit_name, isUnitStatus });

    // Validate input
    if (!store_id || !unit_name || isUnitStatus === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the store_id exists
    const [store] = await db.query(
      "SELECT id FROM Stores WHERE id = ? LIMIT 1",
      [store_id]
    );

    if (!store) {
      return res
        .status(400)
        .json({ success: false, message: "Store not found" });
    }

    // Validate isUnitStatus
    const validStatuses = [0, 1, 2, 3]; // Valid statuses
    if (!validStatuses.includes(isUnitStatus)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid unit status" });
    }

    // Check if the unit_name already exists for the given store_id
    const [unitExists] = await db.query(
      "SELECT * FROM Laundry_Unit WHERE store_id = ? AND unit_name = ? LIMIT 1",
      [store_id, unit_name] // Use store_id from the request body
    );

    if (unitExists.length > 0) {
      // Ensure to check length to verify existence
      return res
        .status(400)
        .json({
          success: false,
          message: "Unit name already exists in this store",
        });
    }

    // Insert the new laundry unit
    await db.query(
      "INSERT INTO Laundry_Unit (store_id, unit_name, isUnitStatus, date_created, isArchive) VALUES (?, ?, ?, NOW(), ?)",
      [store_id, unit_name, isUnitStatus, false] // Or true, depending on your requirement
    );

    res.status(201).json({
      success: true,
      message: "Laundry unit created successfully",
    });
  } catch (error) {
    console.error("Error creating laundry units:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const handleViewUnits = async (req, res, db) => {
  const { store_id } = req.query;
  try {
    if (!store_id) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const [rows] = await db.query(
      "SELECT id, unit_name, isUnitStatus, date_created, isArchive FROM Laundry_Unit WHERE store_id = ? AND isArchive = 0",
      [store_id]
    );

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error retrieving unit list:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the unit list.",
    });
  }
};

// Get Service In Queue
export const handleGetServiceInQueue = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        id, 
        store_id, 
        user_id, 
        customer_id, 
        customer_fullname,
        notes, 
        service_type, 
        request_date, 
        pickup_date, 
        delivery_date, 
        request_status
      FROM 
        Service_Request
      WHERE 
        store_id = ? AND request_status = 'In Queue'
    `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json(results);
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching customer requests:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching customer requests." });
  }
};


// Set Laundry Assignment
export const handleSetLaundryAssignment = async (req, res, connection) => {
  const { id } = req.params; 
  const { requestId, unitId, weight } = req.body; 
  const assignedAt = new Date(); 

  try {
    await connection.beginTransaction();

    const insertQuery = `
      INSERT INTO Laundry_Assignment (
        service_request_id,
        unit_id,
        assigned_by,
        weight,
        assigned_at,
        isAssignmentStatus,
        isCompleted
      )
      VALUES (?, ?, ?, ?, ?, 0, 0)
    `;

    const [insertResults] = await connection.execute(insertQuery, [
      requestId,
      unitId,
      id,
      weight,
      assignedAt
    ]);

    // Update Laundry Unit
    const updateQuery = `
      UPDATE Laundry_Unit
      SET isUnitStatus = 1
      WHERE id = ?
    `;
    await connection.execute(updateQuery, [unitId]);

    // Update the Service_Request
    const updateRequestQuery = `
      UPDATE Service_Request
      SET request_status = 'In Laundry'
      WHERE id = ?
    `;
    await connection.execute(updateRequestQuery, [requestId]);


    await connection.commit();

    res.status(200).json({ message: "Laundry assignment successful", data: insertResults });
  } catch (error) {
    await connection.rollback();
    console.error("Error setting laundry assignment:", error);
    res.status(500).json({ error: "An error occurred while setting the laundry assignment." });
  }
};

// Get unit list that only available only
export const handleGetUnitListAvaiable = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
    SELECT 
      id,
      unit_name 
    FROM 
      Laundry_Unit
    WHERE 
      store_id = ? 
      AND isUnitStatus = '0'
      AND isArchive = '0'
  `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json(results);
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching laundry Unit:", error);
    res.status(500).json({ error: "An error occurred while fetching." });
  }
};


// Counting Section
export const handleGetCountRequestInQueue = async (req, res, connection) => {
  const { id } = req.params; // Store ID to filter requests

  try {
    await connection.beginTransaction();

    const query = `
      SELECT COUNT(*) AS count
      FROM Service_Request
      WHERE store_id = ? AND request_status = 'In Queue'
    `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({
      count: results[0].count
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error getting count of requests in queue:', error);
    res.status(500).json({ error: 'Failed to get request count' });
  }
};

export const handleGetLaundryAssignments = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT
        la.id,
        sr.customer_fullname,
        lu.unit_name,
        la.assigned_at
      FROM Laundry_Assignment la
      JOIN Service_Request sr ON la.service_request_id = sr.id
      JOIN Laundry_Unit lu ON la.unit_id = lu.id
      WHERE sr.store_id = ? 
        AND la.isAssignmentStatus = 0 
        AND la.isCompleted = 0
    `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json(results);
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "An error occurred while fetching assignments." });
  }
};



// export const handleGetLaundryAssignment = async (req, res, connection) => {
//   const { id } = req.params;

//   try {
//     await connection.beginTransaction();

//     const query = `
   
//   `;

//     const [results] = await connection.execute(query, [id]);

//     await connection.commit();

//     res.status(200).json(results);
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching ", error);
//     res.status(500).json({ error: "An error occurred while fetching." });
//   }
// };




















// export const handleGetCountRequestInQueue = async (req, res, connection) => {
//   const { id } = req.params;

//   try {
//     await connection.beginTransaction();

//     const query = `
//     SELECT 
    
//   `;



//     res.status(200).json(results);
//   } catch (error) {
    
//   }
// };



// export const handleSetLaundryAssignment = async (req, res, connection) => {
//   const { id } = req.params;
//   const { requestId, unitId, weight } = req.body; 
//   const assignedAt = new Date(); 

//   try {
//     await connection.beginTransaction();

//     // Define the SQL INSERT query
//     const query = `
//       INSERT INTO Laundry_Assignment (
//         service_request_id,
//         unit_id,
//         assigned_by,
//         weight,
//         assigned_at,
//         isAssignmentStatus,
//         isCompleted
//       )
//       VALUES (?, ?, ?, ?, ?, 0, 0) 
//     `;

//     const [results] = await connection.execute(query, [
//       requestId,
//       unitId,
//       id,
//       weight,
//       assignedAt
//     ]);

//     await connection.commit();

//     res.status(200).json({ message: "Laundry assignment successful", data: results });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error setting laundry assignment:", error);
//     res.status(500).json({ error: "An error occurred while setting the laundry assignment." });
//   }
// };

// export const handleSetLaundryAssignment = async (req, res, connection) => {
//   const { id } = req.params; 
//   const { requestId, unitId, weight } = req.body; 
//   const assignedAt = new Date(); 

//   try {
//     await connection.beginTransaction();

//     const query = `
  
//   `;

//     const [results] = await connection.execute(query, [id]);

//     await connection.commit();

//     res.status(200).json(results);
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching laundry Unit:", error);
//     res.status(500).json({ error: "An error occurred while fetching." });
//   }
// };

// export const handleViewUnits = async (req, res, db) => {
//   try {

//     const { store_id} = req.body;

//     res.status(200).json({
//       success: true,
//       data: rows,
//     });
//   } catch (error) {

//     console.error("Error retrieving unit list:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while retrieving the unit list.",
//     });
//   }
// };
