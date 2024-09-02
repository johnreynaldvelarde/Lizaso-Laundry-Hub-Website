// export const handleUpdateCustomerBasicInformation = async (req, res, db) => {
//   const {
//     store_id,
//     c_email,
//     c_number,
//     a_address_line1,
//     a_address_line2,
//     a_country,
//     a_province,
//     a_city,
//     a_postal_code,
//     a_latitude,
//     a_longitude,
//   } = req.body;

//   try {
//     // Step 1: Insert the new address into the Addresses table
//     const [addressResult] = await db.execute(
//       `INSERT INTO Addresses (address_line1, address_line2, country, province, city, postal_code, latitude, longitude, updated_at)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
//       [
//         a_address_line1,
//         a_address_line2,
//         a_country,
//         a_province,
//         a_city,
//         a_postal_code,
//         a_latitude,
//         a_longitude
//       ]
//     );

//     // Retrieve the ID of the newly inserted address
//     const addressId = addressResult.insertId;

//     // Step 2: Update the Customer table with the store_id and address_id
//     await db.execute(
//       `UPDATE Customer
//        SET store_id = ?, address_id = ?
//        WHERE c_email = ? AND c_number = ?`,
//       [
//         store_id,
//         addressId,
//         c_email,
//         c_number
//       ]
//     );

//     // Step 3: Send a success response
//     res.status(200).json({ message: 'Customer information updated successfully' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating customer information' });
//   }
// };

export const handleUpdateCustomerBasicInformation = async (req, res, connection) => {
  const { id } = req.params;
  const {
    store_id,
    c_email,
    c_number,
    a_address_line1,
    a_address_line2,
    a_country,
    a_province,
    a_city,
    a_postal_code,
    a_latitude,
    a_longitude,
  } = req.body;

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Insert the new address into the Addresses table
    const [addressResult] = await connection.execute(
      `INSERT INTO Addresses (address_line1, address_line2, country, province, city, postal_code, latitude, longitude, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        a_address_line1,
        a_address_line2,
        a_country,
        a_province,
        a_city,
        a_postal_code,
        a_latitude,
        a_longitude,
      ]
    );

    const addressId = addressResult.insertId;

    // Update the Customer table with the new address_id and store_id
    await connection.execute(
      `UPDATE Customer
       SET store_id = ?, address_id = ?, c_email = ?, c_number = ?
       WHERE id = ?`,
      [store_id, addressId, c_email, c_number, id]
    );

    // Commit the transaction
    await connection.commit();

    // Return success response
    res.status(200).json({ success: true, message: 'Your info is now up-to-date!' });
  } catch (error) {
    // Rollback transaction on error
    await connection.rollback();
    console.error("Database operation error:", error);
    res.status(500).json({ message: 'Error updating customer information' });
  } finally {
    // Release the database connection
    connection.release();
  }
};
