export const handleSetServicesPromo = async (req, res, connection) => {
  const { service_id, discount_price, valid_days, start_date, end_date } =
    req.body;

  try {
    await connection.beginTransaction();

    const validDaysString = valid_days.join(", ");

    const query = `
      INSERT INTO Service_Promo (service_id, discount_price, valid_days, start_date, end_date, isActive, date_created, isArchive)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)
    `;

    const isArchive = false;

    const values = [
      service_id,
      discount_price,
      validDaysString, // Use the string version of valid_days
      start_date || null, // Handle optional start_date
      end_date || null, // Handle optional end_date
      true, // isActive
      isArchive, // isArchive
    ];

    const [rows] = await connection.execute(query, values);

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Promotion created successfully",
      data: rows,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const handleGetServiceTypeList = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        st.id,
        st.store_id,
        st.service_name,
        st.description,
        st.isArchive,
        st.date_created,
        sp.discount_price,
        sp.valid_days,
        CASE 
            WHEN sp.isActive = 1 THEN 'active'
            ELSE null 
        END AS promo_status,
        st.default_price  -- Include default_price from Service_Type
      FROM Service_Type AS st
      LEFT JOIN Service_Promo AS sp ON st.id = sp.service_id AND sp.isArchive = 0
      WHERE st.store_id = ? AND st.isArchive = 0;
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
