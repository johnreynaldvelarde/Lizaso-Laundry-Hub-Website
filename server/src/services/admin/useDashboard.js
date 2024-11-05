export const handleGetScheduleStatsByAdmin = async (req, res, connection) => {
  try {
    await connection.beginTransaction();

    const query = `
        SELECT 
          COUNT(*) AS total_requests,
          SUM(CASE WHEN request_status = 'Pending Pickup' THEN 1 ELSE 0 END) AS pending_requests,
          SUM(CASE WHEN request_status = 'Completed Delivery' THEN 1 ELSE 0 END) AS complete_delivery_requests,
          SUM(CASE WHEN request_status = 'Canceled' THEN 1 ELSE 0 END) AS canceled_requests,
          DATE_FORMAT(NOW(), '%Y-%m') AS current_month,
          COUNT(*) * 100.0 / COUNT(*) AS total_percentage,
          SUM(CASE WHEN request_status = 'Pending Pickup' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS pending_percentage,
          SUM(CASE WHEN request_status = 'Completed Delivery' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS complete_delivery_percentage,
          SUM(CASE WHEN request_status = 'Canceled' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS canceled_percentage
        FROM 
          Service_Request
        WHERE 
          YEAR(request_date) = YEAR(CURRENT_DATE())
          AND MONTH(request_date) = MONTH(CURRENT_DATE());
      `;

    const [rows] = await connection.execute(query);

    await connection.commit();

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error:", error);
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: "Failed to retrieve schedule statistics.",
    });
  }
};

export const handleGetTotalSalesByMonth = async (req, res, db) => {
  const { id } = req.params; // Store's id

  try {
    // Start a transaction
    await db.beginTransaction();

    // SQL query to get total sales by month, including months with zero sales
    const query = `
        SELECT 
          months.month,
          IFNULL(SUM(t.total_amount), 0) AS sales
        FROM 
          (SELECT 'Jan' AS month UNION SELECT 'Feb' UNION SELECT 'Mar' UNION 
           SELECT 'Apr' UNION SELECT 'May' UNION SELECT 'Jun' UNION 
           SELECT 'Jul' UNION SELECT 'Aug' UNION SELECT 'Sep' UNION 
           SELECT 'Oct' UNION SELECT 'Nov' UNION SELECT 'Dec') AS months
        LEFT JOIN 
          Transactions t ON DATE_FORMAT(t.created_at, '%b') = months.month 
          AND t.store_id = ?  -- Using store_id instead of assignment_id
        GROUP BY 
          months.month
        ORDER BY 
          FIELD(months.month, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');  -- Corrected closing parenthesis
      `;

    // Execute the query using the existing connection
    const [rows] = await db.execute(query, [id]);

    // Commit the transaction if successful
    await db.commit();

    // Format the result to match your desired structure
    const formattedData = rows.map((row) => ({
      month: row.month,
      sales: row.sales,
    }));

    res.status(200).json({
      success: true,
      data: formattedData, // Returning the formatted data
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await db.rollback();
    console.error("Error fetching total sales by month:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
