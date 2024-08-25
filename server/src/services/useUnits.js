export const handleCreateUnits = async (req, res, db) => {
  try {
    // Extract the fields from the request body
    const { store_id, unit_name, isUnitStatus } = req.body;

    // Log received data for debugging purposes
    // console.log('Received data:', { store_id, unit_name, isUnitStatus });

    // Validate input    
    if (!store_id || !unit_name || isUnitStatus === undefined) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the store_id exists
    const [store] = await db.query(
      'SELECT id FROM Stores WHERE id = ? LIMIT 1',
      [store_id]
    );

    if (!store) {
      return res.status(400).json({ success: false, message: "Store not found" });
    }

    // Validate isUnitStatus
    const validStatuses = [0, 1, 2, 3]; // Valid statuses
    if (!validStatuses.includes(isUnitStatus)) {
      return res.status(400).json({ success: false, message: "Invalid unit status" });
    }

    // Check if the unit_name already exists for the given store_id
    const [unitExists] = await db.query(
      'SELECT * FROM Laundry_Unit WHERE store_id = ? AND unit_name = ? LIMIT 1',
      [store_id, unit_name] // Use store_id from the request body
    );

    if (unitExists.length > 0) { // Ensure to check length to verify existence
      return res.status(400).json({ success: false, message: "Unit name already exists in this store" });
    }

    // Insert the new laundry unit
    await db.query(
      'INSERT INTO Laundry_Unit (store_id, unit_name, isUnitStatus, date_created, isArchive) VALUES (?, ?, ?, NOW(), ?)',
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
  try {
    const { store_id } = req.query;

    if (!store_id) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const [rows] = await db.query(
      'SELECT id, unit_name, isUnitStatus, date_created, isArchive FROM Laundry_Unit WHERE store_id = ? AND isArchive = 0',
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

