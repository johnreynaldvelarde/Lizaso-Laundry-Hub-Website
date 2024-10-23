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
    const [rows] = await db.query(
      `SELECT s.id, s.address_id, s.store_no, s.store_name, s.store_contact, 
              s.store_email, s.is_main_store, s.updated_at AS store_updated_at, 
              s.date_created, s.isStatus, s.isArchive, 
              a.address_line, a.country, a.province, a.city, a.postal_code, 
              a.latitude, a.longitude, a.updated_at AS address_updated_at
       FROM Stores s
       LEFT JOIN Addresses a ON s.address_id = a.id
       WHERE s.isArchive = 0`
    );

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error retrieving store list:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the store list.",
    });
  }
};

// const [rows] = await db.query(
//   `SELECT id, address_id, store_no, store_name, store_contact,
//           is_main_store, updated_at, date_created, isStatus, isArchive
//    FROM Stores`
// );
