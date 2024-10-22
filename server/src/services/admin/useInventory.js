export const handleCreateNewItem = async (req, res, connection) => {
  const { store_id, category_id, item_name, price } = req.body;

  try {
    await connection.beginTransaction();

    const checkQuery = `
      SELECT id FROM Item 
      WHERE item_name = ? 
      AND isArchive = 0
    `;

    const [existingItem] = await connection.execute(checkQuery, [item_name]);

    if (existingItem.length > 0) {
      return res
        .status(200)
        .json({ success: false, message: "Item name already exists." });
    }

    const insertItemQuery = `
    INSERT INTO Item (category_id, item_name, isArchive, date_created, updated_at) 
    VALUES (?, ?, 0, NOW(), NOW())
  `;
    const [result] = await connection.execute(insertItemQuery, [
      category_id,
      item_name,
    ]);

    const itemId = result.insertId;

    // Insert into Inventory
    const insertInventoryQuery = `
    INSERT INTO Inventory (store_id, item_id, price, quantity, isStatus) 
    VALUES (?, ?, ?, 0, 0)
  `;
    await connection.execute(insertInventoryQuery, [store_id, itemId, price]);

    await connection.commit();

    res
      .status(201)
      .json({ success: true, message: "Item successfully created." });
  } catch (error) {
    console.error("Error creating new item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};

export const handleViewInventory = async (req, res, db) => {
  const { store_id } = req.query;
  try {
    const query = `
      SELECT 
        Inventory.id AS inventory_id,
        Inventory.item_id,
        Inventory.price,
        Inventory.quantity,
        Inventory.isStatus,
        Item.item_name,
        Item_Category.category_name
      FROM Inventory
      JOIN Item ON Inventory.item_id = Item.id
      JOIN Item_Category ON Item.category_id = Item_Category.id
      WHERE Inventory.store_id = ? AND Item.isArchive = 0
    `;

    const [rows] = await db.query(query, [store_id]);
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const handleCreateItemCategory = async (req, res, db) => {
  const { category_name } = req.body;

  try {
    // Start transaction
    await db.beginTransaction();

    // Check if category name already exists
    const [existingCategoryName] = await db.execute(
      "SELECT * FROM Item_Category WHERE category_name = ?",
      [category_name]
    );
    if (existingCategoryName.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Category name already exists",
      });
    }

    // Insert new category
    await db.execute(
      "INSERT INTO Item_Category (category_name, isArchive, updated_at, date_created) VALUES (?, ?, NOW(), NOW())",
      [category_name, false]
    );

    await db.commit();

    res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    await db.rollback();
    console.error("Error creating new category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (db) db.release();
  }
};

export const handleGetCategory = async (req, res, db) => {
  try {
    const query = `
      SELECT id, category_name
      FROM Item_Category
      WHERE isArchive = 0;
    `;
    const [rows] = await db.query(query);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleViewListCategory = async (req, res, db) => {
  const { store_id } = req.query;
  try {
    if (!store_id) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const sqlQuery = `
      SELECT 
          c.id AS category_id,
          c.category_name,
          c.date_created,
          COUNT(i.id) AS number_of_items
      FROM 
          Item_Category c
      LEFT JOIN 
          Item i ON c.id = i.category_id
      LEFT JOIN 
          Inventory inv ON i.id = inv.item_id AND inv.store_id = ?
      WHERE 
          c.isArchive = 0
      GROUP BY 
          c.id, c.category_name, c.date_created;
    `;

    const [rows] = await db.query(sqlQuery, [store_id]);
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//#PUT
export const handleUpdateCategoryName = async (req, res, connection) => {
  const { id } = req.params;
  const { category_name } = req.body;

  try {
    await connection.beginTransaction();

    const checkQuery = `
      SELECT id FROM Item_Category
      WHERE category_name = ? AND id != ?
    `;
    const [existingCategory] = await connection.execute(checkQuery, [
      category_name,
      id,
    ]);

    if (existingCategory.length > 0) {
      return res.status(200).json({
        status: false,
        message: "Category name already exists for another category.",
      });
    }

    const updateQuery = `
      UPDATE Item_Category
      SET category_name = ?
      WHERE id = ?
    `;

    await connection.execute(updateQuery, [category_name, id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Category name updated successfully.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the category." });
  } finally {
    if (connection) connection.release();
  }
};

export const handleUpdateRemoveCategory = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const updateQuery = `
      UPDATE Item_Category
      SET isArchive = 1
      WHERE id = ?
    `;
    await connection.execute(updateQuery, id);

    await connection.commit();
    res
      .status(200)
      .json({ success: true, message: "Category archived successfully." });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the category." });
  } finally {
    if (connection) connection.release();
  }
};
