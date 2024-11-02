export const handleGetServiceTypeList = async (req, res, connection) => {
  const { id } = req.params; // Get the store ID from request parameters

  try {
    await connection.beginTransaction();

    const query = `
        SELECT * 
        FROM Service_Type 
        WHERE store_id = ? AND isArchive = 0;
      `;

    const [rows] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      data: rows, // Return the retrieved service type data
    });
  } catch (error) {
    await connection.rollback(); // Rollback in case of an error
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
