export const handleCreateStore = async (req, res, connection) => {
  const {
    store_no,
    store_name,
    store_contact,
    store_email,
    address_line,
    country,
    province,
    city,
    postal_code,
    latitude,
    longitude,
  } = req.body;

  try {
    await connection.beginTransaction();

    // Check if the store_no already exists
    const [existingStoreNo] = await connection.execute(
      "SELECT * FROM Stores WHERE store_no = ?",
      [store_no]
    );
    if (existingStoreNo.length > 0) {
      return res.status(200).json({
        success: false,
        message_store_no: "Store No. already exists, please generate again",
      });
    }

    // Check if the store_name already exists
    const [existingStoreName] = await connection.execute(
      "SELECT * FROM Stores WHERE store_name = ?",
      [store_name]
    );
    if (existingStoreName.length > 0) {
      return res.status(200).json({
        success: false,
        message_store_name: "Store name already exists",
      });
    }

    // Insert the address into the Addresses table
    const [addressResult] = await connection.execute(
      `INSERT INTO Addresses (address_line, country, province, city, postal_code, latitude, longitude, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [address_line, country, province, city, postal_code, latitude, longitude]
    );

    const address_id = addressResult.insertId;

    // Insert the store into the Stores table with the address_id
    await connection.execute(
      `INSERT INTO Stores (address_id, store_no, store_name, store_contact, store_email, is_main_store, updated_at, date_created, isStatus, isArchive)
         VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW(), 1, 0)`,
      [address_id, store_no, store_name, store_contact, store_email]
    );

    // Commit the transaction
    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Store created successfully",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating new store:", error);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};

export const handleViewStore = async (req, res, connection) => {
  try {
    const [rows] = await connection.query(
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
