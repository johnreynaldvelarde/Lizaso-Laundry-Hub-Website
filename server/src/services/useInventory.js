export const handleCreateItem = async (req, res, db) => {
  const { category_id, item_code, item_name } = req.body;

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

    const result = await db.query(
      "INSERT INTO Item (category_id, item_code, item_name, isArchive, updated_at, date_created) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [category_id, item_code, item_name, false]
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
