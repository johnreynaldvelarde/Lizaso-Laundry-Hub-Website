export const handleCreateBranch = async (req, res, db) => {
  const { store_id, store_name, store_address, store_contact } = req.body;

  try {
    // Check if store_id already exists
    const [existingStoreId] = await db.query('SELECT * FROM Stores WHERE store_id = ?', [store_id]);
    if (existingStoreId.length > 0) {
      return res.status(400).json({ success: false, message: 'Store No already exists' });
    }

    // Check if store_name already exists
    const [existingStoreName] = await db.query('SELECT * FROM Stores WHERE store_name = ?', [store_name]);
    if (existingStoreName.length > 0) {
      // return res.status(400).json({ success: false, message: 'Store name already exists' });
      return res.status(400).json({ success: false, message: 'Store name already exists' });
    }

    // Insert the new store
    const result = await db.query(
      'INSERT INTO Stores (store_id, store_name, store_address, store_contact, is_main_store, updated_at, date_created, isStatus, isArchive) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)',
      [store_id, store_name, store_address, store_contact, false, true, false]
    );

    res.status(201).json({ success: true, message: 'Store created successfully', storeId: store_id });

  } catch (error) {
    console.error("Error creating new store:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const handleViewBranch = async (req, res, db) => {};
