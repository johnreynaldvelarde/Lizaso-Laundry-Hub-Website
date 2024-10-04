import { haversineDistance } from "../../helpers/distanceComputing.js";

// GET
export const handleGetLaundryPickup = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
        SELECT 
          sr.id AS request_id,
          c.id AS customer_id,
          sr.customer_fullname,
          sr.request_date,
          sr.pickup_date,
          sr.delivery_date,
          sr.request_status,
          st.service_name,
          st.default_price,
          a.address_line1,
          a.latitude AS customer_latitude,
          a.longitude AS customer_longitude,
          store_address.latitude AS store_latitude,
          store_address.longitude AS store_longitude
        FROM 
          Service_Request sr
        INNER JOIN 
          Service_Type st ON sr.service_type_id = st.id
        INNER JOIN 
          Customer c ON sr.customer_id = c.id
        INNER JOIN 
          Addresses a ON c.address_id = a.id
        INNER JOIN 
          Stores s ON sr.store_id = s.id
        INNER JOIN 
          Addresses store_address ON s.address_id = store_address.id 
        WHERE 
          sr.store_id = ? 
          AND sr.request_status IN ('Pending Pickup', 'Ongoing Pickup', 'Cancelled')
          AND st.isArchive = 0
          AND c.isArchive = 0
      `;

    const [rows] = await connection.execute(query, [id]);

    // Compute distances for each row
    const resultsWithDistance = rows.map((row) => {
      const distance = haversineDistance(
        row.store_latitude,
        row.store_longitude,
        row.customer_latitude,
        row.customer_longitude
      );
      const formattedDistance = `${distance.toFixed(2)} km`;
      return {
        ...row,
        distance: formattedDistance,
      };
    });

    await connection.commit();

    res.status(200).json({
      success: true,
      data: resultsWithDistance,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching service requests:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
    });
  } finally {
    if (connection) connection.release();
  }
};

//SELECT
// sr.id AS request_id,
// c.id AS customer_id,
// sr.customer_fullname,
// sr.request_date,
// sr.pickup_date,
// sr.delivery_date,
// sr.request_status,
// sr.qr_code,
// sr.qr_code_generated,
// st.service_name,
// st.default_price,
// a.address_line1,
// a.latitude,
// a.longitude
// FROM
// Service_Request sr
// INNER JOIN
// Service_Type st ON sr.service_type_id = st.id
// INNER JOIN
// Customer c ON sr.customer_id = c.id
// INNER JOIN
// Addresses a ON c.address_id = a.id
// WHERE
// sr.store_id = ?
// AND sr.request_status IN ('Pending Pickup', 'Ongoing Pickup', 'Cancelled')
// AND st.isArchive = 0
// AND c.isArchive = 0

// export const handleGetLaundryPickup = async (req, res, connection) => {
//   const { id } = req.params; // store id from the request params

//   try {
//     await connection.beginTransaction();

//     const query = `
//         SELECT
//           st.id AS service_id,
//           st.service_name,
//           st.default_price,
//           sp.id AS promotion_id,
//           sp.discount_percentage,
//           sp.discount_price,
//           sp.valid_days,
//           sp.start_date,
//           sp.end_date,
//           sp.isActive
//         FROM
//           Service_Type st
//         LEFT JOIN
//           Service_Promotions sp ON st.id = sp.service_id
//             AND sp.isActive = 1
//             AND sp.isArchive = 0
//             AND (sp.start_date IS NULL OR sp.start_date <= CURDATE())
//             AND (sp.end_date IS NULL OR sp.end_date >= CURDATE())
//         WHERE
//           st.store_id = ?
//           AND st.isArchive = 0
//       `;

//     const [rows] = await connection.execute(query, [id]);

//     await connection.commit();

//     res.status(200).json({
//       success: true,
//       data: rows,
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error fetching services and promotions:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching data.",
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// };
