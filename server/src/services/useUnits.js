export const handleCreateUnits = async (req, res, db) => {
  try {
    const { store_id, unit_name, isUnitStatus } = req.body;

    // Check if the store_id exists
    const storeExists = await db('Stores')
      .select('id')
      .where({ store_id })
      .first();

    if (!storeExists) {
      return res.status(400).json({ success: false, message: "Store not found" });
    }

    // Insert the new laundry unit
    const [newUnitId] = await db('Laundry_Unit').insert({
      store_id: storeExists.id,
      unit_name,
      isUnitStatus,
      date_created: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Laundry unit created successfully",
      unit_id: newUnitId,
    });
  } catch (error) {
    console.error("Error creating laundry units:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const handleViewUnits = async (req, res, db) => {
  try {
    // Query the database to get the list of stores
    const [rows] = await db.query(
      `SELECT id, store_id, store_name, store_address, store_contact, 
                is_main_store, updated_at, date_created, isStatus, isArchive
         FROM Stores`
    );

    // Send a success response with the list of stores
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    // Handle any errors that occurred during the query
    console.error("Error retrieving store list:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the store list.",
    });
  }
};


// export const handleCreateUnits = async (req, res, db) => {
//   try {
//   } catch (error) {
//     console.error("Error creating new store:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
