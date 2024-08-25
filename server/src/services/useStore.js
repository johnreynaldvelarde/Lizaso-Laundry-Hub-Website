export const handleCreateStore = async (req, res, db) => {
  const { store_no, store_name, store_address, store_contact } = req.body;

  try {
    // Check if store_id already exists
    const [existingStoreNo] = await db.query(
      "SELECT * FROM Stores WHERE store_no = ?",
      [store_no]
    );
    if (existingStoreNo.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Store No already exists" });
    }

    // Check if store_name already exists
    const [existingStoreName] = await db.query(
      "SELECT * FROM Stores WHERE store_name = ?",
      [store_name]
    );
    if (existingStoreName.length > 0) {
      // return res.status(400).json({ success: false, message: 'Store name already exists' });
      return res
        .status(400)
        .json({ success: false, message: "Store name already exists" });
    }

    // Insert the new store
    const result = await db.query(
      "INSERT INTO Stores (store_no, store_name, store_address, store_contact, is_main_store, updated_at, date_created, isStatus, isArchive) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)",
      [store_no, store_name, store_address, store_contact, false, false, false]
    );

    res.status(201).json({
      success: true,
      message: "Store created successfully",
    });
  } catch (error) {
    console.error("Error creating new store:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const handleViewStore = async (req, res, db) => {
  try {
    // Query the database to get the list of stores
    const [rows] = await db.query(
      `SELECT id, store_no, store_name, store_address, store_contact, 
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
