import { haversineDistance } from "../../helpers/distanceComputing.js";
// POST
export const handlePostNewMessages = async (req, res, connection) => {
  const { id } = req.params;
  const { recieverId, text, senderType } = req.body;

  console.log(recieverId);
  console.log(text);
  console.log(senderType);

  // try {
  //   await connection.beginTransaction();
  // } catch (error) {
  //   await connection.rollback();
  //   console.error("Error updating service request status:", error);
  //   res.status(500).json({
  //     success: false,
  //     message: "An error occurred while updating the request.",
  //   });
  // } finally {
  //   connection.release();
  // }
};

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

// PUT
//#PENDING CANCEL
export const handleUpdateServiceRequestCancel = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const updateQuery = `
        UPDATE Service_Request
        SET request_status = 'Cancelled'
        WHERE id = ?`;

    const [result] = await connection.execute(updateQuery, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }
    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Request status updated to cancelled.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the request.",
    });
  } finally {
    connection.release();
  }
};

//#PENDING ONGOING
export const handleUpdateServiceRequestOngoing = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const updateQuery = `
        UPDATE Service_Request
        SET request_status = 'Ongoing Pickup'
        WHERE id = ?`;

    const [result] = await connection.execute(updateQuery, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }
    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Request status updated to Ongoing Pickup.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the request.",
    });
  } finally {
    connection.release();
  }
};

//#BACK TO PENDING
export const handleUpdateServiceRequestBackToPending = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const updateQuery = `
          UPDATE Service_Request
          SET request_status = 'Pending Pickup'
          WHERE id = ?`;

    const [result] = await connection.execute(updateQuery, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }
    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Request status updated to Pending Pickup.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the request.",
    });
  } finally {
    connection.release();
  }
};
