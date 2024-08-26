export const handleCreateItem = async (req, res, db) => {
  const { store_id, category_id, item_code, item_name, price } = req.body;

  try {
    const [existingItemCode] = await db.query(
      "SELECT * FROM Item WHERE item_code = ?",
      [item_code]
    );
    if (existingItemCode.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Item code is already exists" });
    }

    const [existingItemName] = await db.query(
      "SELECT * FROM Item WHERE item_name = ?",
      [item_name]
    );
    if (existingItemName.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Item name is already exists" });
    }

    // Insert the new item
    const [insertResult] = await db.query(
      "INSERT INTO Item (category_id, item_code, item_name, isArchive, updated_at, date_created) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [category_id, item_code, item_name, false]
    );

    const newItemId = insertResult.insertId;

    // Insert the new item into the Inventory table
    await db.query(
      "INSERT INTO Inventory (item_id, store_id, price, quantity, isStatus) VALUES (?, ?, ?, ?, ?)",
      [newItemId, store_id, price, 0, false] // Assuming default values for discount, quantity, and isStatus
    );

    res.status(201).json({
      success: true,
      message: "Item created successfully",
    });
  } catch (error) {
    console.error("Error creating new item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const handleViewInventory = async (req, res, db) => {
  const { store_id } = req.query;
  try {
    if (!store_id) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const query = `
      SELECT 
        Inventory.id AS inventory_id,
        Inventory.item_id,
        Inventory.price,
        Inventory.quantity,
        Inventory.isStatus,
        Item.item_code,
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
    const [existingCategoryName] = await db.query(
      "SELECT * FROM Item_Category WHERE category_name = ?",
      [category_name]
    );
    if (existingCategoryName.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is already exists" });
    }

    const result = await db.query(
      "INSERT INTO Item_Category (category_name, isArchive, updated_at, date_created) VALUES (?, ?, NOW(), NOW())",
      [category_name, false]
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error creating new category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const handleGetListCategory = async (req, res, db) => {
  try {
  } catch (error) {}
};

export const handleGetViewCategory = async (req, res, db) => {
  try {
  } catch (error) {}
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
