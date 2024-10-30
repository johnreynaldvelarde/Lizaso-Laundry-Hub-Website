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

export const handleGetScheduleStatsByUser = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        store_id,  -- Include store_id in the SELECT statement
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
        store_id = ? AND
        YEAR(request_date) = YEAR(CURRENT_DATE())
        AND MONTH(request_date) = MONTH(CURRENT_DATE())
      GROUP BY 
        store_id;  -- Group by store_id to aggregate results
    `;

    const [rows] = await connection.execute(query, [id]);

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

export const handleGetScheduleServiceRequest = async (req, res, connection) => {
  const { id: store_id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        sr.id,
        sr.store_id,
        sr.user_id,
        COALESCE(CONCAT(u.first_name, ' ', COALESCE(u.middle_name, ''), ' ', u.last_name), 'Not Assigned') AS user_fullname,
        sr.customer_id,
        CONCAT(c.first_name, ' ', COALESCE(c.middle_name, ''), ' ', c.last_name) AS customer_fullname,
        sr.service_type_id,
        st.service_name,
        sr.tracking_code,
        sr.customer_fullname AS original_customer_fullname,
        sr.customer_type,
        sr.notes,
        sr.request_date,
        sr.pickup_date,
        sr.delivery_date,
        sr.request_status,
        sr.qr_code,
        sr.qr_code_generated,
        sr.isPickup,
        sr.isDelivery,
        sr.payment_method
      FROM 
        Service_Request AS sr
      LEFT JOIN 
        User_Account AS u ON sr.user_id = u.id
      LEFT JOIN 
        User_Account AS c ON sr.customer_id = c.id
      LEFT JOIN 
        Service_Type AS st ON sr.service_type_id = st.id
      WHERE 
        sr.store_id = ?
      ORDER BY
        CASE 
          WHEN sr.request_status = 'Pending Pickup' THEN 1
          WHEN sr.request_status = 'Ready for Delivery' THEN 2
          WHEN sr.request_status = 'Ongoing Pickup' THEN 3
          WHEN sr.request_status = 'Out for Delivery' THEN 4
          ELSE 5
        END;
    `;

    const [rows] = await connection.execute(query, [store_id]);

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
      message: "Failed to retrieve service requests.",
    });
  }
};

// export const handleGetScheduleServiceRequest = async (req, res, connection) => {
//   const { id } = req.params; // store id
//   store_id;
//   try {
//     await connection.beginTransaction();

//     const query = `

//       `;

//     const [rows] = await connection.execute(query);

//     await connection.commit();

//     res.status(200).json({
//       success: true,
//       data: rows,
//     });
//   } catch (error) {
//     console.error(":", error);
//     await connection.rollback();
//     res.status(500).json({
//       success: false,
//       message: ".",
//     });
//   }
// };
