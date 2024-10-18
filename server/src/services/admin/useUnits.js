import { generateTrackingCode } from "../../helpers/generateCode.js";
import { progress } from "../../helpers/_progress.js";
const newPickupDate = new Date();

//#POST
export const handleCreateUnits = async (req, res, db) => {
  try {
    const { store_id, unit_name, isUnitStatus } = req.body;

    if (!store_id || !unit_name || isUnitStatus === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the store_id exists
    const [store] = await db.query(
      "SELECT id FROM Stores WHERE id = ? LIMIT 1",
      [store_id]
    );

    if (!store) {
      return res
        .status(400)
        .json({ success: false, message: "Store not found" });
    }

    // Validate isUnitStatus
    const validStatuses = [0, 1, 2, 3]; // Valid statuses
    if (!validStatuses.includes(isUnitStatus)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid unit status" });
    }

    // Check if the unit_name already exists for the given store_id
    const [unitExists] = await db.query(
      "SELECT * FROM Laundry_Unit WHERE store_id = ? AND unit_name = ? LIMIT 1",
      [store_id, unit_name] // Use store_id from the request body
    );

    if (unitExists.length > 0) {
      // Ensure to check length to verify existence
      return res.status(400).json({
        success: false,
        message: "Unit name already exists in this store",
      });
    }

    // Insert the new laundry unit
    await db.query(
      "INSERT INTO Laundry_Unit (store_id, unit_name, isUnitStatus, date_created, isArchive) VALUES (?, ?, ?, NOW(), ?)",
      [store_id, unit_name, isUnitStatus, false] // Or true, depending on your requirement
    );

    res.status(201).json({
      success: true,
      message: "Laundry unit created successfully",
    });
  } catch (error) {
    console.error("Error creating laundry units:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//# CREATE NEW TRANSACTION
export const handleTransaction = async (req, res, connection) => {
  const { assignment_id, total_amount, payment_method } = req.body;

  try {
    await connection.beginTransaction();

    await connection.commit();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the message.",
    });
  } finally {
    connection.release();
  }
};

export const handleSetWalkInRequest = async (req, res, connection) => {
  const { id } = req.params;
  const {
    customerId,
    userId,
    serviceId,
    unitId,
    fullname,
    weight,
    customerNotes,
    supplies,
  } = req.body;

  try {
    await connection.beginTransaction();

    const trackingCode = generateTrackingCode();

    // Step 1: Insert into Service_Request
    const serviceRequestQuery = `
      INSERT INTO Service_Request (
        store_id,
        user_id,
        customer_id,
        service_type_id,
        customer_fullname,
        notes,
        request_date,
        request_status,
        tracking_code,
        customer_type,
        isPickup
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), 'In Laundry', ?, 'Walk-In', ?)
    `;

    const [serviceRequestResult] = await connection.execute(
      serviceRequestQuery,
      [
        id,
        userId,
        customerId,
        serviceId,
        fullname,
        customerNotes,
        trackingCode,
        1,
      ]
    );

    const serviceRequestId = serviceRequestResult.insertId;

    await connection.execute(
      `UPDATE Service_Request
        SET pickup_date = ?
        WHERE id = ?`,
      [newPickupDate, serviceRequestId]
    );

    const qrCodeData = `SR-${serviceRequestId}-${trackingCode}`;

    await connection.execute(
      `UPDATE Service_Request 
       SET qr_code = ?, qr_code_generated = 1
       WHERE id = ?`,
      [qrCodeData, serviceRequestId]
    );

    // Step 2: Insert the progress of new service
    const progressQuery = `
    INSERT INTO Service_Progress (
        service_request_id,
        stage,
        description,
        status_date,
        completed,
        false_description
      ) 
    VALUES (?, ?, ?, ?, ?, ?)`;

    for (const item of progress) {
      await connection.execute(progressQuery, [
        serviceRequestId,
        item.stage,
        item.description,
        item.completed ? new Date() : null,
        item.completed,
        item.falseDescription,
      ]);
    }

    // Step 3: After step 2 update the existing progress
    await connection.execute(
      `UPDATE Service_Progress 
       SET completed = true,
           status_date = NOW()
       WHERE service_request_id = ? AND (stage = 'Ongoing Pickup' OR stage = 'Completed Pickup')`,
      [serviceRequestId]
    );

    // Step 4: Insert into Laundry_Assignment
    const assignmentQuery = `
      INSERT INTO Laundry_Assignment (
        service_request_id,
        unit_id,
        assigned_by,
        weight,
        assigned_at,
        isAssignmentStatus
      ) VALUES (?, ?, ?, ?, NOW(), 0)
    `;

    const [result] = await connection.execute(assignmentQuery, [
      serviceRequestId,
      unitId,
      userId,
      weight,
    ]);

    const assignmentId = result.insertId;

    // Step 5: Update Laundry_Unit's isUnitStatus to 1 (Occupied)
    const updateUnitQuery = `
      UPDATE Laundry_Unit 
      SET isUnitStatus = 1 
      WHERE id = ?
    `;

    await connection.execute(updateUnitQuery, [unitId]);

    // Step 6: check the supplies if have item
    if (supplies && supplies.length > 0) {
      for (const supply of supplies) {
        const { supplyId, quantity, amount } = supply;

        const relatedItemQuery = `
          INSERT INTO Related_Item (
            assignment_id,
            inventory_id,
            quantity,
            amount
          )
          VALUES (?, ?, ?, ?)
        `;
        await connection.execute(relatedItemQuery, [
          assignmentId,
          supplyId,
          quantity,
          amount,
        ]);

        // Update the quantity in the Inventory table
        const updateInventoryQuery = `
          UPDATE Inventory
          SET quantity = quantity - ?
          WHERE id = ?
        `;
        await connection.execute(updateInventoryQuery, [quantity, supplyId]);
      }
    }

    // Step 7: After step 6  update the existing progress
    await connection.execute(
      `UPDATE Service_Progress 
         SET completed = true,
             status_date = NOW()
         WHERE service_request_id = ? AND (stage = 'At Store' OR stage = 'In Queue' OR stage = 'In Laundry')`,
      [serviceRequestId]
    );

    // Commit the transaction
    await connection.commit();

    res
      .status(200)
      .json({ success: true, message: "Assignment created successfully." });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({
      error: "An error occurred while setting the laundry assignment.",
    });
  }
};

// Set Laundry Assignment
export const handleSetLaundryAssignment = async (req, res, connection) => {
  const { service_request_id, unit_id, assign_by_id, weight, supplies } =
    req.body;

  console.log(req.body);
  try {
    await connection.beginTransaction();

    const insertQuery = `
      INSERT INTO Laundry_Assignment (
        service_request_id,
        unit_id,
        assigned_by,
        weight,
        assigned_at,
        isAssignmentStatus,
        isCompleted
      )
      VALUES (?, ?, ?, ?, NOW(), 0, 0)
    `;

    const [insertResults] = await connection.execute(insertQuery, [
      service_request_id,
      unit_id,
      assign_by_id,
      weight,
    ]);

    const assignmentId = insertResults.insertId;

    // Update Laundry Unit
    const updateQuery = `
      UPDATE Laundry_Unit
      SET isUnitStatus = 1
      WHERE id = ?
    `;
    await connection.execute(updateQuery, [unit_id]);

    // Update the Service_Request
    const updateRequestQuery = `
      UPDATE Service_Request
      SET request_status = 'In Laundry'
      WHERE id = ?
    `;
    await connection.execute(updateRequestQuery, [service_request_id]);

    // Check if supplies have data
    if (supplies && supplies.length > 0) {
      for (const supply of supplies) {
        const { supplyId, quantity, amount } = supply;

        const relatedItemQuery = `
          INSERT INTO Related_Item (
            assignment_id,
            inventory_id,
            quantity,
            amount
          )
          VALUES (?, ?, ?, ?)
        `;
        await connection.execute(relatedItemQuery, [
          assignmentId,
          supplyId,
          quantity,
          amount,
        ]);

        // Update the quantity in the Inventory table
        const updateInventoryQuery = `
          UPDATE Inventory
          SET quantity = quantity - ?
          WHERE id = ?
        `;
        await connection.execute(updateInventoryQuery, [quantity, supplyId]);
      }
    }

    await connection.execute(
      `UPDATE Service_Progress 
       SET completed = true,
           status_date = NOW()
       WHERE service_request_id = ? AND (stage = 'In Laundry')`,
      [service_request_id]
    );

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Laundry assignment successful",
      data: insertResults,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error setting laundry assignment:", error);
    res.status(500).json({
      error: "An error occurred while setting the laundry assignment.",
    });
  }
};

//#GET
export const handleGetServiceType = async (req, res, connection) => {
  const { id } = req.params;
  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        id, 
        service_name,
        default_price 
      FROM 
        Service_Type
      WHERE 
        store_id = ? AND isArchive = '0'
    `;

    const [results] = await connection.execute(query, [id]);
    await connection.commit();
    res.status(200).json({ data: results });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching service type:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching service type." });
  }
};

// Get Service In Queue
export const handleGetServiceInQueue = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
        SELECT 
          sr.id, 
          sr.store_id, 
          sr.user_id, 
          sr.customer_id, 
          sr.customer_fullname,
          sr.notes, 
          sr.service_type_id, 
          sr.request_date, 
          sr.pickup_date, 
          sr.delivery_date, 
          sr.request_status,
          st.service_name
        FROM 
          Service_Request sr
        JOIN 
          Service_Type st ON sr.service_type_id = st.id
        WHERE 
          sr.store_id = ? AND sr.request_status = 'Completed Pickup'
      `;

    const [rows] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching customer requests:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching customer requests." });
  }
};

// Get unit list that only available only
export const handleGetUnitListAvaiable = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
    SELECT 
      id,
      unit_name 
    FROM 
      Laundry_Unit
    WHERE 
      store_id = ? 
      AND isUnitStatus = '0'
      AND isArchive = '0'
  `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({ data: results });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching laundry Unit:", error);
    res.status(500).json({ error: "An error occurred while fetching." });
  }
};

export const handleGetLaundryAssignments = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT
        la.id,
        sr.customer_fullname,
        sr.customer_type,
        st.service_name,
        lu.unit_name,
        la.assigned_at
      FROM Laundry_Assignment la
      JOIN Service_Request sr ON la.service_request_id = sr.id
      JOIN Service_Type st ON sr.service_type_id = st.id
      JOIN Laundry_Unit lu ON la.unit_id = lu.id
      WHERE sr.store_id = ? 
        AND la.isAssignmentStatus = 0 
        AND la.isCompleted = 0
    `;

    const [rows] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching assignments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching assignments." });
  }
};

export const handleGetSelectedCustomer = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();
    const query = `
      SELECT 
        id,
        CONCAT(c_lastname, ', ', c_firstname, ' ', c_middlename) AS fullname,
        c_username,
        date_created
      FROM Customer
      WHERE store_id = ? AND isArchive = 0
      ORDER BY date_created DESC
    `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({ data: results });
  } catch (error) {
    await connection.rollback();
    res
      .status(500)
      .json({ error: "An error occurred while fetching the customer list." });
  }
};

export const handleViewUnits = async (req, res, db) => {
  const { store_id } = req.query;
  try {
    if (!store_id) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const [rows] = await db.query(
      "SELECT id, unit_name, isUnitStatus, date_created, isArchive FROM Laundry_Unit WHERE store_id = ? AND isArchive = 0",
      [store_id]
    );

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error retrieving unit list:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the unit list.",
    });
  }
};

export const handleGetCountRequestInQueue = async (req, res, connection) => {
  const { id } = req.params; // Store ID to filter requests

  try {
    await connection.beginTransaction();

    const query = `
      SELECT COUNT(*) AS count
      FROM Service_Request
      WHERE store_id = ? AND request_status = 'Completed Pickup'
    `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({
      data: results[0].count,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error getting count of requests in queue:", error);
    res.status(500).json({ error: "Failed to get request count" });
  }
};

export const handleGetCountLaundryAssignment = async (req, res, connection) => {
  const { id } = req.params;
  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        SUM(CASE WHEN la.isAssignmentStatus = '0' THEN 1 ELSE 0 END) AS count_in_progress,
        SUM(CASE WHEN la.isAssignmentStatus = '1' THEN 1 ELSE 0 END) AS count_completed,
        SUM(CASE WHEN la.isAssignmentStatus = '2' THEN 1 ELSE 0 END) AS count_canceled
      FROM Laundry_Assignment AS la
      INNER JOIN Service_Request AS sr ON la.service_request_id = sr.id
      WHERE sr.store_id = ?
    `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({
      data: {
        count_in_progress: results[0].count_in_progress,
        count_completed: results[0].count_completed,
        count_canceled: results[0].count_canceled,
      },
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error getting count of assignments:", error);
    res.status(500).json({ error: "Failed to get assignment count" });
  }
};

export const handleGetInventoryLaundryItem = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const query = `
      SELECT 
        i.id AS inventory_id,
        it.item_name,
        i.quantity,
        i.price,
        i.isStatus
      FROM Inventory i
      INNER JOIN Item it ON i.item_id = it.id
      WHERE i.store_id = ?
        AND i.quantity > 0
        AND i.isStatus = 0
    `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error getting inventory items:", error);
    res.status(500).json({ error: "Failed to get inventory items" });
  }
};

//#PUT
export const handleUpdateProgressInqueueAndAtStore = async (
  req,
  res,
  connection
) => {
  const { id } = req.params;
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      `SELECT completed FROM Service_Progress 
       WHERE service_request_id = ? AND (stage = 'At Store' OR stage = 'In Queue')`,
      [id]
    );

    if (rows.length > 0 && rows.every((row) => row.completed === true)) {
      await connection.rollback();
      return;
    }
    await connection.execute(
      `UPDATE Service_Progress 
       SET completed = true,
           status_date = NOW()
       WHERE service_request_id = ? AND completed = false AND (stage = 'At Store' OR stage = 'In Queue')`,
      [id]
    );

    await connection.commit();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: "Error updating service progress.",
      error,
    });
  }
};

export const handlePutAssignment = async (req, res, connection) => {
  const { id } = req.params; // The id refers to Laundry_Assignment.id

  try {
    // Start the transaction
    await connection.beginTransaction();

    // Query to update Laundry_Assignment: Set isAssignmentStatus to 2 (Canceled)
    const updateAssignmentQuery = `
      UPDATE Laundry_Assignment
      SET isAssignmentStatus = 2
      WHERE id = ?
    `;
    await connection.query(updateAssignmentQuery, [id]);

    // Query to update Service_Request: Set request_status to 'Canceled'
    const updateServiceRequestQuery = `
      UPDATE Service_Request
      SET request_status = 'Canceled'
      WHERE id = (
        SELECT service_request_id
        FROM Laundry_Assignment
        WHERE id = ?
      )
    `;
    await connection.query(updateServiceRequestQuery, [id]);

    // Query to update Laundry_Unit: Set isUnitStatus to 0 (Available)
    const updateLaundryUnitQuery = `
      UPDATE Laundry_Unit
      SET isUnitStatus = 0
      WHERE id = (
        SELECT unit_id
        FROM Laundry_Assignment
        WHERE id = ?
      )
    `;
    await connection.query(updateLaundryUnitQuery, [id]);

    // Commit the transaction after successful updates
    await connection.commit();

    // Return success response
    res.status(200).json({
      message: "Assignment and related records updated successfully.",
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await connection.rollback();
    console.error("Error updating assignment: ", error);
    res.status(500).json({ error: "Failed to update assignment." });
  }
};

export const handlePutRemoveInQueue = async (req, res, connection) => {
  const { id } = req.params;
  try {
    await connection.beginTransaction();
    const query = `
      UPDATE Service_Request
      SET request_status = 'Canceled'
      WHERE id = ?;
    `;

    const [results] = await connection.execute(query, [id]);

    await connection.commit();

    res.status(200).json({ message: "Request canceled successfully" });
  } catch (error) {
    await connection.rollback();
    res
      .status(500)
      .json({ success: false, message: "Error canceling the request", error });
  }
};
